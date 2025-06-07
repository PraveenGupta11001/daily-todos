from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from dotenv import load_dotenv
import os
import logging
import json


# configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="My FastAPI App", description="A simple FastAPI application")

@app.get("/")
async def root():
    return {"message": "Welcome to My FastAPI App!"}

@app.get("/a")
async def health_check():
    return {"status": "healthy"}