import os
import json
import urllib.parse

HUB_DIR = r"g:\Mi unidad\000.0001-CCT\Data Exploration & Preparation [DIPDAB-Sep26 cohort]\dep-study-hub"
CATALOG_PATH = os.path.join(HUB_DIR, "course_files.json")

with open(CATALOG_PATH, "r", encoding="utf-8") as f:
    course_files = json.load(f)

# Group files
files_by_section = {
    "Week 1": [],
    "Week 2": [],
    "Week 3": [],
    "Week 4": [],
    "Week 5": [],
    "Assessments": []
}

for cf in course_files:
    raw_rel = cf["rel"].replace("\\", "/")
    cf["url"] = "docs/" + "/".join(urllib.parse.quote(part) for part in raw_rel.split("/"))
    sec = cf.get("week_tag", "General")
    if sec in files_by_section:
        files_by_section[sec].append(cf)

def render_file_card(cf):
    is_pdf = cf["ext"] == ".pdf"
    icon = "📄"
    if cf["ext"] == ".ipynb": icon = "📓"
    elif cf["ext"] in [".csv", ".txt"]: icon = "📊"
    elif cf["ext"] in [".ppt", ".pptx"]: icon = "📽️"
    elif cf["ext"] in [".doc", ".docx"]: icon = "📝"
    elif cf["ext"] == ".zip": icon = "📦"

    badge_color = "var(--accent-blue)"
    if "Dataset" in cf["tag"]: badge_color = "var(--accent-emerald)"
    elif "Notebook" in cf["tag"]: badge_color = "var(--accent-purple)"
    elif "PowerPoint" in cf["tag"]: badge_color = "var(--accent-amber)"
    elif "Assessment" in cf["week_tag"]: badge_color = "var(--accent-rose)"

    safe_name = cf["name"].replace("'", "\\'")
    safe_url = cf["url"].replace("'", "\\'")

    actions = []
    if is_pdf:
        actions.append(f'''<button class="btn btn-primary" style="font-size:0.75rem; padding:5px 12px;" onclick="openPdfViewer('{safe_url}', '{safe_name}')">
          <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
          Read PDF
        </button>''')
    
    actions.append(f'''<a class="btn btn-secondary" style="font-size:0.75rem; padding:5px 12px; text-decoration:none;" href="{cf['url']}" download="{cf['name']}">
      <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
      Download
    </a>''')

    actions_html = " ".join(actions)

    return f'''
    <div class="card file-card-item" data-week="{cf['week_tag']}" data-ext="{cf['ext']}" style="display:flex; flex-direction:column; justify-content:space-between; padding:18px;">
      <div>
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:10px;">
          <span style="font-size:1.5rem;">{icon}</span>
          <span class="badge" style="background:rgba(255,255,255,0.06); color:{badge_color}; border:1px solid {badge_color}; font-size:0.7rem;">{cf['tag']}</span>
        </div>
        <h4 style="font-size:0.92rem; font-weight:700; color:var(--text-main); margin-bottom:6px; line-height:1.35; word-break:break-word;">{cf['name']}</h4>
        <div style="font-size:0.75rem; color:var(--text-dim); margin-bottom:14px;">{cf['week_tag']} • {cf['size_kb']} KB</div>
      </div>
      <div style="display:flex; gap:8px; flex-wrap:wrap;">
        {actions_html}
      </div>
    </div>
    '''

all_file_cards_html = "\n".join(render_file_card(cf) for cf in course_files)

def render_week_docs_list(week_name):
    items = files_by_section.get(week_name, [])
    if not items:
        return "<p style='font-size:0.82rem; color:var(--text-dim);'>No local files in this week archive.</p>"
    
    html = ['<div style="display:flex; flex-direction:column; gap:8px; margin-top:10px;">']
    for cf in items:
        is_pdf = cf["ext"] == ".pdf"
        safe_name = cf["name"].replace("'", "\\'")
        safe_url = cf["url"].replace("'", "\\'")
        btn_view = f'''<button class="btn btn-primary" style="font-size:0.72rem; padding:4px 10px;" onclick="openPdfViewer('{safe_url}', '{safe_name}')">Read PDF</button>''' if is_pdf else ""
        btn_dl = f'''<a class="btn btn-secondary" style="font-size:0.72rem; padding:4px 10px; text-decoration:none;" href="{cf['url']}" download="{cf['name']}">Download ({cf['size_kb']} KB)</a>'''
        
        html.append(f'''
        <div style="display:flex; align-items:center; justify-content:space-between; padding:8px 12px; background:var(--bg-surface); border-radius:var(--radius-md); border:1px solid var(--border-subtle); flex-wrap:wrap; gap:8px;">
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="font-size:1rem;">{'📄' if is_pdf else '📦'}</span>
            <span style="font-size:0.85rem; font-weight:600; color:var(--text-main);">{cf['name']}</span>
          </div>
          <div style="display:flex; gap:6px;">
            {btn_view}
            {btn_dl}
          </div>
        </div>
        ''')
    html.append('</div>')
    return "\n".join(html)

# Read course_data to get weeks
with open(os.path.join(HUB_DIR, "js", "data.js"), "r", encoding="utf-8") as f:
    data_js_raw = f.read()

# We construct the entire HTML string
html_template = f'''<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Data Exploration & Preparation | CCT Study Hub</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
  <style>
    /* Embedded PDF Modal */
    .pdf-modal-overlay {{
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.85);
      backdrop-filter: blur(8px);
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }}
    .pdf-modal-overlay.open {{
      display: flex;
    }}
    .pdf-modal-container {{
      width: 94%;
      height: 92vh;
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
    }}
    .pdf-modal-header {{
      padding: 14px 20px;
      background: var(--bg-sidebar);
      border-bottom: 1px solid var(--border-subtle);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }}
    .pdf-modal-header h3 {{
      font-size: 1rem;
      font-weight: 700;
      color: var(--text-main);
      display: flex;
      align-items: center;
      gap: 10px;
    }}
    .pdf-frame {{
      flex: 1;
      width: 100%;
      height: 100%;
      border: none;
      background: #525659;
    }}
  </style>
</head>
<body>

  <!-- Left Sidebar Navigation -->
  <aside class="sidebar" id="sidebar">
    <div class="sidebar-header">
      <div class="brand-badge">
        <span style="display:inline-block; width:6px; height:6px; background:var(--accent-cyan); border-radius:50%;"></span>
        CCT College Dublin
      </div>
      <div class="brand-title">Data Exploration & Preparation</div>
      <div class="brand-sub">Level 7 Diploma • Sep 26 Cohort</div>
    </div>

    <nav class="nav-menu">
      <div class="nav-section-label">Core Dashboard</div>
      <a class="nav-item active" href="#overview" data-view="overview">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
        Overview & Roadmap
      </a>
      <a class="nav-item" href="#ca1" data-view="ca1">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        CA1 Assessment (40%)
        <span class="nav-badge" style="background: rgba(245, 158, 11, 0.2); color: var(--accent-amber); border-color: rgba(245, 158, 11, 0.4);">Nov 1</span>
      </a>

      <div class="nav-section-label">Course Materials</div>
      <a class="nav-item" href="#weeks" data-view="weeks">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
        Weekly Modules
        <span class="nav-badge">13 Wks</span>
      </a>
      <a class="nav-item" href="#documents" data-view="documents">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"></path></svg>
        PDF & Files Library
        <span class="nav-badge" style="background:rgba(59,130,246,0.2); color:var(--accent-blue);">46 Files</span>
      </a>
      <a class="nav-item" href="#transcripts" data-view="transcripts">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
        Video Transcripts & Notes
      </a>
      <a class="nav-item" href="#glossary" data-view="glossary">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
        Knowledge & Glossary
      </a>
    </nav>

    <div class="sidebar-footer">
      <div class="ca1-mini-card">
        <div class="ca1-mini-header">
          <span class="ca1-mini-title">CA1 DEADLINE</span>
          <span style="font-size: 0.7rem; color: var(--text-dim);">Nov 1</span>
        </div>
        <div class="ca1-mini-countdown" id="ca1-mini-timer">Calculating...</div>
      </div>
    </div>
  </aside>

  <!-- Main Content Wrapper -->
  <div class="main-wrapper">
    <!-- Topbar -->
    <header class="topbar">
      <div style="display: flex; align-items: center; gap: 12px;">
        <button class="btn btn-icon mobile-menu-btn" id="mobile-toggle" onclick="toggleSidebar()" title="Toggle Menu" style="display: none;">
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>
        <div class="search-box">
          <svg width="18" height="18" fill="none" stroke="var(--text-dim)" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          <input type="text" id="global-search" placeholder="Search concepts, weeks, tasks, code, PDFs...">
        </div>
      </div>

      <div class="topbar-actions">
        <a class="btn btn-primary" href="#documents">
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"></path></svg>
          Browse All 46 Files
        </a>
        <button class="btn btn-icon" id="theme-toggle-btn" onclick="toggleTheme()" title="Toggle Theme"></button>
      </div>
    </header>

    <!-- Page Content Viewports -->
    <main class="content-area">
      <!-- 1. Overview Section -->
      <section id="view-overview" class="view-section active">
        <div class="section-header">
          <div class="section-tag">Executive Dashboard</div>
          <h2 class="section-title">Course Roadmap & Study Command Center</h2>
          <p class="section-desc">
            A unified learning hub containing synthesis of all weekly class materials, laboratory notebooks, syllabus milestones, and continuous assessment deliverables.
          </p>
        </div>
        <div id="overview-container"></div>
      </section>

      <!-- 2. Weekly Modules Section -->
      <section id="view-weeks" class="view-section">
        <div class="section-header">
          <div class="section-tag">Academic Modules</div>
          <h2 class="section-title">Weekly Lectures, Labs & Video Slots</h2>
          <p class="section-desc">
            Each week features 2 class video sessions hosted on Google Drive, along with structured theoretical takeaways and practical Python implementations.
          </p>
        </div>
        <div id="weeks-container"></div>
      </section>

      <!-- 3. Course Files & PDF Library -->
      <section id="view-documents" class="view-section">
        <div class="section-header">
          <div class="section-tag">Course Documents & Data Repository</div>
          <h2 class="section-title">PDF & Files Library (All 46 Uploaded Materials)</h2>
          <p class="section-desc">
            Directly view or download any lecture slides, practice datasets, Jupyter notebooks, poster templates, and assessment briefs.
          </p>
        </div>

        <!-- Filter tabs for documents -->
        <div style="display:flex; gap:8px; margin-bottom:20px; flex-wrap:wrap;">
          <button class="btn btn-primary file-filter-btn" onclick="filterDocs('all')">All Files (46)</button>
          <button class="btn btn-secondary file-filter-btn" onclick="filterDocs('Week 1')">Week 1 (9)</button>
          <button class="btn btn-secondary file-filter-btn" onclick="filterDocs('Week 2')">Week 2 (5)</button>
          <button class="btn btn-secondary file-filter-btn" onclick="filterDocs('Week 3')">Week 3 (8)</button>
          <button class="btn btn-secondary file-filter-btn" onclick="filterDocs('Week 4')">Week 4 (11)</button>
          <button class="btn btn-secondary file-filter-btn" onclick="filterDocs('Week 5')">Week 5 (9)</button>
          <button class="btn btn-secondary file-filter-btn" onclick="filterDocs('Assessments')">Assessments (4)</button>
          <button class="btn btn-secondary file-filter-btn" onclick="filterDocs('ext-.pdf')">PDFs Only</button>
          <button class="btn btn-secondary file-filter-btn" onclick="filterDocs('ext-.csv')">Datasets (.csv/.txt)</button>
          <button class="btn btn-secondary file-filter-btn" onclick="filterDocs('ext-.ipynb')">Jupyter Notebooks</button>
        </div>

        <!-- Grid of all file cards -->
        <div class="grid-3" id="files-grid">
          {all_file_cards_html}
        </div>
      </section>

      <!-- 4. CA1 Assessment Hub -->
      <section id="view-ca1" class="view-section">
        <div class="section-header">
          <div class="section-tag">Assessment 1 Hub</div>
          <h2 class="section-title">Continuous Assessment 1 (CA1 — 40%)</h2>
          <p class="section-desc">
            Submission Deadline: 1st November 2026 at 23:59 IST. Dataset: Smart_Home_Energy.csv. Complete rubric, 20-step checklist, poster guidelines, and Python recipes.
          </p>
        </div>
        <div id="ca1-container"></div>
      </section>

      <!-- 5. Video Transcripts & Notes Hub -->
      <section id="view-transcripts" class="view-section">
        <div class="section-header">
          <div class="section-tag">NotebookLM & Video Knowledge</div>
          <h2 class="section-title">Class Video Transcripts & Synced Notes</h2>
          <p class="section-desc">
            Paste transcriptions or generated summaries from Gemini NotebookLM or your class notes to enrich each week's knowledge repository.
          </p>
        </div>
        <div id="transcripts-container"></div>
      </section>

      <!-- 6. Glossary Section -->
      <section id="view-glossary" class="view-section">
        <div class="section-header">
          <div class="section-tag">Reference Guide</div>
          <h2 class="section-title">Key Terminology & Methodological Frameworks</h2>
          <p class="section-desc">
            Core concepts spanning CRISP-DM, SEMMA, data types, statistical properties, imputation methodologies, GDPR, and the EU AI Act.
          </p>
        </div>
        <div id="glossary-container"></div>
      </section>
    </main>
  </div>

  <!-- Interactive PDF Reader Modal -->
  <div class="pdf-modal-overlay" id="pdf-modal" onclick="if(event.target===this) closePdfViewer()">
    <div class="pdf-modal-container">
      <div class="pdf-modal-header">
        <h3 id="pdf-modal-title">
          <svg width="18" height="18" fill="none" stroke="var(--accent-blue)" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
          Document Viewer
        </h3>
        <div style="display:flex; align-items:center; gap:10px;">
          <a class="btn btn-secondary" id="pdf-modal-open-tab" href="#" target="_blank" style="font-size:0.78rem; padding:4px 10px; text-decoration:none;">Open in Full Window</a>
          <a class="btn btn-primary" id="pdf-modal-download" href="#" download="" style="font-size:0.78rem; padding:4px 10px; text-decoration:none;">Download File</a>
          <button class="btn btn-icon" onclick="closePdfViewer()" style="border:none; background:transparent; font-size:1.1rem;">✕</button>
        </div>
      </div>
      <iframe class="pdf-frame" id="pdf-frame" src=""></iframe>
    </div>
  </div>

  <!-- Modal for Adding / Editing Notes & Transcripts -->
  <div class="modal-overlay" id="transcript-modal" onclick="if(event.target===this) closeTranscriptModal()">
    <div class="modal-card">
      <div class="modal-header">
        <h3 class="modal-title">Attach Notes or Transcripts</h3>
        <button class="btn btn-icon" onclick="closeTranscriptModal()" style="border:none; background:transparent;">✕</button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label for="modal-week-select">Assign to Course Week</label>
          <select id="modal-week-select">
            <option value="week-1">Week 1: Course Introduction & Python Primer</option>
            <option value="week-2">Week 2: Data Fundamentals & Version Control</option>
            <option value="week-3">Week 3: Data Lifecycle, Data Dictionaries & Ethics</option>
            <option value="week-4">Week 4: Deep Dive into EDA & CRISP-DM</option>
            <option value="week-5" selected>Week 5: Systematic Data Cleaning & Poster Strategy</option>
            <option value="week-6">Week 6: Feature Selection & Duplicates</option>
            <option value="week-7">Week 7: Reading Week & CA1 Submission</option>
            <option value="week-8">Week 8: Feature Engineering (Discretization)</option>
            <option value="week-9">Week 9: Feature Engineering (Encoding)</option>
            <option value="week-10">Week 10: Feature Engineering (Scaling)</option>
            <option value="week-11">Week 11: Dimensionality Reduction (PCA/LDA)</option>
            <option value="week-12">Week 12: Feature Creation & Interactions</option>
            <option value="week-13">Week 13: Semester Review & CA2 Briefing</option>
          </select>
        </div>
        <div class="form-group">
          <label for="modal-title-input">Note / Session Title</label>
          <input type="text" id="modal-title-input" placeholder="e.g., Session 1 Gemini Transcript / Outliers Discussion">
        </div>
        <div class="form-group">
          <label for="modal-text-input">Transcript or Summary Content</label>
          <textarea id="modal-text-input" rows="8" placeholder="Paste your transcript from Gemini NotebookLM or class notes here..."></textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" onclick="closeTranscriptModal()">Cancel</button>
        <button class="btn btn-primary" onclick="saveModalTranscript()">Save & Sync to Hub</button>
      </div>
    </div>
  </div>

  <script src="js/data.js"></script>
  <script src="js/app.js"></script>
  <script>
    // PDF Viewer Modal functions
    function openPdfViewer(url, title) {{
      const modal = document.getElementById('pdf-modal');
      const frame = document.getElementById('pdf-frame');
      const titleEl = document.getElementById('pdf-modal-title');
      const openTabEl = document.getElementById('pdf-modal-open-tab');
      const dlEl = document.getElementById('pdf-modal-download');

      if (!modal || !frame) return;
      frame.src = url;
      titleEl.innerHTML = `<span>📄</span> ${{title}}`;
      openTabEl.href = url;
      dlEl.href = url;
      dlEl.download = title;
      modal.classList.add('open');
    }}

    function closePdfViewer() {{
      const modal = document.getElementById('pdf-modal');
      const frame = document.getElementById('pdf-frame');
      if (modal) modal.classList.remove('open');
      if (frame) frame.src = '';
    }}

    // Filter documents library
    function filterDocs(cat) {{
      document.querySelectorAll('.file-filter-btn').forEach(btn => btn.className = 'btn btn-secondary file-filter-btn');
      event.target.className = 'btn btn-primary file-filter-btn';

      document.querySelectorAll('.file-card-item').forEach(card => {{
        if (cat === 'all') {{
          card.style.display = 'flex';
        }} else if (cat.startsWith('ext-')) {{
          const ext = cat.replace('ext-', '');
          if (ext === '.csv') {{
            card.style.display = (card.getAttribute('data-ext') === '.csv' || card.getAttribute('data-ext') === '.txt') ? 'flex' : 'none';
          }} else {{
            card.style.display = card.getAttribute('data-ext') === ext ? 'flex' : 'none';
          }}
        }} else {{
          card.style.display = card.getAttribute('data-week') === cat ? 'flex' : 'none';
        }}
      }});
    }}

    window.openPdfViewer = openPdfViewer;
    window.closePdfViewer = closePdfViewer;
    window.filterDocs = filterDocs;
  </script>
</body>
</html>
'''

# Write generated index.html
with open(os.path.join(HUB_DIR, "index.html"), "w", encoding="utf-8") as f:
    f.write(html_template)

print("Generated index.html with all 46 files and PDF modal viewer successfully!")
