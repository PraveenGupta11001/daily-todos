from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from database import Base, engine, get_db
from schemas import UserCreate, User, TodoCreate, Todo, TodoUpdate
from auth import verify_password, create_access_token, get_current_user
from crud import create_user, get_user_by_email, create_todo, get_todos, get_todo, update_todo, delete_todo
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

# Updated CORS for HTTPS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://192.168.29.102:5173",
        "https://daily-todos-alpha.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Create database tables
Base.metadata.create_all(bind=engine)

# Signup endpoint
@app.post("/signup", response_model=User)
def signup(user: UserCreate, db: Session = Depends(get_db)):
    db_user = get_user_by_email(db, user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return create_user(db, user)

# Login endpoint
@app.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = get_user_by_email(db, form_data.username)
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    access_token = create_access_token(data={"sub": str(user.id)})
    return {"access_token": access_token, "token_type": "bearer"}

# CRUD Endpoints for Todos
@app.post("/todos", response_model=Todo)
def create_todo_endpoint(todo: TodoCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return create_todo(db, todo, current_user.id)

@app.get("/todos", response_model=list[Todo])
def read_todos(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return get_todos(db, current_user.id)

@app.get("/todos/{todo_id}", response_model=Todo)
def read_todo(todo_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    todo = get_todo(db, todo_id, current_user.id)
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    return todo

@app.put("/todos/{todo_id}", response_model=Todo)
def update_todo_endpoint(todo_id: int, todo: TodoUpdate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    updated_todo = update_todo(db, todo_id, todo, current_user.id)
    if not updated_todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    return updated_todo

@app.delete("/todos/{todo_id}")
def delete_todo_endpoint(todo_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    deleted_todo = delete_todo(db, todo_id, current_user.id)
    if not deleted_todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    return {"message": "Todo deleted successfully"}