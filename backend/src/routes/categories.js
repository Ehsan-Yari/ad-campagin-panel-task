import { Router } from 'express';

import { pool } from '../db.js';

export const categoriesRouter = Router();

categoriesRouter.get('/', async (req, res) => {
  const { rows } = await pool.query(
    'SELECT id, title, parent_id AS "parentId" FROM categories ORDER BY id'
  );

  const categories = rows.map((row) => (row.parentId ? row : { id: row.id, title: row.title }));

  res.json({ categories, count: categories.length });
});
