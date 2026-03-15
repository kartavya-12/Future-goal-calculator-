## Future Goals Investment Calculator

Full-stack financial education web app built with Next.js (frontend) and Node.js/Express/MySQL (backend).
🔗 **Live URL**

https://creative-prosperity-production.up.railway.app/


### Project structure

- **frontend/**: Next.js app (React, Tailwind CSS, Recharts, Framer Motion)
- **backend/**: Express API server (Node.js, MySQL)

### Backend setup

1. Install dependencies:

```bash
cd backend
npm install
```

2. Configure MySQL:

- Create a database, for example:

```sql
CREATE DATABASE future_goals_calculator CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

- Create a `.env` file in `backend/`:

```bash
DB_HOST=localhost
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=future_goals_calculator
PORT=4000
FRONTEND_ORIGIN=http://localhost:3000
```

3. Start the backend server:

```bash
cd backend
npm run dev
```

The server will:

- Initialize the `calculations` table (if it does not exist).
- Expose `POST /api/calculate-goal` which accepts:

```json
{
  "goalType": "Education",
  "goalName": "Child's college",
  "cost": 1000000,
  "years": 10,
  "inflation": 6,
  "returnRate": 12
}
```

and returns:

```json
{
  "futureGoalValue": 1790000,
  "monthlySIP": 7500,
  "totalInvestment": 900000,
  "wealthGenerated": 890000
}
```

### Frontend setup

1. Install dependencies:

```bash
cd frontend
npm install
```

2. (Optional) Configure API base URL in `frontend` by creating `.env.local`:

```bash
NEXT_PUBLIC_API_BASE=http://localhost:4000/api
```

If you skip this, the app defaults to `http://localhost:4000/api`.

3. Start the frontend dev server:

```bash
cd frontend
npm run dev
```

Then open `http://localhost:3000` in your browser.

### Key features

- **Goal-based calculator** that inflates the goal cost and computes required monthly SIP.
- **Interactive charts** for investment growth and inflation impact (Recharts).
- **What-if simulator** to explore alternative SIP, return, and timeline scenarios.
- **Multiple goals planner** showing total SIP and a pie chart of monthly allocation by goal.
- **Accessible & responsive UI** with semantic HTML, keyboard navigation, ARIA labels, and high-contrast Tailwind styling.

### Notes

- This tool is for **educational and informational purposes only** and does not provide financial advice or product recommendations.
- Actual results depend on many factors and market conditions; returns are not guaranteed.

