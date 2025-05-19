# 📚 Book Review RESTful API

This project is a simple, secure, and modular **Book Review API** built using **Node.js**, **Express.js**, **PostgreSQL**, and **JWT Authentication**. Users can sign up, log in, browse books, submit reviews, and search books — all via a clean RESTful API design.

---

## 🚀 Features

- User authentication with JWT
- Add, retrieve, and search books
- Submit one review per book per user
- Update and delete own reviews
- Pagination support
- Clean modular architecture

---

## 🛠️ Tech Stack

- **Backend:** Node.js + Express.js
- **Database:** PostgreSQL + Sequelize ORM
- **Authentication:** JSON Web Token (JWT)
- **Environment Configuration:** dotenv
- **Security:** bcrypt for password hashing

---

## 📁 Project Structure

```
book-review-api/
├── controllers/       # All controller logic
├── middleware/        # JWT auth middleware
├── models/            # Sequelize models
├── routes/            # All route definitions
├── config/            # Sequelize DB config
├── .env               # Environment variables
├── app.js             # Main application
├── package.json
└── README.md
```

---

## 📦 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/AkashBabar/Book-Review-API.git
cd Book-Review-API
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root folder and add:

```
PORT=5000
JWT_SECRET=your_jwt_secret_key
DB_HOST=localhost
DB_USER=your_postgres_username
DB_PASSWORD=your_postgres_password
DB_NAME=bookreview
DB_PORT=5432
```

### 4. Set Up PostgreSQL Database

Login to PostgreSQL and run:

```sql
CREATE DATABASE book_review_db;
```

### 5. Run Sequelize Migrations

```bash
npx sequelize-cli db:migrate
```

### 6. Start the Server

```bash
node server.js
```

Server runs at: `http://localhost:5000`

---

## 🧪 API Endpoints

### 🔐 Authentication

| Method | Endpoint   | Description              |
|--------|------------|--------------------------|
| POST   | `/api/auth/signup`  | Register new user        |
| POST   | `/api/auth/login`   | Authenticate and get JWT |

---

### 📚 Books

| Method | Endpoint        | Description                                                  |
|--------|------------------|--------------------------------------------------------------|
| POST   | `/api/books`         | Add a new book (Authenticated users only)                |
| GET    | `/api/books`         | Get all books with pagination and optional filters       |
| GET    | `/books/:id`     | Get book details by ID, including average rating & reviews   |

---

### 🔍 Search

| Method | Endpoint           | Description                                |
|--------|--------------------|--------------------------------------------|
| GET    | `/api/search?query=...`    | Search books by title or author (partial)  |

---

### 📝 Reviews

| Method | Endpoint                 | Description                              |
|--------|---------------------------|------------------------------------------|
| POST   | `/api/books/:id/reviews`      | Submit a review (authenticated only) |
| PUT    | `/api/books/reviews/:id`            | Update your own review         |
| DELETE | `/api/books/reviews/:id`            | Delete your own review         |

---

## 📘 Example API Requests

### 1. Signup

```bash
postman -X POST http://localhost:5000/api/auth/signup \
-H "Content-Type: application/json" \
-d '{"username":"john", "password":"123456"}'
```

### 2. Login

```bash
postman -X POST http://localhost:5000/api/auth/login \
-H "Content-Type: application/json" \
-d '{"username":"john", "password":"123456"}'
```

### 3. Add a Book

```bash
postman -X POST http://localhost:5000/api/books \
-H "Authorization: Bearer <JWT_TOKEN>" \
-H "Content-Type: application/json" \
-d '{"title":"1984", "author":"George Orwell", "genre":"Dystopian", "description":"Classic dystopian novel."}'
```

### 4. Get Books with Filters

```bash 
postman "http://localhost:5000/api/books?page=1&limit=5&author=George&genre=Dystopian"
```

### 5. Search Books

```bash
postman "http://localhost:5000/api/search?q=orwell"
```

### 6. Submit a Review

```bash
postman -X POST http://localhost:5000/books/1/reviews \
-H "Authorization: Bearer <JWT_TOKEN>" \
-H "Content-Type: application/json" \
-d '{"rating": 5, "comment": "A masterpiece!"}'
```

---

## 🧱 Database Schema

### 📄 Users

| Field     | Type     | Description         |
|-----------|----------|---------------------|
| id        | INTEGER  | Primary Key         |
| username  | STRING   | Unique              |
| password  | STRING   | Hashed with bcrypt  |

---

### 📄 Books

| Field       | Type     | Description        |
|-------------|----------|--------------------|
| id          | INTEGER  | Primary Key        |
| title       | STRING   | Book title         |
| author      | STRING   | Author name        |
| genre       | STRING   | Genre              |
| description | TEXT     | Book description   |

---

### 📄 Reviews

| Field     | Type     | Description                |
|-----------|----------|----------------------------|
| id        | INTEGER  | Primary Key                |
| rating    | INTEGER  | 1–5 rating                 |
| comment   | TEXT     | Review message             |
| UserId    | INTEGER  | Foreign key to Users table |
| BookId    | INTEGER  | Foreign key to Books table |

---

## 🧠 Design Decisions & Assumptions

- JWT tokens are used for stateless authentication.
- Passwords are hashed using bcrypt.
- Users can submit only one review per book.
- Pagination is supported for books and reviews.
- Search is case-insensitive and supports partial matches.
- Authorization is enforced to allow only review owners to edit/delete.

---

## ✅ Future Enhancements

- Admin roles and book moderation
- Review ratings breakdown (bar chart)
- Swagger/OpenAPI documentation
- Book cover uploads (images)
- Email verification or password reset

---

## 👨‍💻 Author

**Akash Babar**  
Java & Full Stack Developer  
[LinkedIn](https://linkedin.com/in/akashbabar) | [GitHub](https://github.com/AkashBabar)
