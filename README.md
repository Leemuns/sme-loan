# SME Loan Application Collection System
A full-stack web application that allows users to submit loan applications via a multi-step form, manage their accounts, and track their loan aplication history.

## Features
- **Multi-step Application Form** - Intuitive, step-by-step flow for collecting user loan details.
- **User Authentication** - Secure sign-up and login functionality.
- **Loan History** - View a complete timeline of all past and current loan applications.
- **Document Management** - Download and view submitted loan applications for record-keeping.

## Installation & Usage
### Prerequisites
- Node.js 18+
- Python v3.9+
- npm / pip

### Frontend (Next.js)
From repo root, run the following commands:
```bash
cd frontend
npm install
npm build
npm run
```
### Backend (FastAPI)
From repo root, run the following commands:
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

**Note**: Include an `.env` file in the root of "/backend" like so
```ini
# /backend/.env
DATABASE_URL={postgresql://username:password@host:port/database_name}
SECRET_KEY={your_super_secret_random_string_here}
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### Online demo
Alternatively, you can access the [live frontend application](https://sme-loan-1.onrender.com/) here online. Just make sure to wake the [backend api](https://sme-loan-wbbk.onrender.com/) 1 minute prior first.
