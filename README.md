Finance Dashboard

A full-stack Finance Dashboard application built to manage financial records securely and efficiently. The project provides role-based access control, analytics, and interactive dashboards for tracking income, expenses, and trends.

🚀 Features
🔐 Authentication & Security
Secure login and registration using Spring Security and JWT Authentication
Role-based access control:
Admin – Full access to all operations
Analyst – Manage and analyze records
Viewer – Read-only access
💰 Financial Management
Add, update, view, and delete financial records
Soft delete functionality for better data recovery and reliability
Category-based transaction management
📊 Analytics & Insights
Income vs Expense summaries
Category-wise spending insights
Monthly financial trends
Dashboard visualizations
⚡ Advanced Functionalities
Pagination for large datasets
Search and filtering options
REST API integration between frontend and backend
Responsive and user-friendly UI
🛠️ Tech Stack
Backend
Java
Spring Boot
Spring Security
JWT
Spring Data JPA
H2 / MySQL
Frontend
React.js
HTML
CSS
JavaScript
Axios
Deployment
AWS EC2
📂 Project Structure
Finance-Dashboard/
│── backend/     # Spring Boot Backend
│── frontend/    # React Frontend
⚙️ Installation & Setup
1. Clone Repository
git clone https://github.com/your-username/Finance-Dashboard.git
cd Finance-Dashboard
2. Backend Setup
cd backend
mvn spring-boot:run

Backend runs on:

http://localhost:8080
3. Frontend Setup
cd frontend
npm install
npm start

Frontend runs on:

http://localhost:3000
🔑 Roles & Access
Role	Permissions
Admin	Full CRUD + User Management
Analyst	CRUD + Analytics
Viewer	View Only
🌍 Deployment

The application is deployed on AWS EC2 for real-world accessibility and scalability.

📈 Impact
Improved financial visibility through real-time dashboards
Enhanced data security with JWT authentication
Better reliability using soft deletes
Scalable architecture for future enhancements
👨‍💻 Author

Developed by Drup Patil
