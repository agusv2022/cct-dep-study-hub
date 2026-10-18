import os

APP_JS_PATH = r"g:\Mi unidad\000.0001-CCT\Data Exploration & Preparation [DIPDAB-Sep26 cohort]\dep-study-hub\js\app.js"

with open(APP_JS_PATH, "r", encoding="utf-8") as f:
    app_js = f.read()

helper_func = """
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
        const safeName = cf.name.replace(/'/g, "\\\\'");
        const safeUrl = cf.url.replace(/'/g, "\\\\'");
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
"""

if "function renderWeekDocsHtml" not in app_js:
    target = "function renderWeeklyModules()"
    app_js = app_js.replace(target, helper_func + "\n" + target)

target_slot = "<!-- Custom User Notes if available -->"
new_slot = """
            <!-- Week Associated Documents & Files -->
            <div class="week-section-title">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"></path></svg>
              Associated Lecture Slides, Notebooks & Datasets
            </div>
            ${renderWeekDocsHtml(w.weekNumber)}

            <!-- Custom User Notes if available -->"""

if "Associated Lecture Slides, Notebooks & Datasets" not in app_js:
    app_js = app_js.replace(target_slot, new_slot)

with open(APP_JS_PATH, "w", encoding="utf-8") as f:
    f.write(app_js)

print("Updated app.js successfully!")
