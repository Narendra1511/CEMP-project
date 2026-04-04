# Cloud Event Management Platform (CEMP)

## Overview
This project is a cloud-based event management system.

## Features
- Admin can create, update, delete events
- Users can register and view events

## Technologies
- React (Frontend)
- Node.js (Backend)
- PostgreSQL (AWS RDS)

## Structure
- frontend → UI
- backend → API
- utils → helper functions
# Cloud Event Management Platform (CEMP)

A full-stack web application to manage events, user registrations, and cloud-based event workflows.

---

## 🚀 Features

- User Signup & Login (JWT Authentication)
- Role-based Access (Admin / User)
- Create Events (Admin only)
- View Events (All users)
- Register for Events
- View My Registrations
- Responsive and colorful UI

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Axios
- React Router

### Backend
- Node.js
- Express.js
- PostgreSQL (Supabase)

### Authentication
- JWT (JSON Web Token)
- bcrypt for password hashing

---

## 📁 Project Structure


---

## ⚙️ Setup Instructions

### 1. Clone the repository


---

### 2. Setup Backend


Create `.env` file:


Run backend:


---

### 3. Setup Frontend


---

## 🌐 API Endpoints

### Auth
- POST `/api/auth/register`
- POST `/api/auth/login`

### Events
- GET `/api/events`
- POST `/api/events` (admin only)

### Registrations
- POST `/api/registrations`
- GET `/api/registrations/user/:id`

---

## 🔐 Roles

- Admin → Create events
- User → Register for events

---

## 📸 Screens

- Home Page (Colorful UI)
- Login Page
- Signup Page
- Events Page
- My Registrations Page

---

## ☁️ Future Improvements

- AWS Deployment
- File upload with S3
- Notifications system
- Dashboard analytics

---

## 👨‍💻 Author

Narendra