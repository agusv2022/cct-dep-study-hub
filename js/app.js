/**
 * Data Exploration & Preparation (DEP) - Main Web Application Logic
 * Interactive Dashboard, Weekly Modules, CA1 Checklist, and Transcripts Hub
 */

// --- Safe Storage Wrapper ---
const safeStorage = {
  get(key, fallback) {
    try {
      const val = localStorage.getItem(key);
      return val ? JSON.parse(val) : fallback;
    } catch (e) {
      return fallback;
    }
  },
  getString(key, fallback) {
    try {
      return localStorage.getItem(key) || fallback;
    } catch (e) {
      return fallback;
    }
  },
  set(key, val) {
    try {
      localStorage.setItem(key, typeof val === 'string' ? val : JSON.stringify(val));
    } catch (e) {
      console.warn('Storage write error:', e);
    }
  }
};

// --- Application State ---
const state = {
  activeView: 'overview',
  theme: safeStorage.getString('dep_theme', 'dark'),
  checklist: safeStorage.get('dep_ca1_checklist', COURSE_DATA.ca1.checklist),
  userTranscripts: safeStorage.get('dep_user_transcripts', {}),
  searchQuery: '',
  weekFilter: 'all'
};

// --- Navigation & View Switching ---
function switchView(viewId) {
  if (!viewId) viewId = 'overview';
  state.activeView = viewId;
  
  // Hide all sections, remove active class from all nav items
  document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
  
  const targetSection = document.getElementById(`view-${viewId}`);
  const targetNav = document.querySelector(`.nav-item[data-view="${viewId}"]`);
  
  if (targetSection) {
    targetSection.classList.add('active');
  }
  if (targetNav) {
    targetNav.classList.add('active');
  }

  // Close mobile sidebar if open
  const sidebar = document.getElementById('sidebar');
  if (sidebar && sidebar.classList.contains('mobile-open')) {
    sidebar.classList.remove('mobile-open');
  }
  
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleHashChange() {
  const hash = window.location.hash.replace('#', '').trim();
  const validViews = ['overview', 'weeks', 'documents', 'ca1', 'transcripts', 'glossary', 'deploy'];
  if (hash && validViews.includes(hash)) {
    switchView(hash);
  } else if (!hash) {
    switchView('overview');
  }
}

// --- Theme Management ---
function initTheme() {
  document.documentElement.setAttribute('data-theme', state.theme);
  updateThemeIcon();
}

function toggleTheme() {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', state.theme);
  safeStorage.set('dep_theme', state.theme);
  updateThemeIcon();
}

function updateThemeIcon() {
  const btn = document.getElementById('theme-toggle-btn');
  if (!btn) return;
  btn.innerHTML = state.theme === 'dark' 
    ? `<svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>`
    : `<svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>`;
}

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (sidebar) sidebar.classList.toggle('mobile-open');
}

// --- Live Countdown to CA1 Deadline (01 Nov 2026 23:59:00 IST) ---
function initCountdown() {
  const deadline = new Date(COURSE_DATA.ca1.deadlineDate).getTime();
  
  function updateTimer() {
    const now = new Date().getTime();
    const diff = deadline - now;
    
    const bannerEl = document.getElementById('ca1-countdown-banner');
    const miniEl = document.getElementById('ca1-mini-timer');
    
    if (diff <= 0) {
      const text = 'CA1 DEADLINE REACHED';
      if (bannerEl) bannerEl.textContent = text;
      if (miniEl) miniEl.textContent = text;
      return;
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);
    
    const formatted = `${days}d ${hours}h ${mins}m ${secs}s`;
    if (bannerEl) bannerEl.textContent = formatted;
    if (miniEl) miniEl.textContent = `${days}d ${hours}h left`;
  }
  
  updateTimer();
  setInterval(updateTimer, 1000);
}

// --- Render Overview Dashboard ---
function renderOverview() {
  const container = document.getElementById('overview-container');
  if (!container) return;
  
  const completedWeeks = COURSE_DATA.weeks.filter(w => w.status === 'completed').length;
  const totalWeeks = COURSE_DATA.weeks.length;
  const progressPct = Math.round((completedWeeks / totalWeeks) * 100);
  
  const completedTasks = state.checklist.filter(c => c.done).length;
  const totalTasks = state.checklist.length;
  const taskPct = Math.round((completedTasks / totalTasks) * 100);

  container.innerHTML = `
    <!-- Top Hero Banner -->
    <div class="hero-banner">
      <div class="hero-content">
        <div class="hero-pill">
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          CA1 Submission: 1st Nov 2026 (23:59 IST)
        </div>
        <h1 class="hero-title">${COURSE_DATA.meta.courseTitle}</h1>
        <p class="hero-desc">
          Master learning hub and structured roadmap for ${COURSE_DATA.meta.institution} (${COURSE_DATA.meta.cohort}). 
          Covers end-to-end data acquisition, consistency, CRISP-DM, exploratory data analysis, systematic data cleaning, Palmer Penguins and Titanic labs, and full CA1 assessment delivery.
        </p>
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <a class="btn btn-warning" href="#ca1">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            CA1 Assessment Hub (40%)
          </a>
          <a class="btn btn-secondary" href="#weeks">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
            Browse Weekly Modules
          </a>
          <button class="btn btn-secondary" onclick="openTranscriptModal()">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
            Add Lecture Transcripts / Notes
          </button>
        </div>
      </div>
    </div>

    <!-- Quick Stats Grid -->
    <div class="grid-4" style="margin-bottom: 28px;">
      <div class="card stat-card">
        <span class="stat-label">Semester Progress</span>
        <span class="stat-value">${completedWeeks} / ${totalWeeks}</span>
        <div class="progress-container">
          <div class="progress-bar" style="width: ${progressPct}%;"></div>
        </div>
        <span class="stat-meta">Week 5 completed • Week 6 starts Oct 19</span>
      </div>

      <div class="card stat-card">
        <span class="stat-label">CA1 Due Countdown</span>
        <span class="stat-value" id="ca1-countdown-banner" style="color: var(--accent-amber); font-size: 1.35rem;">Loading...</span>
        <span class="stat-meta">Weight: 40% of Final Grade</span>
      </div>

      <div class="card stat-card">
        <span class="stat-label">CA1 Checklist Tasks</span>
        <span class="stat-value" id="stat-checklist-counter">${completedTasks} / ${totalTasks}</span>
        <div class="progress-container">
          <div class="progress-bar" id="stat-checklist-bar" style="width: ${taskPct}%; background: var(--gradient-amber);"></div>
        </div>
        <span class="stat-meta" id="stat-checklist-pct">${taskPct}% complete</span>
      </div>

      <div class="card stat-card">
        <span class="stat-label">Instructor & Contact</span>
        <span class="stat-value" style="font-size: 1.15rem;">${COURSE_DATA.meta.lecturer}</span>
        <span class="stat-meta" style="color: var(--accent-blue);">${COURSE_DATA.meta.lecturerEmail}</span>
      </div>
    </div>

    <!-- 2 Column Section: Roadmap & Learning Outcomes -->
    <div class="grid-2">
      <!-- Semester Timeline Roadmap -->
      <div class="card">
        <h3 style="font-size: 1.15rem; font-weight: 800; margin-bottom: 16px; display: flex; align-items: center; gap: 8px;">
          <svg width="20" height="20" fill="none" stroke="var(--accent-blue)" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
          13-Week Semester Roadmap
        </h3>
        <div style="display: flex; flex-direction: column; gap: 12px;">
          ${COURSE_DATA.weeks.map(w => `
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: var(--bg-surface); border-radius: var(--radius-md); border: 1px solid var(--border-subtle); cursor: pointer;" onclick="openWeekCard(${w.weekNumber})">
              <div style="display: flex; align-items: center; gap: 12px;">
                <span style="font-family: var(--font-mono); font-weight: 800; font-size: 0.85rem; color: var(--accent-blue); width: 28px;">W${w.weekNumber}</span>
                <div>
                  <div style="font-size: 0.88rem; font-weight: 700; color: var(--text-main);">${w.title}</div>
                  <div style="font-size: 0.75rem; color: var(--text-dim);">${w.calendarDates}</div>
                </div>
              </div>
              <span class="badge badge-${w.status}">${w.badge}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Minimum Intended Learning Outcomes -->
      <div class="card">
        <h3 style="font-size: 1.15rem; font-weight: 800; margin-bottom: 16px; display: flex; align-items: center; gap: 8px;">
          <svg width="20" height="20" fill="none" stroke="var(--accent-emerald)" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
          Module Learning Outcomes (MIMLOs)
        </h3>
        <div style="display: flex; flex-direction: column; gap: 14px;">
          ${COURSE_DATA.learningOutcomes.map(mlo => `
            <div style="padding: 12px; background: var(--bg-surface); border-radius: var(--radius-md); border-left: 3px solid var(--accent-blue);">
              <div style="font-size: 0.85rem; font-weight: 700; color: var(--accent-blue); margin-bottom: 4px;">${mlo.title}</div>
              <div style="font-size: 0.82rem; color: var(--text-muted);">${mlo.desc}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

// --- Render Weekly Modules Section ---

function renderWeekDocsHtml(weekNum) {
  const weekTag = 'Week ' + weekNum;
  const files = (COURSE_DATA.courseFiles || []).filter(f => f.week_tag === weekTag);
  if (!files || files.length === 0) {
    return '<p style="font-size:0.82rem; color:var(--text-dim); margin-top:8px;">No local documents for this week.</p>';
  }
  return `
    <div style="display:flex; flex-direction:column; gap:8px; margin-top:10px;">
      ${files.map(cf => {
        const isPdf = cf.ext === '.pdf';
        const safeName = cf.name.replace(/'/g, "\\'");
        const safeUrl = cf.url.replace(/'/g, "\\'");
        const viewBtn = isPdf ? `<button class="btn btn-primary" style="font-size:0.72rem; padding:4px 10px;" onclick="openPdfViewer('${safeUrl}', '${safeName}')">Read PDF</button>` : '';
        const dlBtn = `<a class="btn btn-secondary" style="font-size:0.72rem; padding:4px 10px; text-decoration:none;" href="${cf.url}" download="${cf.name}">Download (${cf.size_kb} KB)</a>`;
        return `
          <div style="display:flex; align-items:center; justify-content:space-between; padding:8px 12px; background:var(--bg-surface); border-radius:var(--radius-md); border:1px solid var(--border-subtle); flex-wrap:wrap; gap:8px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="font-size:1rem;">${isPdf ? '📄' : '📦'}</span>
              <span style="font-size:0.85rem; font-weight:600; color:var(--text-main);">${cf.name}</span>
              <span class="badge" style="font-size:0.65rem; background:rgba(255,255,255,0.06); color:var(--text-dim);">${cf.tag}</span>
            </div>
            <div style="display:flex; gap:6px;">
              ${viewBtn}
              ${dlBtn}
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function renderLectureDeepDiveHtml(deepDive) {
  if (!deepDive || !deepDive.sections) return '';

  const safePdfName = (deepDive.slidesName || 'Lecture Slides').replace(/'/g, "\\'");
  const safePdfUrl = (deepDive.slidesUrl || '').replace(/'/g, "\\'");

  const readPdfBtn = safePdfUrl ? `
    <button class="btn btn-primary" style="font-size: 0.78rem; padding: 6px 14px; display: flex; align-items: center; gap: 6px;" onclick="openPdfViewer('${safePdfUrl}', '${safePdfName}')">
      <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
      Read Lecture 1 Slides (PDF)
    </button>
  ` : '';

  return `
    <div class="deepdive-wrapper" style="margin-top: 24px; padding: 22px; background: rgba(15, 23, 42, 0.7); border-radius: var(--radius-lg); border: 1px solid rgba(59, 130, 246, 0.3); box-shadow: 0 4px 20px rgba(0,0,0,0.25);">
      <!-- Header banner -->
      <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:12px; margin-bottom:18px;">
        <div>
          <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
            <span class="badge" style="background:rgba(59,130,246,0.18); color:var(--accent-blue); border:1px solid rgba(59,130,246,0.35); font-size:0.7rem;">Comprehensive Lecture Synthesis</span>
            <span style="font-size:0.78rem; color:var(--text-dim);">${deepDive.lecturer || ''}</span>
          </div>
          <h4 style="font-size:1.2rem; font-weight:800; color:var(--text-main); margin-top:4px;">${deepDive.lectureTitle}</h4>
        </div>
        ${readPdfBtn}
      </div>

      <!-- Executive Overview -->
      <div style="padding: 14px 18px; background: var(--bg-surface); border-radius: var(--radius-md); border-left: 4px solid var(--accent-blue); margin-bottom: 22px;">
        <div style="font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--accent-blue); margin-bottom: 4px;">Executive Study Brief</div>
        <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.6;">${deepDive.executiveSummary}</p>
      </div>

      <!-- Sections Grid / List -->
      <div style="display: flex; flex-direction: column; gap: 18px;">
        ${deepDive.sections.map(sec => {
          let extraContent = '';

          // 1. Comparison Box
          if (sec.comparison) {
            extraContent += `
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 12px; margin-top: 14px;">
                <div style="padding: 14px; background: rgba(30, 41, 59, 0.6); border-radius: var(--radius-md); border: 1px solid rgba(244, 63, 94, 0.25);">
                  <div style="font-size: 0.82rem; font-weight: 700; color: var(--accent-rose); margin-bottom: 8px;">${sec.comparison.colA.label}</div>
                  <ul style="list-style: none; display: flex; flex-direction: column; gap: 6px; padding: 0;">
                    ${sec.comparison.colA.items.map(it => `<li style="font-size: 0.82rem; color: var(--text-muted); padding-left: 16px; position: relative;"><span style="position: absolute; left: 0; color: var(--accent-rose);">•</span>${it}</li>`).join('')}
                  </ul>
                </div>
                <div style="padding: 14px; background: rgba(30, 41, 59, 0.6); border-radius: var(--radius-md); border: 1px solid rgba(16, 185, 129, 0.25);">
                  <div style="font-size: 0.82rem; font-weight: 700; color: var(--accent-emerald); margin-bottom: 8px;">${sec.comparison.colB.label}</div>
                  <ul style="list-style: none; display: flex; flex-direction: column; gap: 6px; padding: 0;">
                    ${sec.comparison.colB.items.map(it => `<li style="font-size: 0.82rem; color: var(--text-muted); padding-left: 16px; position: relative;"><span style="position: absolute; left: 0; color: var(--accent-emerald);">•</span>${it}</li>`).join('')}
                  </ul>
                </div>
              </div>
            `;
          }

          // 2. Taxonomy Table
          if (sec.taxonomyTable) {
            extraContent += `
              <div style="overflow-x: auto; margin-top: 14px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
                <table style="width: 100%; border-collapse: collapse; font-size: 0.82rem; text-align: left;">
                  <thead>
                    <tr style="background: var(--bg-surface); border-bottom: 2px solid var(--border-subtle);">
                      <th style="padding: 10px 12px; color: var(--text-main); font-weight: 700;">Type</th>
                      <th style="padding: 10px 12px; color: var(--text-main); font-weight: 700;">Sub-Type</th>
                      <th style="padding: 10px 12px; color: var(--text-main); font-weight: 700;">Definition</th>
                      <th style="padding: 10px 12px; color: var(--text-main); font-weight: 700;">Examples</th>
                      <th style="padding: 10px 12px; color: var(--text-main); font-weight: 700;">Allowable Operations & Visuals</th>
                      <th style="padding: 10px 12px; color: var(--accent-amber); font-weight: 700;">CA1 Practical Implication</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${sec.taxonomyTable.map((row, idx) => `
                      <tr style="border-bottom: 1px solid var(--border-subtle); background: ${idx % 2 === 0 ? 'rgba(255,255,255,0.01)' : 'rgba(255,255,255,0.03)'};">
                        <td style="padding: 10px 12px; font-weight: 600; color: var(--accent-cyan); white-space: nowrap;">${row.category}</td>
                        <td style="padding: 10px 12px;"><span class="badge" style="background: rgba(59,130,246,0.15); color: var(--accent-blue);">${row.subType}</span></td>
                        <td style="padding: 10px 12px; color: var(--text-muted); min-width: 160px;">${row.definition}</td>
                        <td style="padding: 10px 12px; color: var(--text-dim); font-family: var(--font-mono); font-size: 0.76rem; min-width: 140px;">${row.examples}</td>
                        <td style="padding: 10px 12px; color: var(--text-muted); min-width: 150px;"><span style="color:var(--text-main); font-weight:600;">Ops:</span> ${row.allowableOps}<br/><span style="color:var(--accent-emerald); font-weight:600;">Viz:</span> ${row.viz}</td>
                        <td style="padding: 10px 12px; color: var(--accent-amber); min-width: 170px;">${row.ca1Application}</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            `;
          }

          // 3. Points list
          if (sec.points) {
            extraContent += `
              <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 12px;">
                ${sec.points.map(pt => `
                  <div style="font-size: 0.85rem; color: var(--text-muted); padding: 9px 14px; background: rgba(30,41,59,0.5); border-radius: var(--radius-md); border-left: 3px solid var(--accent-blue);">
                    ${pt}
                  </div>
                `).join('')}
              </div>
            `;
          }

          // 4. Framework Steps (What, Where, How)
          if (sec.frameworkSteps) {
            extraContent += `
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12px; margin-top: 14px;">
                ${sec.frameworkSteps.map(fs => `
                  <div style="padding: 14px; background: rgba(30, 41, 59, 0.6); border-radius: var(--radius-md); border: 1px solid rgba(6, 182, 212, 0.25);">
                    <div style="font-size: 0.85rem; font-weight: 700; color: var(--accent-cyan); margin-bottom: 6px;">${fs.step}</div>
                    <div style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.5;">${fs.desc}</div>
                  </div>
                `).join('')}
              </div>
            `;
          }

          // 5. Compliance Checklist
          if (sec.complianceChecklist) {
            extraContent += `
              <div style="margin-top: 14px; padding: 12px 16px; background: rgba(245, 158, 11, 0.06); border-radius: var(--radius-md); border: 1px solid rgba(245, 158, 11, 0.25);">
                <div style="font-size: 0.78rem; font-weight: 700; color: var(--accent-amber); text-transform: uppercase; margin-bottom: 8px;">Ethical & Legal Compliance Guardrails:</div>
                <div style="display: flex; flex-direction: column; gap: 6px;">
                  ${sec.complianceChecklist.map(cp => `
                    <div style="font-size: 0.82rem; color: var(--text-muted);">${cp}</div>
                  `).join('')}
                </div>
              </div>
            `;
          }

          // 6. Quality Pillars
          if (sec.qualityPillars) {
            extraContent += `
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; margin-top: 14px;">
                ${sec.qualityPillars.map(qp => `
                  <div style="padding: 14px; background: rgba(30, 41, 59, 0.7); border-radius: var(--radius-md); border-top: 3px solid var(--accent-emerald);">
                    <div style="font-size: 0.85rem; font-weight: 700; color: var(--accent-emerald); margin-bottom: 4px;">${qp.title}</div>
                    <div style="font-size: 0.8rem; color: var(--text-muted); line-height: 1.5;">${qp.desc}</div>
                  </div>
                `).join('')}
              </div>
            `;
          }

          // 7. Lifecycle Stages
          if (sec.lifecycleStages) {
            extraContent += `
              <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px;">
                ${sec.lifecycleStages.map(st => `
                  <span class="badge" style="background: rgba(16, 185, 129, 0.12); color: var(--accent-emerald); border: 1px solid rgba(16, 185, 129, 0.3); font-size: 0.72rem; padding: 5px 10px;">${st}</span>
                `).join('')}
              </div>
            `;
          }

          // 8. Git Concepts & Strategy
          if (sec.gitConcepts) {
            extraContent += `
              <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 12px;">
                ${sec.gitConcepts.map(gc => `
                  <div style="font-size: 0.82rem; color: var(--text-muted); padding: 8px 12px; background: rgba(30, 41, 59, 0.5); border-radius: var(--radius-md); border-left: 3px solid var(--accent-rose);">
                    ${gc}
                  </div>
                `).join('')}
              </div>
            `;
          }
          if (sec.ca1GitStrategy) {
            extraContent += `
              <div style="margin-top: 12px; padding: 12px 14px; background: rgba(244, 63, 94, 0.08); border-radius: var(--radius-md); border: 1px solid rgba(244, 63, 94, 0.25); font-size: 0.82rem; color: var(--text-main); line-height: 1.55;">
                ${sec.ca1GitStrategy}
              </div>
            `;
          }

          // 9. Takeaway callout
          if (sec.takeaway) {
            extraContent += `
              <div style="margin-top: 12px; padding: 10px 14px; background: rgba(59, 130, 246, 0.08); border-radius: var(--radius-md); border-left: 3px solid var(--accent-blue); font-size: 0.83rem; color: var(--text-main);">
                <strong>💡 Assessment Connection:</strong> ${sec.takeaway}
              </div>
            `;
          }

          return `
            <div style="padding: 16px 18px; background: var(--bg-surface); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; flex-wrap: wrap; gap: 8px;">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span style="font-size: 1.15rem;">${sec.icon}</span>
                  <h5 style="font-size: 0.98rem; font-weight: 700; color: var(--text-main); margin: 0;">${sec.title}</h5>
                </div>
                <span class="badge" style="font-size: 0.68rem; background: rgba(255,255,255,0.06); color: var(--accent-cyan); border: 1px solid rgba(6,182,212,0.3);">${sec.badge}</span>
              </div>
              <p style="font-size: 0.86rem; color: var(--text-muted); line-height: 1.55;">${sec.content}</p>
              ${extraContent}
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

function renderWeeklyModules() {
  const container = document.getElementById('weeks-container');
  if (!container) return;

  const filteredWeeks = COURSE_DATA.weeks.filter(w => {
    if (state.weekFilter === 'completed') return w.status === 'completed';
    if (state.weekFilter === 'active') return w.status === 'active';
    if (state.weekFilter === 'upcoming') return w.status === 'upcoming' || w.status === 'milestone';
    return true;
  });

  container.innerHTML = `
    <div style="display: flex; gap: 8px; margin-bottom: 20px; flex-wrap: wrap;">
      <button class="btn btn-secondary ${state.weekFilter === 'all' ? 'btn-primary' : ''}" onclick="setWeekFilter('all')">All (13 Weeks)</button>
      <button class="btn btn-secondary ${state.weekFilter === 'completed' ? 'btn-primary' : ''}" onclick="setWeekFilter('completed')">Completed (Weeks 1-5)</button>
      <button class="btn btn-secondary ${state.weekFilter === 'active' ? 'btn-primary' : ''}" onclick="setWeekFilter('active')">Current (Week 5)</button>
      <button class="btn btn-secondary ${state.weekFilter === 'upcoming' ? 'btn-primary' : ''}" onclick="setWeekFilter('upcoming')">Upcoming & Milestones</button>
    </div>

    ${filteredWeeks.map(w => {
      const userNotes = state.userTranscripts[`week-${w.weekNumber}`] || '';
      return `
        <div class="week-card ${w.status === 'active' ? 'active-week' : ''}" id="week-card-${w.weekNumber}">
          <div class="week-header" onclick="toggleWeekCard(${w.weekNumber})">
            <div class="week-meta-left">
              <div class="week-num-badge">W${w.weekNumber}</div>
              <div class="week-title-box">
                <h3>
                  ${w.title}
                  <span class="badge badge-${w.status}">${w.badge}</span>
                </h3>
                <p>${w.lectureNumber} • ${w.calendarDates}</p>
              </div>
            </div>
            <div style="display: flex; align-items: center; gap: 12px;">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="chevron-icon"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>

          <div class="week-content ${w.weekNumber <= 5 ? 'expanded' : ''}" id="week-content-${w.weekNumber}">
            <!-- Summary -->
            <div class="week-section-title">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              Executive Summary & Theory
            </div>
            <p style="font-size: 0.92rem; color: var(--text-muted); margin-bottom: 12px;">${w.summary}</p>

            <!-- Key Topics -->
            <div class="week-section-title">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
              Syllabus Topics Covered
            </div>
            <ul class="topics-list">
              ${w.topics.map(t => `<li>${t}</li>`).join('')}
            </ul>

            <!-- Practical Highlights -->
            ${w.practicalHighlights ? `
              <div class="week-section-title">
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
                Practical & Code Implementation
              </div>
              <p style="font-size: 0.88rem; color: var(--text-muted); background: var(--bg-surface); padding: 10px 14px; border-radius: var(--radius-md); border-left: 3px solid var(--accent-emerald);">
                ${w.practicalHighlights}
              </p>
            ` : ''}

            <!-- In-Depth Lecture Notes & Key Takeaways -->
            ${w.deepDive ? renderLectureDeepDiveHtml(w.deepDive) : ''}

            <!-- Class Video Sessions & Transcripts -->
            <div class="week-section-title">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
              Weekly Class Video Sessions (Google Drive) & Transcripts
            </div>
            <div class="video-grid">
              ${(w.videoSlots || []).map((slot, idx) => `
                <div class="video-slot-card">
                  <div class="video-slot-header">
                    <span class="video-slot-title">${slot.title}</span>
                    <span class="video-slot-time">${slot.time}</span>
                  </div>
                  <div class="transcript-preview">
                    ${slot.transcript ? `<em>${slot.transcript}</em>` : 'Available on College Google Drive. Attach notes or transcripts below.'}
                  </div>
                  <button class="btn btn-secondary" style="font-size: 0.75rem; padding: 4px 10px; align-self: flex-start;" onclick="openTranscriptModal(${w.weekNumber}, '${slot.id}')">
                    <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                    Attach Notes / Transcript from Gemini NotebookLM
                  </button>
                </div>
              `).join('')}
            </div>

            
            <!-- Week Associated Documents & Files -->
            <div class="week-section-title">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"></path></svg>
              Associated Lecture Slides, Notebooks & Datasets
            </div>
            ${renderWeekDocsHtml(w.weekNumber)}

            <!-- Custom User Notes if available -->
            ${userNotes ? `
              <div style="margin-top: 14px; padding: 12px; background: rgba(59, 130, 246, 0.08); border-radius: var(--radius-md); border: 1px solid rgba(59, 130, 246, 0.2);">
                <div style="font-size: 0.78rem; font-weight: 700; color: var(--accent-blue); margin-bottom: 4px;">YOUR ATTACHED NOTES / TRANSCRIPT:</div>
                <div style="font-size: 0.85rem; color: var(--text-main); white-space: pre-wrap;">${userNotes}</div>
              </div>
            ` : ''}
          </div>
        </div>
      `;
    }).join('')}
  `;
}

function setWeekFilter(filter) {
  state.weekFilter = filter;
  renderWeeklyModules();
}

function toggleWeekCard(weekNum) {
  const content = document.getElementById(`week-content-${weekNum}`);
  if (!content) return;
  content.classList.toggle('expanded');
}

function openWeekCard(weekNum) {
  window.location.hash = 'weeks';
  switchView('weeks');
  setTimeout(() => {
    const card = document.getElementById(`week-card-${weekNum}`);
    const content = document.getElementById(`week-content-${weekNum}`);
    if (content) content.classList.add('expanded');
    if (card) card.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 100);
}

// --- Render CA1 Assessment Hub ---
function renderCA1Section() {
  const container = document.getElementById('ca1-container');
  if (!container) return;

  container.innerHTML = `
    <!-- Top Warning / Deadline Banner -->
    <div class="hero-banner" style="border-color: rgba(245, 158, 11, 0.4); background: linear-gradient(135deg, rgba(120, 53, 15, 0.3) 0%, rgba(30, 41, 59, 0.7) 100%);">
      <div class="hero-pill" style="background: rgba(245, 158, 11, 0.2); color: var(--accent-amber);">
        Due: ${COURSE_DATA.ca1.deadlineText}
      </div>
      <h2 style="font-size: 1.85rem; font-weight: 800; margin-bottom: 8px;">${COURSE_DATA.ca1.title} — 40% Continuous Assessment</h2>
      <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 16px;">
        Dataset: <strong>Smart_Home_Energy.csv</strong> (Moodle). Individual submission via Moodle (NO ZIP files allowed).
      </p>
      <div style="display: flex; gap: 12px; flex-wrap: wrap;">
        <span class="badge badge-milestone" style="font-size: 0.8rem; padding: 6px 12px;">30% Jupyter Notebook</span>
        <span class="badge badge-milestone" style="font-size: 0.8rem; padding: 6px 12px;">40% Poster Content</span>
        <span class="badge badge-milestone" style="font-size: 0.8rem; padding: 6px 12px;">10% Poster Design</span>
        <span class="badge badge-milestone" style="font-size: 0.8rem; padding: 6px 12px;">20% Video, GitHub & References</span>
      </div>
    </div>

    <!-- 4 Deliverables Cards -->
    <div class="grid-4" style="margin-bottom: 28px;">
      ${COURSE_DATA.ca1.deliverables.map(d => `
        <div class="card">
          <div style="font-size: 0.75rem; font-weight: 800; color: var(--accent-cyan); text-transform: uppercase;">${d.marks}</div>
          <h4 style="font-size: 1.05rem; font-weight: 800; margin: 6px 0 4px; color: var(--text-main);">${d.name}</h4>
          <div style="font-size: 0.75rem; color: var(--accent-blue); font-family: var(--font-mono); margin-bottom: 8px;">${d.format}</div>
          <p style="font-size: 0.82rem; color: var(--text-muted);">${d.description}</p>
        </div>
      `).join('')}
    </div>

    <!-- Checklist & Progress -->
    <div class="card" style="margin-bottom: 28px;">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
        <div>
          <h3 style="font-size: 1.25rem; font-weight: 800;">CA1 Step-by-Step Task Checklist</h3>
          <p style="font-size: 0.85rem; color: var(--text-muted);">Check off items as you complete them. Progress is automatically saved locally.</p>
        </div>
        <button class="btn btn-secondary" onclick="resetChecklist()" style="font-size: 0.78rem;">Reset Checklist</button>
      </div>

      <div class="checklist-container">
        ${state.checklist.map(item => `
          <div class="check-item ${item.done ? 'completed' : ''}" onclick="toggleCheckItem('${item.id}')">
            <input type="checkbox" class="check-input" ${item.done ? 'checked' : ''} onclick="event.stopPropagation(); toggleCheckItem('${item.id}')">
            <span class="check-label">${item.text}</span>
            <span class="check-category-pill">${item.category}</span>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Sample Poster Analysis & Critical Guidelines -->
    <div class="card" style="margin-bottom: 28px;">
      <h3 style="font-size: 1.25rem; font-weight: 800; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
        <svg width="20" height="20" fill="none" stroke="var(--accent-purple)" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
        Anatomy of an A-Grade Poster (500 – 600 Words Strictly)
      </h3>
      <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 16px;">
        Based on the official <a href="file:///g:/Mi%20unidad/000.0001-CCT/Data%20Exploration%20&%20Preparation%20[DIPDAB-Sep26%20cohort]/Docs/Week%205%20-%2012%20October%20-%2018%20October/Sample_Poster.pdf" target="_blank" style="color: var(--accent-blue);">Sample_Poster.pdf</a>, your poster layout must strictly adhere to:
      </p>
      <div class="grid-4">
        <div style="background: var(--bg-surface); padding: 14px; border-radius: var(--radius-md); border-left: 3px solid var(--accent-blue);">
          <h4 style="font-size: 0.88rem; font-weight: 700; color: var(--text-main);">1. Introduction (~90 words)</h4>
          <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 4px;">Context of Smart Home Energy, business problem, objectives, and research questions.</p>
        </div>
        <div style="background: var(--bg-surface); padding: 14px; border-radius: var(--radius-md); border-left: 3px solid var(--accent-cyan);">
          <h4 style="font-size: 0.88rem; font-weight: 700; color: var(--text-main);">2. Methods (~200 words)</h4>
          <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 4px;">Justification of EDA choices, why median/mode imputation was selected, duplicate removal rationale, and feature selection.</p>
        </div>
        <div style="background: var(--bg-surface); padding: 14px; border-radius: var(--radius-md); border-left: 3px solid var(--accent-emerald);">
          <h4 style="font-size: 0.88rem; font-weight: 700; color: var(--text-main);">3. Results (~150 words)</h4>
          <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 4px;">Key distributions, correlation highlights, and explanations referencing Figure 1, 2, and 3.</p>
        </div>
        <div style="background: var(--bg-surface); padding: 14px; border-radius: var(--radius-md); border-left: 3px solid var(--accent-amber);">
          <h4 style="font-size: 0.88rem; font-weight: 700; color: var(--text-main);">4. Conclusions (~90 words)</h4>
          <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 4px;">Summary of actionable takeaways for energy optimization and predictive modeling readiness.</p>
        </div>
      </div>
    </div>

    <!-- Python Starter Code Recipes -->
    <div class="card">
      <h3 style="font-size: 1.25rem; font-weight: 800; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
        <svg width="20" height="20" fill="none" stroke="var(--accent-blue)" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
        Ready-to-Use Python Recipes for Smart_Home_Energy.csv
      </h3>

      <div class="code-box">
        <div class="code-header">
          <span class="code-title">1. Initial Inspection & Missing Data Audit</span>
          <button class="code-copy-btn" onclick="copyCode('code-eda')">Copy Code</button>
        </div>
        <pre><code id="code-eda">${escapeHtml(COURSE_DATA.ca1.codeTemplates.eda)}</code></pre>
      </div>

      <div class="code-box">
        <div class="code-header">
          <span class="code-title">2. Data Cleaning & Robust Imputation with Flags</span>
          <button class="code-copy-btn" onclick="copyCode('code-cleaning')">Copy Code</button>
        </div>
        <pre><code id="code-cleaning">${escapeHtml(COURSE_DATA.ca1.codeTemplates.cleaning)}</code></pre>
      </div>

      <div class="code-box">
        <div class="code-header">
          <span class="code-title">3. Outlier Detection with Interquartile Range (IQR)</span>
          <button class="code-copy-btn" onclick="copyCode('code-outliers')">Copy Code</button>
        </div>
        <pre><code id="code-outliers">${escapeHtml(COURSE_DATA.ca1.codeTemplates.outliers)}</code></pre>
      </div>

      <div class="code-box">
        <div class="code-header">
          <span class="code-title">4. Feature Selection with Correlation Matrix</span>
          <button class="code-copy-btn" onclick="copyCode('code-features')">Copy Code</button>
        </div>
        <pre><code id="code-features">${escapeHtml(COURSE_DATA.ca1.codeTemplates.featureSelection)}</code></pre>
      </div>
    </div>
  `;
}

// --- Checklist Interactivity ---
function toggleCheckItem(id) {
  const item = state.checklist.find(c => c.id === id);
  if (!item) return;
  item.done = !item.done;
  safeStorage.set('dep_ca1_checklist', state.checklist);
  renderCA1Section();
  updateProgressStats();
}

function resetChecklist() {
  if (confirm('Reset all checklist progress?')) {
    state.checklist.forEach(c => c.done = false);
    safeStorage.set('dep_ca1_checklist', state.checklist);
    renderCA1Section();
    updateProgressStats();
  }
}

function updateProgressStats() {
  const completed = state.checklist.filter(c => c.done).length;
  const total = state.checklist.length;
  const pct = Math.round((completed / total) * 100);

  const counter = document.getElementById('stat-checklist-counter');
  const bar = document.getElementById('stat-checklist-bar');
  const pctText = document.getElementById('stat-checklist-pct');

  if (counter) counter.textContent = `${completed} / ${total}`;
  if (bar) bar.style.width = `${pct}%`;
  if (pctText) pctText.textContent = `${pct}% complete`;
}

// --- Render Transcripts & Notes Hub ---
function renderTranscriptsHub() {
  const container = document.getElementById('transcripts-container');
  if (!container) return;

  const savedKeys = Object.keys(state.userTranscripts);

  container.innerHTML = `
    <div class="card" style="margin-bottom: 24px;">
      <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
        <div>
          <h3 style="font-size: 1.25rem; font-weight: 800;">Class Video Transcripts & Gemini NotebookLM Notes</h3>
          <p style="font-size: 0.85rem; color: var(--text-muted);">
            Each class has 2 lecture recordings hosted on Google Drive. Since you cannot download all videos, paste your transcripts or summaries from Gemini NotebookLM here. They are stored securely in your browser and injected into the weekly study modules!
          </p>
        </div>
        <div style="display: flex; gap: 8px;">
          <button class="btn btn-primary" onclick="openTranscriptModal()">+ Add New Note / Transcript</button>
          <button class="btn btn-secondary" onclick="exportNotes()">Export All Notes (JSON)</button>
        </div>
      </div>
    </div>

    ${savedKeys.length === 0 ? `
      <div class="card" style="text-align: center; padding: 48px 24px;">
        <svg width="48" height="48" fill="none" stroke="var(--text-dim)" viewBox="0 0 24 24" style="margin: 0 auto 12px;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
        <h4 style="font-size: 1.1rem; font-weight: 700; color: var(--text-main);">No custom transcripts added yet</h4>
        <p style="font-size: 0.85rem; color: var(--text-muted); max-width: 480px; margin: 6px auto 18px;">
          Take transcriptions or summaries from Gemini NotebookLM or your class notes, click the button below, and attach them to any week.
        </p>
        <button class="btn btn-primary" onclick="openTranscriptModal()">Add Your First Transcript</button>
      </div>
    ` : `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        ${savedKeys.map(key => {
          const content = state.userTranscripts[key];
          return `
            <div class="card">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                <span class="badge badge-active">${key.toUpperCase()}</span>
                <button class="btn btn-secondary" style="font-size: 0.72rem; padding: 2px 8px;" onclick="deleteTranscript('${key}')">Delete</button>
              </div>
              <pre style="font-family: inherit; font-size: 0.88rem; color: var(--text-main); white-space: pre-wrap; line-height: 1.6;">${escapeHtml(content)}</pre>
            </div>
          `;
        }).join('')}
      </div>
    `}
  `;
}

// --- Render Glossary ---
function renderGlossary() {
  const container = document.getElementById('glossary-container');
  if (!container) return;

  container.innerHTML = `
    <div class="grid-3">
      ${COURSE_DATA.glossary.map(g => `
        <div class="card">
          <div style="font-size: 1.05rem; font-weight: 800; color: var(--accent-blue); margin-bottom: 8px;">${g.term}</div>
          <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.5;">${g.def}</p>
        </div>
      `).join('')}
    </div>
  `;
}

// --- Modal for Adding / Editing Transcripts ---
function openTranscriptModal(weekNum, slotId) {
  const modal = document.getElementById('transcript-modal');
  if (!modal) return;
  
  if (weekNum) {
    document.getElementById('modal-week-select').value = `week-${weekNum}`;
  }
  
  modal.classList.add('open');
}

function closeTranscriptModal() {
  const modal = document.getElementById('transcript-modal');
  if (modal) modal.classList.remove('open');
}

function saveModalTranscript() {
  const weekKey = document.getElementById('modal-week-select').value;
  const title = document.getElementById('modal-title-input').value.trim();
  const text = document.getElementById('modal-text-input').value.trim();

  if (!text) {
    alert('Please paste some text content or notes.');
    return;
  }

  const existing = state.userTranscripts[weekKey] || '';
  const newEntry = `### ${title || 'Class Notes / Transcript'} (${new Date().toLocaleDateString()})\n${text}\n\n`;
  
  state.userTranscripts[weekKey] = newEntry + existing;
  safeStorage.set('dep_user_transcripts', state.userTranscripts);

  closeTranscriptModal();
  renderWeeklyModules();
  renderTranscriptsHub();
  alert('Transcript saved successfully!');
}

function deleteTranscript(key) {
  if (confirm(`Delete notes for ${key}?`)) {
    delete state.userTranscripts[key];
    safeStorage.set('dep_user_transcripts', state.userTranscripts);
    renderWeeklyModules();
    renderTranscriptsHub();
  }
}

function exportNotes() {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(state.userTranscripts, null, 2));
  const dl = document.createElement('a');
  dl.setAttribute('href', dataStr);
  dl.setAttribute('download', 'dep_course_notes.json');
  dl.click();
}

// --- Helpers ---
function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function copyCode(elementId) {
  const codeEl = document.getElementById(elementId);
  if (!codeEl) return;
  navigator.clipboard.writeText(codeEl.innerText).then(() => {
    alert('Code copied to clipboard!');
  });
}

function setupEventListeners() {
  // Global search input
  const searchInput = document.getElementById('global-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      state.searchQuery = q;
      document.querySelectorAll('.week-card').forEach(card => {
        const text = card.innerText.toLowerCase();
        card.style.display = text.includes(q) ? 'block' : 'none';
      });
    });
  }

  // Hash-based routing
  window.addEventListener('hashchange', handleHashChange);

  // Global Click delegation for [data-view]
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-view]');
    if (trigger) {
      const targetView = trigger.getAttribute('data-view');
      if (targetView) {
        switchView(targetView);
      }
    }
  });
}

// --- Initialize App ---
function initApp() {
  initTheme();
  initCountdown();
  renderOverview();
  renderWeeklyModules();
  renderCA1Section();
  renderTranscriptsHub();
  renderGlossary();
  setupEventListeners();
  updateProgressStats();
  handleHashChange();
}

// Run immediately if DOM is ready, otherwise wait for DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

// Explicit global exposure for inline onclick handlers
window.switchView = switchView;
window.toggleTheme = toggleTheme;
window.toggleSidebar = toggleSidebar;
window.openTranscriptModal = openTranscriptModal;
window.closeTranscriptModal = closeTranscriptModal;
window.saveModalTranscript = saveModalTranscript;
window.deleteTranscript = deleteTranscript;
window.exportNotes = exportNotes;
window.toggleCheckItem = toggleCheckItem;
window.resetChecklist = resetChecklist;
window.copyCode = copyCode;
window.toggleWeekCard = toggleWeekCard;
window.openWeekCard = openWeekCard;
window.setWeekFilter = setWeekFilter;
