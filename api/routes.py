from fastapi import APIRouter

router = APIRouter()

class RootHandler:
    def __call__(self):
        return {"message": "Box Detection Service"}

root_handler = RootHandler()

@router.get("/")
def read_root():
    return root_handler()