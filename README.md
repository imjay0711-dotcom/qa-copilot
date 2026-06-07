# 🤖 QA Copilot — AI-Powered QA Assistant

## 🎯 Problem Statement
QA Engineers waste 60-70% of their time on manual tasks like writing test cases, bug reports, and test summaries.

## 💡 Solution
QA Copilot is an AI-powered assistant that automates:
- 📋 Test Case Generation from user stories
- 🐛 Bug Report Writing from descriptions
- 📊 Test Summary Reports for managers
- ⚠️ Risk Analysis for releases

## 🛠️ Tech Stack
| Layer | Technology |
|---|---|
| Frontend | React + Vite |
| Backend | Python FastAPI |
| AI | Groq API (LLaMA 3) |
| Cloud | Azure |
| Version Control | GitHub |

## 🚀 Setup Instructions

### Backend:
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload

### Frontend:
cd qa-frontend
npm install
npm run dev

## 🔑 Environment Variables
Create backend/.env file:
GROQ_API_KEY=your_groq_api_key_here

## 👤 Team
- Jayaraj Potala — QA Engineer and Developer

## 🏗️ Architecture
React Frontend → FastAPI Backend → Groq AI (LLaMA 3)

## 🎯 Features
1. Test Case Generator — Generate complete test cases from user stories
2. Bug Report Writer — Create professional bug reports instantly
3. Test Summary Generator — Manager-ready sprint reports
4. Risk Analyzer — AI-powered release risk assessment