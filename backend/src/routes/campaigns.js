import { Router } from 'express';

import { pool } from '../db.js';
import { validateBudget } from '../validation.js';

export const campaignsRouter = Router();

const campaignColumns = `
  id,
  title,
  cost_per_click AS "costPerClick",
  daily_budget AS "dailyBudget",
  total_budget AS "totalBudget",
  all_categories AS "allCategories",
  created_at AS "createdAt"
`;

const editableColumns = {
  costPerClick: 'cost_per_click',
  dailyBudget: 'daily_budget',
  totalBudget: 'total_budget',
};

campaignsRouter.get('/', async (req, res) => {
  const { rows } = await pool.query(
    `SELECT ${campaignColumns},
       (SELECT count(*)::int FROM clicks WHERE clicks.campaign_id = campaigns.id) AS "clicksCount"
     FROM campaigns
     ORDER BY id DESC`
  );

  res.json({ campaigns: rows, count: rows.length });
});

campaignsRouter.post('/', async (req, res) => {
  const { title, allCategories = false, categoryIds = [] } = req.body;

  if (!title || typeof title !== 'string') {
    return res.status(400).json({ message: 'title is required' });
  }

  if (!allCategories && categoryIds.length === 0) {
    return res.status(400).json({ message: 'select at least one category' });
  }

  const error = validateBudget(req.body);
  if (error) {
    return res.status(400).json({ message: error });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const { rows } = await client.query(
      `INSERT INTO campaigns (title, cost_per_click, daily_budget, total_budget, all_categories)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING ${campaignColumns}`,
      [title, req.body.costPerClick, req.body.dailyBudget, req.body.totalBudget, allCategories]
    );
    const campaign = rows[0];

    if (!allCategories) {
      await client.query(
        `INSERT INTO campaign_categories (campaign_id, category_id)
         SELECT $1, unnest($2::text[])`,
        [campaign.id, categoryIds]
      );
    }

    await client.query('COMMIT');
    res.status(201).json(campaign);
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
});

campaignsRouter.patch('/:id', async (req, res) => {
  const { rows } = await pool.query(`SELECT ${campaignColumns} FROM campaigns WHERE id = $1`, [
    req.params.id,
  ]);

  if (rows.length === 0) {
    return res.status(404).json({ message: 'campaign not found' });
  }

  const changes = {};
  for (const key of Object.keys(editableColumns)) {
    if (req.body[key] !== undefined) changes[key] = req.body[key];
  }

  const updated = { ...rows[0], ...changes };
  const error = validateBudget(updated);
  if (error) {
    return res.status(400).json({ message: error });
  }

  const result = await pool.query(
    `UPDATE campaigns
     SET cost_per_click = $1, daily_budget = $2, total_budget = $3
     WHERE id = $4
     RETURNING ${campaignColumns}`,
    [updated.costPerClick, updated.dailyBudget, updated.totalBudget, req.params.id]
  );

  res.json(result.rows[0]);
});

campaignsRouter.get('/:id/clicks', async (req, res) => {
  const { rows } = await pool.query(
    'SELECT id, clicked_at AS "clickedAt" FROM clicks WHERE campaign_id = $1 ORDER BY clicked_at DESC',
    [req.params.id]
  );

  res.json({ clicks: rows, count: rows.length });
});
