📘 Backend Concepts Learning (Node.js + MongoDB)

This repository is focused on learning backend development concepts,
not building a complete project yet.

The goal is to understand core backend fundamentals step by step before moving into frontend or full applications.

🎯 Learning Goal

Learn how backend works internally

Understand folder-based architecture

Practice real-world backend concepts

Build strong foundation before full project development

📁 Folder-Based Architecture (Learned)
src/
│
├── server.js
├── app.js
│
├── config/
│   ├── db.js
│   └── cloudinary.js
│
├── models/
│   └── users.schema.js
│
├── controllers/
│   ├── user.controller.js
│   └── upload.controller.js
│
├── middlewares/
│   ├── validateUser.middlewares.js
│   ├── multer.middlewares.js
│   └── auth.middleware.js (basic)
│
├── routes/
│   ├── user.routes.js
│
└── utils/ (future use)

✅ Backend Concepts Learned
🧠 Core Node.js & Express

Express server setup

app.js vs server.js separation

Routing system

Request & Response lifecycle

📂 Folder Based Structure

Config layer

Model layer

Controller layer

Middleware layer

Route layer

Clean separation of concerns

🗄️ MongoDB & Database Concepts

MongoDB Atlas connection

Collections & documents

Schema-like structure (manual schema)

CRUD operations:

Create

Read

Update

Delete

Querying by field (email)

createdAt & updatedAt handling

👤 User Data Handling

User creation

Unique email validation

Update specific fields (phone, image)

Delete user safely

Avoid updating restricted fields

🔐 Password Security

Password hashing using bcrypt

Password comparison logic (learned conceptually)

Storing hashed passwords only

🧪 Validation & Middleware

Custom validation middleware

Request body validation

Email uniqueness check

Middleware execution flow

🖼️ File Upload & Image Handling

Multer usage

Multipart/form-data handling

Upload image from request

Cloudinary integration

Store image URL & public_id in DB

Replace image (delete old → upload new)

Delete Cloudinary image on user delete

☁️ Cloudinary Concepts

Cloudinary config

Upload image via API

Folder management

Image lifecycle (upload / update / delete)

public_id usage

🧰 Environment & Configuration

.env usage

Secure credentials handling

Config-based setup

⚠️ Concepts NOT Learned Yet (Pending)
🔐 Authentication & Authorization

Login system ❌

JWT access token ❌

Refresh token ❌

Token validation middleware ❌

Logout flow ❌

Role-based authorization ❌

📝 Blog System (Not Started)

Blog schema

Blog CRUD

Author relationship

Blog image handling

💬 Advanced Backend Features

Pagination

Search & filtering

Rate limiting

Helmet security

API versioning

Error handling standards

Logging system

⚛️ Frontend Integration

React integration ❌

React Hook Form ❌

Auth flow frontend ↔ backend ❌

🧠 Current Status

This repository is a backend learning playground,
focused on understanding concepts, not delivering a finished product.

🚀 Next Learning Steps

Login system (password compare)

JWT access token

Auth middleware (protect routes)

Refresh token

Role-based authorization

Blog system

🧩 Learning Philosophy

Understand why, not just how

Build concepts step by step

No shortcut, no copy-paste mindset

Strong backend foundation first

🏁 Conclusion

✔ Backend fundamentals learned
✔ Real-world backend practices understood
⏳ Authentication & advanced features still pending