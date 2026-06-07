from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import testcase, bugreport, summary, risk

app = FastAPI(title="QA Copilot API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(testcase.router, prefix="/api", tags=["Test Cases"])
app.include_router(bugreport.router, prefix="/api", tags=["Bug Reports"])
app.include_router(summary.router, prefix="/api", tags=["Summary"])
app.include_router(risk.router, prefix="/api", tags=["Risk"])

@app.get("/")
def root():
    return {"message": "QA Copilot API is running 🚀"}