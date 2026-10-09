import cors from 'cors';
import express from 'express';

import { campaignsRouter } from './routes/campaigns.js';
import { categoriesRouter } from './routes/categories.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/categories', categoriesRouter);
app.use('/api/campaigns', campaignsRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'internal server error' });
});

const port = process.env.PORT ?? 4000;

app.listen(port, () => {
  console.log(`API is running on http://localhost:${port}`);
});
