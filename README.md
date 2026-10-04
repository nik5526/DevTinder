# DevTinder

A full-stack **MERN developer networking application** inspired by the swipe/match experience of modern social platforms. DevTinder allows developers to create profiles, discover other developers, send connection requests, manage incoming requests, and view accepted connections.

## 🚀 Project Status

DevTinder is currently under active development.

The core authentication, profile management, developer feed, connection requests, and connections functionality has been implemented. The frontend is built with React/Vite and the backend uses Node.js, Express.js, MongoDB Atlas, and Mongoose.

---

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- React Router DOM
- Redux Toolkit
- Tailwind CSS
- DaisyUI
- Axios
- ESLint

### Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcrypt / bcryptjs
- Cookie Parser
- Express Router
- CORS

---

## ✨ Features

### Authentication

- User signup
- User login
- JWT generation and verification
- HTTP-only cookie-based authentication
- Logout
- Password update
- Password hashing using bcrypt
- Current-password verification using `bcrypt.compare()`

### Profile Management

- View profile
- Edit profile
- Update:
  - First name
  - Last name
  - Age
  - Gender
  - Profile photo URL
  - About section
- Editable-field validation
- Live profile preview while editing

### Developer Feed

- Display developer profiles
- Hide the currently logged-in user
- Hide already-connected users
- Hide users with existing outgoing requests
- Hide users with existing incoming requests
- Ignore developers
- Send connection requests

### Connection Requests

- View received connection requests
- Accept requests
- Reject requests
- Remove processed requests from the pending-request UI after a successful action

### Connections

- View accepted connections
- Display connection profile information
- Prevent the logged-in user from appearing as their own connection

---

## 🔐 Authentication Architecture

DevTinder uses JWT authentication stored in an HTTP-only cookie.

The authentication flow is:

```text
Login / Signup
      ↓
Backend generates JWT
      ↓
JWT stored in HTTP-only cookie
      ↓
Browser sends cookie with authenticated requests
      ↓
Authentication middleware verifies JWT
      ↓
User information is restored from /profile/view
      ↓
User is stored in Redux
```

The JWT is intentionally not stored in Redux or localStorage.

---

## 🗂️ Project Structure

A simplified structure of the project:

```text
DevTinder/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── ...
│
└── frontend/
    ├── src/
    │   ├── Components/
    │   │   ├── Body.jsx
    │   │   ├── Navbar.jsx
    │   │   ├── Footer.jsx
    │   │   ├── SignIn.jsx
    │   │   ├── Profile.jsx
    │   │   ├── EditProfile.jsx
    │   │   ├── Feed.jsx
    │   │   ├── FeedCard.jsx
    │   │   ├── Requests.jsx
    │   │   └── Connections.jsx
    │   │
    │   ├── utils/
    │   │   ├── appStore.jsx
    │   │   ├── userSlice.jsx
    │   │   ├── requestSlice.jsx
    │   │   ├── connectionsSlice.jsx
    │   │   └── const.js
    │   │
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    │
    ├── package.json
    └── vite.config.js
```

> Folder names may change as the project continues to evolve.

---

## 🧩 Backend User Model

The user model currently includes fields such as:

```text
firstName
lastName
emailId
password
age
gender
photoUrl
about
createdAt
updatedAt
```

Validation is handled through Mongoose and `validator`.

Password values are hashed before being stored.

---

## 🤝 Connection Request Model

Connection requests contain:

```text
fromUserId
toUserId
status
```

Supported request statuses include:

```text
interested
ignored
accepted
rejected
```

The schema also validates connection requests and prevents a user from sending a request to themselves.

---

## 🔗 Important API Functionality

The backend currently supports functionality for:

- Signup
- Login
- Logout
- View profile
- Edit profile
- Receive connection requests
- Review/accept/reject connection requests
- View accepted connections
- View developer feed

The frontend communicates with the backend using Axios and authenticated requests use:

```js
{
  withCredentials: true
}
```

---

## 🎨 UI

The UI is built using **Tailwind CSS + DaisyUI**.

Current pages/components include:

- Sign In / Sign Up
- Navbar
- Footer
- Developer Feed
- Feed Cards
- Edit Profile
- Connection Requests
- Connections

The layout uses responsive Flexbox-based layouts and DaisyUI components where appropriate.

---

## 🧠 Technical Concepts Practiced

This project has been used to practice real-world MERN development concepts including:

- REST API integration
- Authentication and authorization
- JWT and cookies
- Middleware
- Express route handling
- MongoDB and Mongoose
- Mongoose validation
- Mongoose `populate()`
- Redux state management
- React Router
- Controlled React inputs
- Axios error handling
- CORS
- Responsive UI design
- Git and GitHub workflow
- Debugging using browser DevTools and Postman

---

## 🐛 Debugging Lessons

Some important issues solved during development include:

- `Cannot set headers after they are sent`
- Incorrect JWT option (`expiresIn`)
- Incorrect Mongoose enum configuration
- Incorrect route parameter names
- User ID vs ConnectionRequest ID confusion
- Incorrect Axios error status access
- Redux state disappearing after refresh
- Incorrect populated-object comparisons
- Duplicate React keys
- `null.length` errors
- Missing `await` on Axios requests
- Incorrect API response shapes being stored in Redux
- Layout and footer/scrolling issues
- External profile-image URL issues

These debugging experiences helped establish a better understanding of how frontend state, backend responses, authentication, and database models interact.

---

## ▶️ Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd DevTinder
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Install frontend dependencies

```bash
cd ../frontend
npm install
```

### 4. Configure environment variables

Create the required environment variables for your backend, including your MongoDB connection string and JWT-related configuration.

Do not commit secrets, database credentials, or private keys to GitHub.

### 5. Start the backend

```bash
npm start
```

or use the development command configured in your backend project.

### 6. Start the frontend

```bash
npm run dev
```

The Vite development server normally runs on:

```text
http://localhost:5173
```

---

## 🔄 Development Flow

A typical authenticated interaction looks like:

```text
React UI
   ↓
Axios request
   ↓
Express route
   ↓
Authentication middleware
   ↓
Controller logic
   ↓
Mongoose / MongoDB
   ↓
JSON response
   ↓
Redux / React state
   ↓
UI update
```

---

## 📌 Current Development Priorities

Planned improvements include:

- Better loading and error states
- More polished connection/request UI
- Profile photo upload instead of relying only on external URLs
- Stronger form validation and feedback
- Production deployment and environment configuration
- Further responsive/mobile UI improvements

---

## 👨‍💻 Author

**Nikhil Raj**

B.Tech CSE — Galgotias University

GitHub: `nik5526`

---

## ⭐ Notes

DevTinder is primarily a learning and portfolio project focused on understanding full-stack MERN development, authentication, API design, database relationships, Redux state management, and production-style debugging.
