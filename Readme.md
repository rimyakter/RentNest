# 🏠 RentNest Backend API

A RESTful backend API for a property rental platform built with **Node.js**, **Express.js**, **TypeScript**, **Prisma ORM**, **PostgreSQL**, and **Stripe**. The platform allows landlords to list rental properties, tenants to request rentals, make secure payments, and leave reviews.

---

## 🚀 Features

- JWT Authentication & Authorization
- Role-based Access Control (Admin, Landlord, Tenant)
- Property Management
- Category Management
- Rental Request Management
- Stripe Payment Integration
- Property Reviews
- PostgreSQL Database with Prisma ORM
- TypeScript Support
- Zod Request Validation
- Global Error Handling

---

# 🛠️ Tech Stack

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Prisma ORM
- Stripe
- JWT Authentication
- Zod
- Cookie Parser

---

# 📁 Project Structure

```
src
│
├── config
├── middleware
├── modules
│   ├── auth
│   ├── category
│   ├── payment
│   ├── property
│   ├── rental-request
│   ├── review
│   └── user
│
├── lib
├── utils
├── server.ts
└── app.ts
```

---

# 👥 User Roles

| Role     | Permissions                                                        |
| -------- | ------------------------------------------------------------------ |
| ADMIN    | Manage categories, view users                                      |
| LANDLORD | Manage own properties, approve/reject rental requests              |
| TENANT   | Browse properties, create rental requests, pay rent, write reviews |

---

# 📦 Database Models

## User

- id
- name
- email
- password
- role

---

## Category

- id
- name
- description
- icon

---

## Property

- id
- title
- description
- price
- bedrooms
- bathrooms
- address
- city
- image
- available
- ownerId
- categoryId

---

## Rental Request

- id
- propertyId
- renterId
- moveInDate
- duration
- message
- status

Status

- PENDING
- APPROVED
- REJECTED
- ACTIVE
- COMPLETED

---

## Payment

- id
- transactionId
- rentalRequestId
- renterId
- amount
- provider
- method
- status
- paidAt

Payment Status

- PENDING
- COMPLETED
- FAILED

Payment Provider

- STRIPE

Payment Method

- CARD

---

## Review

- id
- propertyId
- renterId
- rating
- comment

---

# 🔐 Authentication

Authentication uses **JWT**.

Include the access token in the Authorization header.

```
Authorization: Bearer <token>
```

---

# 📚 API Endpoints

## Authentication

| Method | Endpoint         | Access |
| ------ | ---------------- | ------ |
| POST   | `/auth/register` | Public |
| POST   | `/auth/login`    | Public |

---

## Users

| Method | Endpoint    | Access        |
| ------ | ----------- | ------------- |
| GET    | `/users/me` | Authenticated |
| GET    | `/users`    | Admin         |

---

## Categories

| Method | Endpoint          | Access |
| ------ | ----------------- | ------ |
| GET    | `/categories`     | Public |
| GET    | `/categories/:id` | Public |
| POST   | `/categories`     | Admin  |
| PATCH  | `/categories/:id` | Admin  |
| DELETE | `/categories/:id` | Admin  |

---

## Properties

| Method | Endpoint          | Access         |
| ------ | ----------------- | -------------- |
| GET    | `/properties`     | Public         |
| GET    | `/properties/:id` | Public         |
| POST   | `/properties`     | Landlord/Admin |
| PATCH  | `/properties/:id` | Landlord/Admin |
| DELETE | `/properties/:id` | Landlord/Admin |

---

## Rental Requests

| Method | Endpoint       | Access                |
| ------ | -------------- | --------------------- |
| POST   | `/rentals`     | Tenant                |
| GET    | `/rentals`     | Tenant                |
| GET    | `/rentals/:id` | Tenant/Landlord/Admin |
| PATCH  | `/rentals/:id` | Landlord              |

---

## Payments

| Method | Endpoint                              | Access         |
| ------ | ------------------------------------- | -------------- |
| POST   | `/payments/checkout/:rentalRequestId` | Tenant         |
| GET    | `/payments/my`                        | Tenant         |
| POST   | `/payments/webhook`                   | Stripe Webhook |

---

## Reviews

| Method | Endpoint       | Access       |
| ------ | -------------- | ------------ |
| GET    | `/reviews`     | Public       |
| GET    | `/reviews/:id` | Public       |
| POST   | `/reviews`     | Tenant       |
| PATCH  | `/reviews/:id` | Tenant       |
| DELETE | `/reviews/:id` | Tenant/Admin |

---

# 💳 Stripe Payment Flow

1. Tenant creates a rental request.
2. Landlord approves the request.
3. Tenant creates a Stripe Checkout Session.
4. Stripe processes the payment.
5. Stripe sends a webhook.
6. Payment status becomes **COMPLETED**.
7. Rental Request status becomes **ACTIVE**.

---

# ⚙️ Environment Variables

Create a `.env` file.

```env
PORT=5000

DATABASE_URL=

JWT_ACCESS_SECRET=
JWT_ACCESS_EXPIRES_IN=7d

STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

CLIENT_URL=http://localhost:5000
```

---

# 🖥️ Installation

Clone the repository

```bash
git clone <repository-url>
```

Install dependencies

```bash
npm install
```

Generate Prisma Client

```bash
npm run db:generate
```

Run migrations

```bash
npm run db:migrate
```

Start development server

```bash
npm run dev
```

Run Stripe webhook listener

```bash
npm run webhook:stripe
```

---

# 🧪 Default Workflow

1. Register as a Landlord.
2. Register as a Tenant.
3. Admin creates property categories.
4. Landlord creates properties.
5. Tenant browses properties.
6. Tenant submits a rental request.
7. Landlord approves the request.
8. Tenant completes payment using Stripe.
9. Tenant writes a review after renting.

---

# 📌 API Response Format

Success

```json
{
  "success": true,
  "message": "Success",
  "data": {}
}
```

Error

```json
{
  "success": false,
  "message": "Error message"
}
