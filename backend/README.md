# backend

> Rectop backend

## :wrench: Setup

```bash
cp .env.sample .env # change values after copying
npm i
npm run dev
```

## :construction_worker: Build

```bash
npm run build
npm start
```

### :arrow_right: Usage

```bash
GET /api/atms?x=23&y # get initial ATMs
POST /api/atms/recommend # get recommended ATMs
POST /api/transactions/ # create transaction
POST /api/transactions/withdraw # withdraw money from ATM
GET /api/users/balance # get user balance
```

### :package: Technologies used

* Node.js, TypeScript, Express, MongoDB
