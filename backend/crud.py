from sqlalchemy.orm import Session
from models import User, Todo
from schemas import UserCreate, TodoCreate, TodoUpdate
from auth import get_password_hash

def create_user(db: Session, user: UserCreate):
    hashed_password = get_password_hash(user.password)
    db_user = User(email=user.email, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def create_todo(db: Session, todo: TodoCreate, user_id: int):
    db_todo = Todo(**todo.dict(), owner_id=user_id)
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)
    return db_todo

def get_todos(db: Session, user_id: int):
    return db.query(Todo).filter(Todo.owner_id == user_id).all()

def get_todo(db: Session, todo_id: int, user_id: int):
    return db.query(Todo).filter(Todo.id == todo_id, Todo.owner_id == user_id).first()

def update_todo(db: Session, todo_id: int, todo: TodoUpdate, user_id: int):
    db_todo = get_todo(db, todo_id, user_id)
    if db_todo:
        for key, value in todo.dict(exclude_unset=True).items():
            setattr(db_todo, key, value)
        db.commit()
        db.refresh(db_todo)
    return db_todo

def delete_todo(db: Session, todo_id: int, user_id: int):
    db_todo = get_todo(db, todo_id, user_id)
    if db_todo:
        db.delete(db_todo)
        db.commit()
    return db_todo