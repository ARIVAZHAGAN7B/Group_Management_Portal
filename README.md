# 🎯 Phase-Based Student Group Management System

A scalable and secure **Phase-Based Student Group Management Portal** designed to manage student groups, track eligibility, implement tiering mechanisms, assign tasks, and generate dynamic leaderboards — powered by **SSO Authentication and Role-Based Access Control (RBAC).**

---

## 📌 Overview

This system enables academic institutions to manage structured student progression across multiple performance phases.

It provides:

- 👥 Structured group management  
- 📊 Phase-based eligibility tracking  
- 🏆 Multi-level leaderboards  
- 🔐 Secure RBAC authorization  
- ⚙️ Scalable backend architecture  

The architecture cleanly separates:

- **Authentication → Institute SSO**
- **Authorization → Internal RBAC**
- **Ranking → Optimized MySQL Views**
- **Validation → Middleware + Joi**

---

## 🏗️ System Architecture

Client (React + TypeScript)
↓
REST API (Node.js + Express)
↓
Middleware (RBAC + Validation)
↓
Controllers
↓
Services
↓
MySQL Database (Views + UUID PKs)


### Design Principles

- Modular MVC backend architecture  
- Clean separation of concerns  
- Scalable relational schema  
- Optimized leaderboard queries  
- Secure route-level protection  
- Extensible for large academic institutions  

---

## 🚀 Core Features

### 👥 Group Management

- Dynamic group creation
- Leader & Co-Leader assignment
- Faculty supervision layer
- Membership tracking
- Tier classification system
- Group performance monitoring

---

### 📊 Phase & Eligibility Engine

- Multi-phase progression structure
- Configurable eligibility rules per phase
- Automatic qualification validation
- Tier-based group classification
- Promotion & demotion logic
- Phase-wise performance evaluation

Each phase includes:
- Assigned tasks
- Point calculation logic
- Eligibility thresholds
- Ranking evaluation criteria

---

### 🏆 Leaderboard System

The system includes three ranking layers:

#### 1️⃣ Individual Leaderboard
Ranks students based on earned points.

#### 2️⃣ Leader / Co-Leader Leaderboard
Evaluates leadership performance and contribution.

#### 3️⃣ Group Leaderboard
Ranks groups using aggregated performance metrics.

#### Performance Optimizations

- MySQL indexed views
- Top-N (Top 30) ranking queries
- Base + bonus point structure
- Phase-wise ranking isolation
- Optimized aggregation logic

---

## 🔐 Role-Based Access Control (RBAC)

### Role Hierarchy

- **Admin**
- **Faculty**
- **Leader**
- **Co-Leader**
- **Member**

### RBAC Capabilities

- Route-level access control
- Permission mapping table
- Role inheritance support
- Admin override functionality
- Restricted phase modification
- Secure action validation

### Access Rules

- Only Admin can override eligibility rules
- Faculty supervise assigned groups
- Leaders manage group members
- Members have limited interaction privileges

---

## 🗄️ Database Design

### Highlights

- UUID-based Primary Keys
- Foreign key constraints
- Phase leaderboard views
- Role-permission mapping tables
- Indexed ranking columns
- Relational integrity enforcement

### Core Entities

- Users
- Groups
- Phases
- Tasks
- Points
- Roles
- Permissions
- Leaderboard Views

---

## 🛠️ Tech Stack

### Frontend
- React
- TypeScript
- React Router
- Modular component architecture

### Backend
- Node.js
- Express.js
- Joi Validation
- JWT Authentication
- RESTful API Design

### Database
- MySQL 8+
- Indexed views for ranking optimization
- Scalable relational schema

---

## 🔌 API Structure

* /auth
* /users
* /groups
* /phases
* /tasks
* /leaderboard
* /roles


### API Features

- RESTful conventions
- Middleware-based validation
- Centralized error handling
- Role-protected endpoints
- Structured JSON responses

---

## ⚙️ Installation Guide

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/group-management-portal.git
cd group-management-portal
2️⃣ Install Dependencies
Backend:

npm install
Frontend:

cd client
npm install
3️⃣ Configure Environment Variables
Create a .env file in the backend root:

PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=group_portal
JWT_SECRET=your_secret_key
4️⃣ Run the Application
Backend:

npm run dev
Frontend:

npm start
📊 Scalability & Performance
Indexed leaderboard queries

Top-N optimized views

Modular service layer

WebSocket-ready design

Designed for horizontal scaling

Suitable for large student datasets

🔮 Future Enhancements
Real-time leaderboard updates (WebSockets)

AI-driven performance analytics

Automated tier promotion engine

Audit logging system

Notification service

Docker + CI/CD integration

Microservices architecture migration

🎓 Use Cases
College technical clubs

Hackathon progression systems

Academic competition platforms

Phase-based evaluation programs

Tier-driven student learning frameworks

💡 Key Technical Achievements
Designed a structured Phase-Driven Progression Model

Implemented secure RBAC Authorization Layer

Built optimized Top-N Leaderboard Database Views

Architected scalable MVC Backend Structure

Separated Authentication and Authorization layers

Developed rule-based eligibility validation engine

📄 License
This project is licensed under the MIT License.


---
