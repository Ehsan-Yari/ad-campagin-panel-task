CREATE TABLE categories (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  parent_id TEXT REFERENCES categories (id)
);

CREATE TABLE campaigns (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  cost_per_click INTEGER NOT NULL CHECK (cost_per_click > 0),
  daily_budget INTEGER NOT NULL CHECK (daily_budget >= cost_per_click),
  total_budget INTEGER NOT NULL CHECK (total_budget >= daily_budget),
  all_categories BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE campaign_categories (
  campaign_id INTEGER NOT NULL REFERENCES campaigns (id) ON DELETE CASCADE,
  category_id TEXT NOT NULL REFERENCES categories (id),
  PRIMARY KEY (campaign_id, category_id)
);

CREATE TABLE clicks (
  id SERIAL PRIMARY KEY,
  campaign_id INTEGER NOT NULL REFERENCES campaigns (id) ON DELETE CASCADE,
  clicked_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX clicks_campaign_id_idx ON clicks (campaign_id);

INSERT INTO categories (id, title, parent_id) VALUES
  ('1', 'کالای دیجیتال', NULL),
  ('1-1', 'موبایل', '1'),
  ('1-1-1', 'گوشی هوشمند', '1-1'),
  ('1-1-2', 'لوازم جانبی موبایل', '1-1'),
  ('1-1-3', 'تبلت', '1-1'),
  ('1-2', 'لپ‌تاپ', '1'),
  ('1-2-1', 'لپ‌تاپ گیمینگ', '1-2'),
  ('1-2-2', 'لپ‌تاپ اداری', '1-2'),
  ('1-3', 'صوتی و تصویری', '1'),
  ('1-3-1', 'هدفون', '1-3'),
  ('1-3-2', 'اسپیکر', '1-3'),
  ('2', 'مد و پوشاک', NULL),
  ('2-1', 'مردانه', '2'),
  ('2-1-1', 'کفش مردانه', '2-1'),
  ('2-1-2', 'لباس مردانه', '2-1'),
  ('2-2', 'زنانه', '2'),
  ('2-2-1', 'کیف زنانه', '2-2'),
  ('2-2-2', 'لباس زنانه', '2-2'),
  ('3', 'خانه و آشپزخانه', NULL),
  ('3-1', 'لوازم آشپزخانه', '3'),
  ('3-1-1', 'ظروف', '3-1'),
  ('3-1-2', 'لوازم برقی آشپزخانه', '3-1'),
  ('3-2', 'دکوراسیون', '3'),
  ('3-2-1', 'مبلمان', '3-2'),
  ('3-2-2', 'روشنایی', '3-2'),
  ('4', 'ورزش و سفر', NULL),
  ('4-1', 'پوشاک ورزشی', '4'),
  ('4-2', 'تجهیزات کمپینگ', '4');

INSERT INTO campaigns (title, cost_per_click, daily_budget, total_budget, all_categories) VALUES
  ('حراج پاییزه موبایل', 200, 50000, 5000000, FALSE),
  ('معرفی برند پوشاک', 100, 10000, 1000000, FALSE),
  ('کمپین سراسری', 300, 100000, 10000000, TRUE);

INSERT INTO campaign_categories (campaign_id, category_id) VALUES
  (1, '1-1'), (1, '1-1-1'), (1, '1-1-2'),
  (2, '2'), (2, '2-1'), (2, '2-1-1'), (2, '2-1-2'), (2, '2-2'), (2, '2-2-2');

INSERT INTO clicks (campaign_id, clicked_at)
SELECT 1, now() - random() * INTERVAL '90 days' FROM generate_series(1, 15000);

INSERT INTO clicks (campaign_id, clicked_at)
SELECT 2, now() - random() * INTERVAL '30 days' FROM generate_series(1, 12000);

INSERT INTO clicks (campaign_id, clicked_at)
SELECT 3, now() - random() * INTERVAL '7 days' FROM generate_series(1, 800);
