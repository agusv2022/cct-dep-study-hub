# Data Exploration & Preparation — Academic Study Hub & CA1 Command Center

**Institution:** CCT College Dublin  
**Programme:** Diploma in Data Analytics for Business (Level 7) — DIPDAB-Sep26 Stage 1 Sem 1  
**Module:** Data Exploration & Preparation (DEP)  
**Lecturer:** Dr. Muhammad Iqbal (`miqbal@cct.ie`)  
**Continuous Assessment 1 (CA1):** 40% weighting — Due 1st November 2026 at 23:59 IST  

---

## 🌟 Overview

This web platform is an interactive, unified study command center and knowledge hub designed to accelerate learning, synthesize weekly lecture slides and lab notebooks, and provide a checklist and code toolkit for the Continuous Assessment 1 (CA1).

### Key Features:
- **Executive Roadmap:** Full 13-week semester schedule with weekly status badges, calendar dates, and syllabus mapping.
- **Weekly Module Breakdowns:** Detailed executive summaries of theoretical topics, practical implementation highlights (Python, pandas, seaborn), and material references for Weeks 1 to 13.
- **Class Video Sessions & Gemini NotebookLM Sync:** Slots for both weekly class lecture recordings (Thursdays 17:45 & 20:00 on College Google Drive) with an interactive modal to attach transcripts and summaries from Gemini NotebookLM.
- **CA1 Assessment Center:** Live countdown to the November 1st deadline, interactive 20-step progress checklist (persisted locally), sample poster breakdown (500–600 words strictly, Harvard citations), and drop-in Python code recipes for `Smart_Home_Energy.csv`.
- **Knowledge Base & Glossary:** Rapid search and definitions across statistical properties, CRISP-DM, SEMMA, data types, imputation techniques, GDPR, and the EU AI Act.
- **Modern UI:** Responsive app design, custom typography, code copy-to-clipboard, and dark/light theme toggle.

---

## 🚀 How to Run Locally

Because this hub is built with clean, zero-dependency static web standards (HTML5, modern CSS, ES6 JavaScript):

1. **Option 1: Direct File Open**  
   Simply double-click `index.html` or open it with your favorite browser (Chrome, Edge, Firefox, Safari).

2. **Option 2: Local Python Server**  
   Open PowerShell or Terminal in this folder and run:
   ```bash
   python -m http.server 8000
   ```
   Then visit [http://localhost:8000](http://localhost:8000).

---

## 🌐 Deployment to GitHub Pages & Cloudflare Pages

### Option A: GitHub Pages
1. Create a new repository on your GitHub account (e.g., `dep-study-hub`).
2. Run in this directory:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Data Exploration & Preparation Study Hub"
   git branch -M main
   git remote add origin https://github.com/<YOUR-USERNAME>/dep-study-hub.git
   git push -u origin main
   ```
3. Go to **Settings > Pages** in your GitHub repository.
4. Set **Source** to `Deploy from a branch`, select `main` branch and `/ (root)`.
5. Your hub is immediately live at `https://<YOUR-USERNAME>.github.io/dep-study-hub/`.

### Option B: Cloudflare Pages
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/) > **Workers & Pages** > **Create application** > **Pages**.
2. **Connect to Git** (select your `dep-study-hub` repository) OR choose **Direct Upload** (drag & drop this entire folder).
3. Leave build command and output directory empty.
4. Click **Deploy**. Your site will be deployed instantly on Cloudflare's global edge network at `https://<project-name>.pages.dev`.

---

## 📂 Project Structure

```
dep-study-hub/
├── index.html        # Single Page Application core shell & navigation
├── css/
│   └── style.css     # Responsive theme, card grids, code styling, modals
├── js/
│   ├── data.js       # Structured 13-week course syllabus, CA1 rubric & code recipes
│   └── app.js        # Dynamic views, search filter, countdown, checklist persistence
├── .gitignore        # Clean version control exclusions
└── README.md         # Deployment & documentation guide
```
