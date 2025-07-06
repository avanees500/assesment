# 📦 NestJS Role-Based Document Management System

This project is a role-based authentication and document management system built using **NestJS**, **Sequelize**, **PostgreSQL**, and **Docker**. It includes user registration, login, role management, and secure document upload functionality.

---

## 🚀 Getting Started

### ✅ Prerequisites

- Docker installed on your system
- Node.js and npm installed

---

## ⚙️ Setup Instructions

```bash
# 1. Install Docker and run the containers
docker-compose up -d

# 2. Install dependencies
npm install

# 3. Create database tables
npm run migrate

# 4. Seed default roles and admin user
npm run seed

# 5. Start the application in development mode
npm run start:dev


 Note: Some example cURL commands are provided below for your reference. You can use them to test the APIs quickly from the terminal or any HTTP client.


curl --location 'http://localhost:3000/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{
  "email": "admin@example.com",
  "password": "password123"
}'

curl --location 'http://localhost:3000/auth/register' \
--header 'Content-Type: application/json' \
--data-raw '{
  "name": "Avaneesh",
  "email": "avanees7@example.com",
  "mobileNumber": "7882678902",
  "password": "StrongPass123"
}'

curl --location 'http://localhost:3000/users/assign' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <ACCESS_TOKEN>' \
--data '{
  "userId": 10,
  "roleId": 7
}'

curl --location 'http://localhost:3000/roles' \
--header 'Authorization: Bearer <ACCESS_TOKEN>'

curl --location 'http://localhost:3000/documents/upload' \
--header 'Authorization: Bearer <ACCESS_TOKEN>' \
--form 'file=@"C:/Users/absh4/OneDrive/Pictures/Screenshots/Screenshot (1).png"'

{
  "success": true,
  "message": "Request successful",
  "data": {
    "id": 3,
    "filename": "fcc51d41-c0d5-41f8-9cb3-ca8db3f91da1.png",
    "originalName": "Screenshot (1).png",
    "mimeType": "image/png",
    "size": 185074,
    "path": "\\uploads\\documents\\fcc51d41-c0d5-41f8-9cb3-ca8db3f91da1.png",
    "createdBy": "admin@example.com",
    "updatedAt": "2025-07-06T06:55:38.918Z",
    "createdAt": "2025-07-06T06:55:38.918Z",
    "updatedBy": null
  }
}

{
  "success": false,
  "message": "Invalid credentials",
  "statusCode": 401,
  "timestamp": "2025-07-06T08:28:43.213Z",
  "path": "/auth/login"
}


```
