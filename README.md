# 📌 **LinkedIn Clone**

A full-stack social networking web app inspired by LinkedIn — featuring posts, likes, comments, real-time updates, connection requests, notifications, user profiles, search, friend suggestions, and more.

---

## 🚀 **Features**

### 🔐 **Authentication**

* JWT-based secure login
* Protected routes with middleware
* Cookie-based session management

### 👤 **User Profiles**

* Edit profile (name, username, skills, education, experience, location)
* Upload profile & cover images using Cloudinary
* View other users’ profiles
* Follow/connect system

### 📝 **Posts**

* Create text or image posts
* Like/unlike posts
* Comment on posts
* Infinite scrolling feed
* Real-time UI updates with Socket.io

### 🔔 **Notifications**

Automatically created when:

* Someone likes your post
* Someone comments (with the comment text included)
* Someone accepts your connection request

Includes:

* Notification page
* Delete one notification
* Clear all notifications
* Dynamically updating notification bell

### 🔍 **Search**

* Search users by first name, last name, username, skills
* Keyboard navigation (↑ ↓ Enter)
* Profile image previews
* Excludes logged-in user
* “No users found” message
* Click to open profile

### 🤝 **Connections**

* Send connection request
* Accept / Reject
* Pending state
* Disconnect users
* Smart friend-suggestion system (excludes connected + self)

### 📡 **Real-Time (Socket.io)**

* Post create events
* Like updates
* Comment updates
* Notification events (extensible)

### 📱 **Responsive UI**

* Tailwind CSS
* Mobile search bar
* Mobile-friendly feed
* Sidebar suggestions
* Sticky navigation

---

## 🛠 **Tech Stack**

### **Frontend**

* React.js
* React Router
* Axios
* Tailwind CSS
* Socket.io Client

### **Backend**

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication
* Multer (image upload)
* Cloudinary SDK
* Socket.io Server

### **Other**

* macOS development
* Homebrew environment
* Postman API testing

---

## 📁 **Project Structure**

```
/client
  ├── src
  │    ├── components
  │    ├── pages
  │    ├── context
  │    ├── assets
  │    └── App.jsx

/server
  ├── controllers
  ├── models
  ├── routes
  ├── config
  ├── middlewares
  └── index.js
```

---

## 🔧 **Environment Variables**

### **Frontend**

Create `.env`:

```
VITE_SERVER_URL=http://localhost:8000
```

### **Backend**

Create `.env`:

```
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret
CLOUDINARY_CLOUD_NAME=xxxx
CLOUDINARY_API_KEY=xxxx
CLOUDINARY_API_SECRET=xxxx
CLIENT_URL=http://localhost:5173
```

---

## 📦 **Installation & Setup**

### **1️⃣ Clone the Repo**

```bash
git clone https://github.com/yourusername/yourrepo.git
cd yourrepo
```

---

## **Backend Setup**

```bash
cd server
npm install
npm start
```

This starts Express at:

```
http://localhost:8000
```

---

## **Frontend Setup**

```bash
cd client
npm install
npm run dev
```

Runs React at:

```
http://localhost:5173
```

---

## 🔌 **Running Both Together**

Use two terminals:

```
Terminal 1 → npm start (backend)
Terminal 2 → npm run dev (frontend)
```

---

## 🧪 **API Overview**

### 🔹 **User**

* `GET /api/user/currentUser`
* `PUT /api/user/updateProfile`
* `GET /api/user/profile/:username`
* `GET /api/user/search?query=xyz`
* `GET /api/user/suggestedusers`

### 🔹 **Post**

* `POST /api/post/create`
* `GET /api/post/getpost?page=1`
* `PUT /api/post/like/:id`
* `POST /api/post/comment/:id`

### 🔹 **Connection**

* `GET /api/connection/getstatus/:userId`
* `POST /api/connection/send/:userId`
* `PUT /api/connection/accept/:requestId`
* `DELETE /api/connection/remove/:userId`

### 🔹 **Notifications**

* `GET /api/notification/get`
* `DELETE /api/notification/deleteone/:id`
* `DELETE /api/notification/` (clear all)

---

## 📸 **Screenshots (Add later)**

* Home feed
* Notifications
* User profile
* Search modal
* Connection requests
* Create post modal
* Friend suggestions sidebar
* Comments section

(Add images in `/screenshots` folder)

---

## 🧩 **Improvements / Next Steps**

* Real-time notifications via socket
* Chat/messaging system
* Post sharing
* Profile cover image cropper
* Hashtags & mentions
* Dark mode
* Reporting system
* Admin dashboard

---

## 🧑‍💻 **Author**

**Jashan Garg**
Full-Stack Developer
PEC Chandigarh

---

If you want, I can also generate:

🔥 Perfect GitHub description
🔥 Project banner image
🔥 Demo video script
🔥 Deployment steps (Vercel + Render + MongoDB Atlas)
🔥 Production build instructions

Just say the word.
