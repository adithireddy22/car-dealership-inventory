# Car Dealership Inventory Management System

A full-stack web application for managing a car dealership's vehicle inventory. The system is designed to allow dealership staff to efficiently view, add, update, delete, search, and manage vehicle records through a responsive web interface.

## Project Status

🚧 **In Development**

The initial project structure and frontend setup are complete. Backend, database integration, API development, testing, and the remaining UI features will be implemented incrementally.

---

## Features

The planned application will include:

- View all cars in the dealership inventory
- Add new vehicles
- View detailed vehicle information
- Update vehicle information
- Delete vehicles from inventory
- Search and filter vehicles
- Responsive user interface
- Form validation
- RESTful API
- PostgreSQL database integration
- Error handling
- Automated testing

---

## Tech Stack

### Frontend

- React.js
- Vite
- Tailwind CSS
- HTML5
- CSS3
- JavaScript

### Backend

- Python
- FastAPI

### Database

- PostgreSQL

### Development Tools

- Git
- GitHub
- VS Code

---

## Project Structure

```text
car-dealership-inventory/
│
├── client-side/
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   └── .gitignore
│
├── server-side/
│   ├── app/
│   ├── .venv/
│   └── ...
│
├── .gitignore
├── README.md
└── PROMPTS.md
```

> `.venv/`, `node_modules/`, `.env`, and other sensitive or local files are excluded from version control using `.gitignore`.

---

# Local Setup and Installation

Follow the steps below to set up and run the Car Dealership Inventory Management System locally.

## Prerequisites

Make sure the following software is installed on your system before setting up the project:

- Git
- Node.js
- npm
- Python 3.x
- PostgreSQL
- VS Code or another code editor

You can verify the installations using:

```bash
git --version
node --version
npm --version
python --version
psql --version
```

---

## 1. Clone the Repository

Open a terminal and clone the repository:

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
```

Navigate into the project directory:

```bash
cd car-dealership-inventory
```

The project contains separate directories for the frontend and backend:

```text
car-dealership-inventory/
├── client-side/
└── server-side/
```

---

# Backend Setup

The backend is developed using **Python and FastAPI**.

## 2. Navigate to the Backend

From the project root directory, run:

```bash
cd server-side
```

---

## 3. Create a Python Virtual Environment

Create a virtual environment using:

```bash
python -m venv .venv
```

The virtual environment will be created inside the `server-side` directory.

---

## 4. Activate the Virtual Environment

### Windows Command Prompt

```bash
.venv\Scripts\activate
```

### Windows PowerShell

```powershell
.venv\Scripts\Activate.ps1
```

After successful activation, the terminal should display:

```text
(.venv)
```

---

## 5. Install Backend Dependencies

Install the required Python packages:

```bash
pip install -r requirements.txt
```

If a `requirements.txt` file has not been created yet, install the required dependencies and generate the file using:

```bash
pip freeze > requirements.txt
```

---

## 6. Configure Backend Environment Variables

Create a `.env` file inside the `server-side` directory.

Example:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/car_dealership
```

Replace the values with your local PostgreSQL credentials.

> **Important:** Never commit the `.env` file to Git. Make sure `.env` is included in `.gitignore`.

For other developers, an `.env.example` file can be provided:

```env
DATABASE_URL=
```

The `.env.example` file can safely be committed because it does not contain actual credentials.

---

## 7. Set Up PostgreSQL

Make sure PostgreSQL is installed and running.

Create a database for the project:

```sql
CREATE DATABASE car_dealership;
```

Configure the database connection in the backend `.env` file:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/car_dealership
```

The username, password, host, port, and database name should match your local PostgreSQL configuration.

---

## 8. Start the Backend Server

Make sure you are inside the `server-side` directory and that the virtual environment is activated.

Run:

```bash
uvicorn app.main:app --reload
```

The backend server will start at:

```text
http://127.0.0.1:8000
```

FastAPI provides interactive API documentation at:

```text
http://127.0.0.1:8000/docs
```

Open the `/docs` URL in your browser to access Swagger UI.

---

# Frontend Setup

The frontend is developed using **React, Vite, Tailwind CSS, HTML5, CSS3, and JavaScript**.

## 9. Open a New Terminal

Keep the backend server running.

Open a second terminal window or terminal tab.

Navigate to the project root:

```bash
cd car-dealership-inventory
```

Then navigate to the frontend:

```bash
cd client-side
```

---

## 10. Install Frontend Dependencies

Install all dependencies listed in `package.json`:

```bash
npm install
```

This will install the required frontend dependencies and create the `node_modules` directory.

The `package-lock.json` file will be used to maintain consistent dependency versions.

---

## 11. Start the Frontend Development Server

Run:

```bash
npm run dev
```

Vite will display the local development URL in the terminal.

The frontend will usually be available at:

```text
http://localhost:5173
```

Open the displayed URL in your browser.

---

# Running the Complete Application

Both the frontend and backend should run simultaneously during development.

## Terminal 1 - Backend

Open the first terminal:

```bash
cd car-dealership-inventory/server-side
```

Activate the virtual environment:

```bash
.venv\Scripts\activate
```

Start the FastAPI server:

```bash
uvicorn app.main:app --reload
```

Backend:

```text
http://127.0.0.1:8000
```

API documentation:

```text
http://127.0.0.1:8000/docs
```

---

## Terminal 2 - Frontend

Open a second terminal:

```bash
cd car-dealership-inventory/client-side
```

Start the React development server:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

# Frontend and Backend Communication

The React frontend communicates with the FastAPI backend through REST APIs.

During development:

```text
Frontend
http://localhost:5173
        |
        | HTTP Requests
        v
Backend
http://127.0.0.1:8000
        |
        v
PostgreSQL
```

Once API integration is implemented, the frontend will use the backend endpoints to perform inventory operations.

---

# API Documentation

FastAPI automatically provides interactive API documentation.

Open:

```text
http://127.0.0.1:8000/docs
```

The planned inventory endpoints include:

| Method | Endpoint | Description |
|---|---|---|
| GET | `/cars` | Get all cars |
| GET | `/cars/{id}` | Get a specific car |
| POST | `/cars` | Add a new car |
| PUT | `/cars/{id}` | Update an existing car |
| DELETE | `/cars/{id}` | Delete a car |

---

# Environment Variables

Sensitive configuration values must be stored in `.env` files.

Example:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/car_dealership
```

The following file should **not** be committed:

```text
.env
```

The repository may contain:

```text
.env.example
```

Example:

```env
DATABASE_URL=
```

This allows developers to understand which environment variables are required without exposing credentials.

---

# Git and Ignored Files

The project uses `.gitignore` to prevent local and sensitive files from being committed.

The following should generally be ignored:

```text
node_modules/
.venv/
.env
__pycache__/
*.pyc
```

The following files should generally be committed:

```text
package.json
package-lock.json
requirements.txt
.gitignore
README.md
PROMPTS.md
source code
configuration files
```

> `package-lock.json` should be committed because it locks the frontend dependency versions and allows consistent installations across environments.

---

# Verify the Installation

After starting both servers, verify the following:

### Frontend

Open:

```text
http://localhost:5173
```

The React application should load successfully.

### Backend

Open:

```text
http://127.0.0.1:8000
```

The FastAPI application should respond.

### API Documentation

Open:

```text
http://127.0.0.1:8000/docs
```

Swagger UI should load successfully.

### Database

Verify that:

- PostgreSQL is running.
- The `car_dealership` database exists.
- The database credentials are correct.
- The `DATABASE_URL` is correctly configured.
- The backend can connect to PostgreSQL.

---

# Troubleshooting

## Python Virtual Environment Not Activating

For Windows Command Prompt:

```bash
.venv\Scripts\activate
```

For PowerShell:

```powershell
.venv\Scripts\Activate.ps1
```

---

## Backend Dependencies Are Missing

Make sure the virtual environment is activated:

```bash
.venv\Scripts\activate
```

Then run:

```bash
pip install -r requirements.txt
```

---

## Backend Server Is Not Starting

Verify that you are inside the `server-side` directory:

```bash
cd server-side
```

Activate the virtual environment:

```bash
.venv\Scripts\activate
```

Then run:

```bash
uvicorn app.main:app --reload
```

---

## Frontend Dependencies Are Missing

Navigate to the frontend directory:

```bash
cd client-side
```

Install dependencies:

```bash
npm install
```

Then start the development server:

```bash
npm run dev
```

---

## Node.js or npm Is Not Recognized

Verify the installation:

```bash
node --version
npm --version
```

If either command is not recognized, install Node.js and restart the terminal.

---

## PostgreSQL Connection Error

Check the following:

- PostgreSQL is running.
- The database exists.
- The PostgreSQL username is correct.
- The PostgreSQL password is correct.
- The database name is correct.
- The `DATABASE_URL` is correctly configured.
- The `.env` file is located inside `server-side`.

Example:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/car_dealership
```

---

# Stopping the Development Servers

To stop the frontend or backend development server, press:

```text
Ctrl + C
```

in the corresponding terminal.

---

# Quick Start

After the initial setup is completed, the application can be started using two terminals.

### Terminal 1 - Backend

```bash
cd car-dealership-inventory/server-side
.venv\Scripts\activate
uvicorn app.main:app --reload
```

### Terminal 2 - Frontend

```bash
cd car-dealership-inventory/client-side
npm run dev
```

Then open:

```text
Frontend: http://localhost:5173
Backend: http://127.0.0.1:8000
API Docs: http://127.0.0.1:8000/docs
```

---

## Screenshots

Screenshots of the final application will be added here.

### Dashboard

_Add screenshot here after the application UI is completed._

### Inventory

_Add screenshot here after the inventory interface is completed._

### Add Vehicle

_Add screenshot here after the vehicle form is completed._

---

## Testing

Automated tests will be added for the backend APIs and frontend functionality.

The final test report will include:

- Number of tests executed
- Number of tests passed
- Number of tests failed
- Test coverage
- Important test cases

A detailed test report will be added after the test suite is implemented.

---

## My AI Usage


The AI assistance from chatgpt included:

- Project setup guidance and initialization
- Postgre and fastapi - postgre connection setup

---

## License

This project was developed as part of an assessment/project submission.