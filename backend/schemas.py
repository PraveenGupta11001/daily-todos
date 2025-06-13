from pydantic import BaseModel
from datetime import datetime

# User Schemas
class UserBase(BaseModel):
    email: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int

    class Config:
        from_attributes = True

# Todo Schemas
class TodoBase(BaseModel):
    title: str
    description: str | None = None
    completed: bool = False

class TodoCreate(TodoBase):
    pass

class TodoUpdate(TodoBase):
    pass

class Todo(TodoBase):
    id: int
    created_at: datetime
    owner_id: int

    class Config:
        from_attributes = True