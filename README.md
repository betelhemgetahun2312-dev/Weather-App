# Weather Dashboard

A full-stack weather dashboard built with Next.js (App Router) + TypeScript on the frontend and Node.js + Express.js on the backend.

## Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Frontend  | Next.js 15, TypeScript, Tailwind CSS |
| Backend   | Node.js, Express.js                 |
| HTTP      | Axios                               |
| Env Vars  | dotenv                              |

## Project Structure

```
weather app/
├── backend/
│   ├── src/
│   │   ├── app.js
│   │   ├── server.js
│   │   ├── config/
│   │   │   └── corsOptions.js
│   │   ├── controllers/
│   │   │   └── weather.controller.js
│   │   ├── middleware/
│   │   │   └── errorHandler.js
│   │   └── routes/
│   │       └── weather.routes.js
│   ├── .env.example
│   └── package.json
└── frontend/
    ├── src/
    │   ├── app/
    │   │   ├── layout.tsx
    │   │   ├── page.tsx
    │   │   └── globals.css
    │   ├── components/
    │   │   └── WeatherCard.tsx
    │   ├── hooks/
    │   │   └── useWeather.ts
    │   ├── lib/
    │   │   └── apiClient.ts
    │   └── types/
    │       └── weather.ts
    ├── .env.example
    └── package.json
```

## Getting Started

### Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

### Frontend

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

Frontend runs on `http://localhost:3000`  
Backend runs on `http://localhost:5000`

## Available Scripts

### Backend
| Script | Description |
|--------|-------------|
| `npm run dev` | Start with nodemon (hot reload) |
| `npm start` | Start in production |
| `npm run lint` | Run ESLint |
| `npm run format` | Run Prettier |

### Frontend
| Script | Description |
|--------|-------------|
| `npm run dev` | Start Next.js dev server |
| `npm run build` | Build for production |
| `npm run lint` | Run ESLint |
| `npm run format` | Run Prettier |
