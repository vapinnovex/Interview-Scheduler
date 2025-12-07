from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime


class UserCreate(BaseModel):
    email: EmailStr
    password: str
    full_name: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class User(BaseModel):
    id: str = Field(alias="_id")
    email: str
    full_name: str
    role: str
    created_at: datetime

    class Config:
        populate_by_name = True


class UserResponse(BaseModel):
    id: str = Field(alias="_id")
    email: str
    full_name: str
    role: str

    class Config:
        populate_by_name = True


class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse
