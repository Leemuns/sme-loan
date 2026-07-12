from fastapi import APIRouter, FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routers import auth, users, loan_applications


app = FastAPI()


origins = [
    "https://sme-loan-1.onrender.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


router = APIRouter(prefix="/api")
app.include_router(router)


router.include_router(users.router)
router.include_router(loan_applications.router)
router.include_router(auth.router)