# 🌐 Connectify

Connectify is a modern full-stack social media web application built using the MERN stack. It enables users to connect, share posts, interact through likes and comments, follow others, and communicate via real-time messaging.

Designed with scalability, performance, and user experience in mind, Connectify demonstrates production-level architecture and real-world social platform features.

---

## ✨ Features

### 🔐 Authentication & Security
- User registration & login (JWT-based authentication)
- Password hashing using bcrypt
- Protected routes and secure API access

### 📝 Posts & Feed
- Create, edit, and delete posts
- Image upload support (Cloudinary)
- Dynamic feed rendering
- Optimistic UI updates for better UX

### ❤️ Engagement
- Like / Unlike posts
- Comment system (add, edit, delete)
- Real-time UI updates

### 👤 User Profiles
- View and edit profile
- Profile & cover image upload
- Followers / Following system
- About section & personal details

### 🤝 Social Features
- Follow / Unfollow users
- User suggestions (planned/improvable)
- Profile navigation system

### 💬 Messaging (Real-Time)
- One-to-one chat system
- Real-time messaging using Socket.io
- Instant message updates without refresh

### 🔔 Notifications (Planned / In Progress)
- Like, comment, and follow notifications
- Real-time updates (Socket-based)

### 🎨 UI / UX
- Fully responsive layout (in progress)
- Clean and modern design using Tailwind CSS
- Sidebar layout (Profile + Messages + Feed)

---

## 🛠️ Tech Stack

### Frontend
- React.js (Vite)
- Tailwind CSS
- Axios
- React Router

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication

### Real-Time
- Socket.io

### Media Storage
- Cloudinary

---

## 📁 Project Structure

```bash

connectify/
│
├── client/ # Frontend (React)
│ ├── components/
│ ├── pages/
│ ├── api/
│ └── socket.js
│
├── server/ # Backend (Node/Express)
│ ├── models/
│ ├── controllers/
│ ├── routes/
│ ├── middleware/
│ └── config/
│
└── README.md

```
---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash

git clone https://github.com/your-username/connectify.git
cd connectify

```

---

### 2️⃣ Backend Setup

``` bash
cd server
npm install

Create .env file:

MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
CLOUDINARY_URL=your_cloudinary_url

Run server:

npm run dev

```
---

### 3️⃣ Frontend Setup

``` bash

cd client
npm install
npm run dev

```
---

## 🚀 Future Improvements

* 🔍 User & post search functionality
* 📊 Activity tracking & analytics
* 💬 Group chat system
* 🌙 Dark mode support

---

##  💡 Author

** Syeda Mahnoor **
Software Engineering Student | MERN Stack Developer