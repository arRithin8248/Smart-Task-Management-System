# Smart Task Management System

A full-stack **MERN** (MongoDB, Express, React, Node.js) application for managing tasks with advanced features like priorities, categories, due dates, and authentication.

![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 🚀 Features

- **User Authentication**: Secure signup and login using JWT and bcrypt.
- **Task Management**: Create, read, update, and delete tasks.
- **Smart Organization**:
  - Priority levels (High, Medium, Low) with visual indicators.
  - Categories and Tags.
  - Due date tracking.
- **Filtering & Search**: Filter tasks by status (Pending/Completed) and Priority. Search by title/description.
- **Responsive UI**: Modern, light-themed interface built with **Tailwind CSS**.
- **Data Persistence**: MongoDB database connectivity.

## 🛠️ Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, Context API (local state), Axios, Lucide React (Icons).
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), JWT (JSON Web Tokens).

## 📋 Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js** (v14+ recommended)
- **npm** (Node Package Manager)
- **MongoDB** (Local instance running on `localhost:27017` or a MongoDB Atlas URI)

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/arRithin8248/Smart-Task-Management-System.git
cd Smart-Task-Management-System
```

### 2. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory with the following variables:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/smart-task-manager
JWT_SECRET=your_jwt_secret_key_here
```

Start the backend server:

```bash
# Development mode (uses nodemon)
npm run dev
# OR Standard start
npm start
```

Target Server URL: `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal, navigate to the frontend directory, and install dependencies:

```bash
cd frontend
npm install
```

Start the frontend development server:

```bash
npm run dev
```

Access the application at: `http://localhost:5173`

*(Note: The frontend is configured to proxy API requests to `http://localhost:5000`)*

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user and get token

### Tasks (Protected Routes)
- `GET /api/tasks` - Get all tasks for logged-in user
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## 🧪 Verification

A verification script is included to test the API endpoints automatically.

```bash
# In the root directory
npm install axios
node verify_api.js
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
