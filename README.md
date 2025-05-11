# Student Information System (SIS)

A modern web-based Student Information System built with React and Node.js, featuring user management and student record management capabilities.

## Project Overview

This is a full-stack web application with separate client and server components:
- **Frontend**: React application built with Vite
- **Backend**: Node.js/Express.js server with MongoDB database

## Features

- User Authentication (Login/Register)
- Student Management
- User Management
- Responsive Design using Ant Design (antd)
- Modern UI/UX

## Tech Stack

### Frontend
- React 19
- React Router DOM
- Ant Design (antd)
- Axios for API calls
- Vite as build tool

### Backend
- Node.js with Express.js
- MongoDB with Mongoose
- CORS enabled
- RESTful API architecture

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── pages/        # Page components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── assets/       # Static assets
│   │   └── App.jsx       # Main application component
│   └── public/           # Public assets
│
└── server/               # Backend Node.js application
    ├── student/          # Student-related modules
    │   ├── student_Model.js
    │   ├── studentController.js
    │   └── studentRoutes.js
    ├── user/            # User-related modules
    │   ├── user_Model.js
    │   ├── userController.js
    │   └── userRoutes.js
    └── index.js         # Server entry point
```

## Getting Started

### Prerequisites
- Node.js (latest LTS version)
- MongoDB installed and running
- Git

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd SIS-LastAcitivity
```

2. Install frontend dependencies:
```bash
cd client
npm install
```

3. Install backend dependencies:
```bash
cd ../server
npm install
```

### Running the Application

1. Start the backend server:
```bash
cd server
npm start
```

2. Start the frontend development server:
```bash
cd client
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

## Development

### Frontend Development
- Run `npm run dev` in the client directory for development
- Run `npm run build` to create a production build
- Run `npm run lint` to check for code style issues

### Backend Development
- Run `npm start` in the server directory to start the server with nodemon
- The server will automatically restart when changes are detected

## License

ISC License