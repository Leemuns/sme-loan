from fastapi import APIRouter, FastAPI

from .routers import auth, users


app = FastAPI()

router = APIRouter(prefix="/api")
app.include_router(router)


router.include_router(users.router)
router.include_router(auth.router)