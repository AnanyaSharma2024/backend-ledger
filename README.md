# Ledger Backend API

A simple **Ledger-based Backend System** built with **Node.js, Express, and MongoDB**.
This project implements authentication, account management, and a ledger-based transaction system similar to how banking systems track balances.

---

## Features

* User Authentication (Signup, Login, Logout)
* JWT-based Authorization
* Account Creation and Management
* Ledger-based Balance Calculation
* Initial Funds Transaction
* Double-entry style transaction structure
* Secure API routes using middleware

---

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Cookie Parser

---

## Project Structure

```
src
 ├── controller
 │     account.controller.js
 │     auth.controller.js
 │     transaction.controller.js
 │
 ├── middleware
 │     auth.middleware.js
 │
 ├── models
 │     user.model.js
 │     account.model.js
 │     ledger.model.js
 │
 ├── routes
 │     auth.routes.js
 │     account.routes.js
 │     transaction.routes.js
 │
 └── app.js
server.js
```

---

## Installation

Clone the repository:

```
git clone https://github.com/yourusername/backend-ledger.git
```

Install dependencies:

```
npm install
```

Create a `.env` file in the root directory and add:

```
PORT=3000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

Run the server:

```
npm run dev
```

Server will start at:

```
http://localhost:3000
```

---

## API Endpoints

### Authentication

POST `/api/auth/signup`

```
{
 "name": "User",
 "email": "user@gmail.com",
 "password": "123456"
}
```

POST `/api/auth/login`

```
{
 "email": "user@gmail.com",
 "password": "123456"
}
```

POST `/api/auth/logout`

---

### Accounts

Create Account

POST `/api/accounts/create`

```
{
 "name": "Savings Account",
 "currency": "INR"
}
```

Get All Accounts

GET `/api/accounts`

Get Account by ID

GET `/api/accounts/:id`

Check Balance

GET `/api/accounts/balance/:accountId`

---

### Transactions

Add Initial Funds

POST `/api/transactions/system/initial-funds`

```
{
 "toAccount": "ACCOUNT_ID",
 "amount": 10000
}
```

Create Transaction

POST `/api/transactions/create`

```
{
 "fromAccount": "ACCOUNT_ID",
 "toAccount": "ACCOUNT_ID",
 "amount": 150,
 "idempotencyKey": "txn-001"
}
```

---

## Ledger Concept

This project follows a **ledger-based accounting system**.

Balance is calculated as:

```
Balance = Total Credits - Total Debits
```

Instead of storing balance directly, transactions are recorded in the **ledger collection**, and the balance is calculated dynamically.

---

## Future Improvements

* Transaction history API
* Transfer between multiple accounts
* Rate limiting
* API documentation with Swagger
* Unit testing

---

## Author

Ananya Sharma
