# 📚 Library Management System

## 📖 Project Description

Library Management System built using **Node.js**, **Express.js**, **MongoDB**, and **Mongoose**.

The system allows library staff to manage:

* Users
* Materials
* Loans
* Reservations
* Reviews


---

#  Technologies Used

* Node.js
* Express.js
* MongoDB
* Mongoose
* Nodemon
* Postman

---

# Setup

## 1. Install dependencies

```bash
npm install dotenv mongoose nodemon express
```

---

## 2. Run the project

```bash
npm run watch
```

# 📚 Collections

## Users

Stores:

* Members
* Librarians
* Managers

Shared fields:

* name
* email
* phone
* password
* role
* registeredAt

---

## Materials

Stores:

* Books
* Magazines
* CDs
* Maps

---

## Loans

Tracks:

* borrowed materials
* due dates
* fines
* payment status

---

## Reservations

Tracks reservations for unavailable materials.

---

## Reviews

Allows members to rate and review materials.

---

# 📮 Example Requests

## Create User

POST `/api/v1/users`

```json
{
  "name": "Ammar",
  "email": "ammar@test.com",
  "phone": "123456789",
  "password": "123456",
  "role": "member"
}
```

---

## Create Material

POST `/api/v1/materials`

```json
{
  "title": "Clean Code",
  "author": "Robert Martin",
  "publisher": "Prentice Hall",
  "publicationYear": 2008,
  "category": "science",
  "ISBN": "123456",
  "totalCopies": 5,
  "availableCopies": 5,
  "coverImageUrl": "https://image.com/book.jpg",
  "materialType": "book"
}
```

---

## Create Loan

POST `/api/v1/loans`

```json
{
  "memberId": "USER_ID",
  "librarianId": "USER_ID",
  "materialId": "MATERIAL_ID",
  "dueDate": "2026-02-01",
  "status": "active",
  "finePerDay": 1,
  "paymentStatus": "unpaid"
}
```

---

## Create Reservation

POST `/api/v1/reservations`

```json
{
  "memberId": "USER_ID",
  "materialId": "MATERIAL_ID",
  "queuePriority": 1,
  "autoCancelAfter": "2026-02-01"
}
```

---

## Create Review

POST `/api/v1/reviews`

```json
{
  "memberId": "USER_ID",
  "materialId": "MATERIAL_ID",
  "rating": 5,
  "reviewText": "Amazing book"
}
```
