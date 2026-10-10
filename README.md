# Advertising Campaign Panel

A small full-stack panel for creating and managing advertising campaigns. The UI is in Persian and right-to-left.

## The task

**Create campaign:** a two-step form.

- **Step 1:** the campaign title and the categories to advertise on.
  - Categories come from the backend and are shown as a nested tree, up to three levels deep.
  - You can select a category at any level, and selecting one also selects its children.
  - You can exclude some children of a selected category.
  - A checkbox targets all categories at once.
- **Step 2:** cost per click, daily budget and total budget.
  - The three fields validate against each other: the daily budget can't be less than the cost per click, and the total budget can't be less than the daily budget.
  - Each field has three suggested values above it that fill it with one click.

**Campaign list:** a table of campaigns with title, cost per click, daily budget and total budget.

- A button next to the title opens the campaign's categories in a read-only tree, with excluded children marked. Campaigns that target all categories show a label instead.
- A pencil button next to each budget value opens a popup to edit it.
- An eye button opens a modal with every click of the campaign. A campaign can have more than 10,000 clicks, so the list is virtualized.
- Dates are stored in the Gregorian calendar on the backend and shown in the Jalali (Shamsi) calendar on the frontend.

## Tech stack

**Frontend**

- React 19, TypeScript, Vite, MUI
- React Hook Form and Yup for forms and validation
- TanStack Query for data fetching and caching
- TanStack Virtual for the clicks list
- Axios
- Knip, ESLint and Prettier

**Backend**

- Node.js with Express 5
- PostgreSQL 17, queried with `pg` and plain SQL
- Docker Compose to run the API and the database

## Running the project

You need Docker and Node.js 22 or newer.

### 1. Start the backend

From the project root:

```bash
docker compose up -d --build
```

This starts PostgreSQL on port `5432` and the API on port `4000`. On the first start, the database creates its tables and loads sample data: categories, three campaigns and about 27,000 clicks.

Check that the API is running:

```bash
curl http://localhost:4000/api/campaigns
```

To reset the database to the sample data:

```bash
docker compose down -v && docker compose up -d --build
```

### 2. Start the frontend

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:8081. The dev server forwards `/api` requests to the backend on port `4000`.

## API

| Method | Path                        | Description                   |
| ------ | --------------------------- | ----------------------------- |
| GET    | `/api/categories`           | All categories                |
| GET    | `/api/campaigns`            | All campaigns                 |
| POST   | `/api/campaigns`            | Create a campaign             |
| PATCH  | `/api/campaigns/:id`        | Update one or more budgets    |
| GET    | `/api/campaigns/:id/clicks` | All clicks of a campaign      |
| GET    | `/api/campaigns/:id/categories` | Selected category ids of a campaign |

## Project structure

```
.
├── docker-compose.yml
├── backend/
│   ├── db/init.sql        database schema and sample data
│   └── src/               Express app and routes
└── frontend/
    └── src/
        ├── api/           axios client and endpoints
        ├── modules/       types, API calls, queries and helpers per domain
        ├── sections/      page UI
        ├── pages/         route entry points
        ├── layouts/       dashboard layout
        └── theme/         MUI theme
```
