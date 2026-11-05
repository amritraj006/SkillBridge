# 🎓 SkillBridge — Modern Learning Management System (LMS)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5+-646CFF.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC.svg)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248.svg)](https://www.mongodb.com/)
[![Clerk](https://img.shields.io/badge/Auth-Clerk-6C47FF.svg)](https://clerk.com/)
[![Google Gemini](https://img.shields.io/badge/AI-Google_Gemini-4285F4.svg)](https://ai.google.dev/)

**SkillBridge** is a full-stack, enterprise-grade Learning Management System (LMS) designed for modern online education. It features dedicated portals for **Students**, **Instructors (Teachers)**, and **Administrators**, supercharged with **Google Gemini AI** for personalized career roadmap generation, **Clerk** for authentication, and **MongoDB Atlas** for data persistence.

---

## 📑 Table of Contents

- [Architecture & Monorepo Structure](#-architecture--monorepo-structure)
- [Key Features](#-key-features)
  - [Student Portal](#1--student-portal-client)
  - [Teacher Portal](#2--teacher-portal-teacher)
  - [Admin Portal](#3--admin-portal-admin)
  - [Backend & APIs](#4--backend-service-server)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Environment Variables](#-environment-variables)
- [Installation & Quick Start](#-installation--quick-start)
- [Database Seeding](#-database-seeding)
- [API Reference](#-api-reference)
- [Troubleshooting & FAQs](#-troubleshooting--faqs)
- [License](#-license)

---

## 🏛 Architecture & Monorepo Structure

SkillBridge is structured into four independent, decoupled packages:

```text
SkillBridge/
├── client/         # Student web application (Vite + React + Tailwind + Clerk)
├── teacher/        # Instructor dashboard for course creation & review (Vite + React)
├── admin/          # Admin control panel for approvals & platform metrics
└── server/         # Express REST API, MongoDB connection, AI & Inngest services
```

---

## ✨ Key Features

### 1. 🎓 Student Portal (`client/`)
- **Course Discovery & Filters**: Browse, search, and filter courses by category, difficulty level, and rating.
- **Rich Course Details**: Course previews, curriculum breakdown, instructor profiles, and student reviews.
- **Cart & Checkout**: Real-time cart state, slot availability validation, and seamless checkout workflow.
- **Interactive Video Learning Workspace**: Structured chapter navigation, video playback, and lecture progress tracking.
- **🤖 AI Career Roadmap Generator**: Enter any target tech skill or career goal to receive a customized, step-by-step learning roadmap generated in real-time by **Google Gemini AI**.
- **Testimonials & Feedback**: Submit and read course reviews.

### 2. 👨‍🏫 Teacher Portal (`teacher/`)
- **Course Studio**: Create, edit, and update comprehensive courses with multiple chapters and video lecture URLs.
- **Workflow & Moderation Status**: Track course submission status in real-time (`Pending`, `Approved`, `Rejected`).
- **Instructor Dashboard**: View active enrollments, course statistics, and total revenue metrics.
- **Profile & Account Management**: Manage instructor bio, credentials, and published catalog.

### 3. 🛡️ Admin Portal (`admin/`)
- **Course Moderation**: Review submitted courses with approval and rejection controls.
- **Platform Analytics**: Monitor overall platform health, total users, course counts, and enrollment stats.
- **User Management**: View and oversee student and instructor accounts.

### 4. ⚙️ Backend Service (`server/`)
- **Robust REST API**: Modular Express architecture with route-controller design.
- **Clerk Identity Auto-Sync**: Automatically handles Clerk user lifecycle and creates user profiles in MongoDB on-the-fly.
- **Resilient MongoDB Atlas Connectivity**: Public DNS resolution fallback (`8.8.8.8`) to prevent `querySrv ENOTFOUND` DNS lookup drops.
- **Asynchronous Mail Notifications**: Nodemailer receipts for order confirmations with non-blocking error guards and timeouts.
- **Inngest Event Architecture**: Scalable background workers for webhook handling and asynchronous event orchestration.

---

## 🛠 Tech Stack

| Domain | Technologies |
| :--- | :--- |
| **Frontend Frameworks** | React 18, Vite |
| **Styling & Icons** | Tailwind CSS v4, Lucide React, React Icons |
| **Authentication** | Clerk Auth (`@clerk/clerk-react`, `@clerk/clerk-sdk-node`, `@clerk/express`) |
| **Backend & Runtime** | Node.js (v18+), Express.js (v5) |
| **Database & ODM** | MongoDB Atlas, Mongoose (v9) |
| **Artificial Intelligence** | Google Generative AI SDK (`@google/generative-ai` / Gemini 1.5 & Flash) |
| **State & Data Fetching** | Axios, React Hot Toast |
| **Utilities & Services** | Inngest, Nodemailer, Morgan logger, BcryptJS, JSON Web Tokens (JWT) |

---

## 📋 Prerequisites

Before running the project locally, ensure you have:

- **Node.js**: v18.0.0 or higher
- **npm** or **yarn** / **pnpm**
- **MongoDB Atlas** cluster or a local MongoDB instance
- **Clerk Account**: Free API keys from [Clerk.com](https://clerk.com/)
- **Google AI Studio API Key**: Free Gemini API key from [Google AI Studio](https://aistudio.google.com/)

---

## 🔐 Environment Variables

Create `.env` files in each corresponding directory before launching:

### 1. `server/.env`
```env
PORT=5003
NODE_ENV=development

# MongoDB
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority

# Clerk Authentication
CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Google Gemini API
GEMINI_API_KEY=AIzaSy...

# Inngest (Optional for local dev)
INNGEST_EVENT_KEY=...
INNGEST_SIGNING_KEY=...

# Email Notifications (Optional)
GMAIL_USER=your_email@gmail.com
GMAIL_APP_PASSWORD=your_gmail_app_password

# JWT (For student auth endpoints)
JWT_SECRET=your_jwt_secret_key
```

### 2. `client/.env`
```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
VITE_BACKEND_API=http://localhost:5003
```

### 3. `teacher/.env`
```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
VITE_BACKEND_URL=http://localhost:5003
```

### 4. `admin/.env`
```env
VITE_BACKEND_URL=http://localhost:5003
VITE_ADMIN_EMAIL=admin@skillbridge.com
VITE_ADMIN_PASSWORD=your_admin_password
```

---

## 🚀 Installation & Quick Start

Open four terminal tabs (or split panes) to run the services concurrently:

### 1. Backend Server
```bash
cd server
npm install
npm run dev
# Server starts on http://localhost:5003
```

### 2. Student Portal (Client)
```bash
cd client
npm install
npm run dev
# App starts on http://localhost:5173
```

### 3. Teacher Portal
```bash
cd teacher
npm install
npm run dev
# App starts on http://localhost:5174 (or next free port)
```

### 4. Admin Portal
```bash
cd admin
npm install
npm run dev
# App starts on http://localhost:5175 (or next free port)
```

---

## 📦 Database Seeding

The server includes pre-configured utility scripts to populate or reset sample course catalog data:

- **Seed sample courses with high-quality media**:
  ```bash
  cd server
  node insert.js
  ```

- **Clear all courses**:
  ```bash
  cd server
  node delete.js
  ```

---

## 📡 API Reference

All backend API routes are prefixed under `/api`:

### Courses (`/api/courses`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/courses` | Fetch all approved courses for students |
| `GET` | `/api/courses/:id` | Fetch complete details of a single course |
| `POST` | `/api/courses/create` | Submit a new course (Teacher) |
| `GET` | `/api/courses/teacher/:teacherId/all` | Fetch all courses created by a teacher |
| `GET` | `/api/courses/teacher/:teacherId/pending` | Fetch teacher's pending courses |
| `GET` | `/api/courses/teacher/:teacherId/approved` | Fetch teacher's approved courses |
| `PUT` | `/api/courses/teacher/update/:courseId` | Update course curriculum or details |
| `PUT` | `/api/courses/admin/status/:id` | Update approval status (Admin) |

### AI Roadmaps (`/api/roadmap`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/roadmap/generate` | Generate AI-driven learning roadmap using Google Gemini |

### User, Cart & Purchases (`/api/user`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/user/cart/:userId` | Get user's current shopping cart items |
| `POST` | `/api/user/cart-toggle` | Add / remove course from user cart |
| `GET` | `/api/user/:userId/purchased-courses` | Get list of course IDs purchased by user |
| `POST` | `/api/user/payment-success` | Confirm order, enroll user, and clear cart |
| `GET` | `/api/user/:userId` | Get user profile details |

### Testimonials (`/api/testimonials`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/testimonials` | Fetch all approved testimonials |
| `POST` | `/api/testimonials/add` | Submit student review/testimonial |

---

## ❓ Troubleshooting & FAQs

<details>
<summary><b>1. MongoDB connection failed: querySrv ENOTFOUND</b></summary>

- **Cause**: Node's internal DNS resolver dropped or failed to resolve the MongoDB Atlas SRV record on your local ISP/WiFi.
- **Solution**: The server is pre-configured with `dns.setServers(['8.8.8.8', '8.8.4.4'])` in `server/config/db.js`. Also ensure your current IP is whitelisted (`0.0.0.0/0`) in **MongoDB Atlas > Security > Network Access** and your cluster is not paused.
</details>

<details>
<summary><b>2. net::ERR_SSL_PROTOCOL_ERROR</b></summary>

- **Cause**: Frontend `.env` was using `https://localhost:5003` instead of `http://localhost:5003`.
- **Solution**: Verify `VITE_BACKEND_URL` / `VITE_BACKEND_API` use `http://` in `.env` and restart Vite dev servers.
</details>

<details>
<summary><b>3. Payment shows "Processing..." without completion</b></summary>

- **Cause**: Nodemailer hanging on SMTP connection if Gmail credentials are empty or timing out.
- **Solution**: Email delivery is handled non-blocking in `userController.js`, and `sendEmail.js` safely guards unconfigured credentials with connection timeouts.
</details>

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
