# **Live Web Application: Recent Innovations in Generative AI**

This project is a **Single Page Application (SPA)** showcasing recent innovations in **Generative AI**. It uses **Angular** for the frontend, **Spring Boot** for the backend, and **MySQL** hosted on **Aiven** for the database. The app is deployed on **Render** using **Docker**.

---

## **Live URLs**
- **Live Webpage**: [https://genai-finalproject.onrender.com](https://genai-finalproject.onrender.com)  
- **Backend API**: [https://genai-springboot.onrender.com](https://genai-springboot.onrender.com)  

---

## **Features**
- **Login/Register**: Users can log in with hardcoded credentials (`nikshithareddy` for both username and password) or register new accounts.  
- **JWT Authentication**: Secure login using **JSON Web Tokens (JWT)**.  
- **Dashboard**: Displays a **200-word summary** of a Generative AI innovation with a reference URL.  
- **Dynamic Charts**: **Summary** and **Reports** pages include charts (e.g., using **D3.js**) with data fetched from the backend.  
- **Access Control**: Unauthorized access redirects to the login page.  
- **Accessibility**: Follows **ADA/WCAG principles** for accessibility.  

---

## **Tech Stack**
- **Frontend**: Angular, HTML, CSS, JavaScript, D3.js.  
- **Backend**: Spring Boot (Java), MySQL (Aiven).  
- **Authentication**: JWT.  
- **Hosting**: Docker, NGINX, Render.  

---

## **Setup Instructions**
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/nikshithareddyaella/GenAI-FinalProject.git
   cd GenAI-FinalProject
   ```

2. **Set Up Aiven MySQL**:
   - Create a MySQL instance on **Aiven** and note the connection details.

3. **Set Environment Variables**:
   - Create a `.env` file in the `backend` directory:
     ```
     DB_URL=jdbc:mysql://<Aiven-host>:<Aiven-port>/<database-name>
     DB_USERNAME=<Aiven-username>
     DB_PASSWORD=<Aiven-password>
     JWT_SECRET=your-jwt-secret-key
     ```

4. **Run with Docker**:
   ```bash
   docker-compose up --build
   ```

5. **Access the App**:
   - Open your browser and go to `http://localhost` (or the Render URL).

---

## **API Endpoints**
- **Login**: `POST /api/login`  
- **Register**: `POST /api/register`  
- **Dashboard Data**: `GET /api/dashboard`  
- **Chart Data**:  
  - Summary Chart: `GET /api/summary-chart`  
  - Reports Chart: `GET /api/reports-chart`  

---

## **GitHub Repository**
- **GitHub Link**: [https://github.com/nikshithareddyaella/GenAI-FinalProject.git](https://github.com/nikshithareddyaella/GenAI-FinalProject.git)  

---

