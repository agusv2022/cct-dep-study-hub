/**
 * Data Exploration & Preparation (DEP) - Course Data & Knowledge Base
 * CCT College Dublin - Diploma in Data Analytics for Business (Level 7)
 * Lecturer: Dr. Muhammad Iqbal (miqbal@cct.ie)
 */

const COURSE_DATA = {
  meta: {
    courseTitle: 'Data Exploration & Preparation',
    code: 'DEP-L7',
    institution: 'CCT College Dublin',
    cohort: 'DIPDAB-Sep26 Stage 1 Sem 1',
    lecturer: 'Dr. Muhammad Iqbal',
    lecturerEmail: 'miqbal@cct.ie',
    techSupport: 'Juan Murguey (jmurguey@cct.ie)',
    totalWeeks: 13,
    ca1Deadline: '2026-11-01T23:59:00',
    assessmentWeighting: '40% CA1 (MLO2, MLO3, MLO4) + 60% CA2 (MLO1, MLO5, MLO6)',
  },
  learningOutcomes: [
    { id: 'MIMLO1', title: 'MLO 1: Data Gathering & Regulatory Compliance', desc: 'Gather and format data into an actionable resource ensuring compliance with ethical, legal, and regulatory standards (GDPR, EU AI Act).' },
    { id: 'MIMLO2', title: 'MLO 2: Exploratory Data Analysis (EDA)', desc: 'Investigate data using EDA techniques and discuss findings with a view to how this influences strategic decision-making.' },
    { id: 'MIMLO3', title: 'MLO 3: Data Cleaning & Preparation', desc: 'Implement a structured data cleaning and preparation plan using appropriate techniques for downstream analysis.' },
    { id: 'MIMLO4', title: 'MLO 4: Data Engineering & Feature Selection', desc: 'Select and employ appropriate data engineering processes to enhance insight and scope of analytical models.' },
    { id: 'MIMLO5', title: 'MLO 5: Data Dictionaries & Properties', desc: 'Communicate data properties (qualitative, quantitative, datatypes, feature types) ensuring consistency and replicability.' },
    { id: 'MIMLO6', title: 'MLO 6: Project Cycle & Version Control', desc: 'Demonstrate an iterative project cycle using version control (Git/GitHub) to provide verifiable evidence of ongoing progress.' }
  ],
  ca1: {
    title: 'Continuous Assessment 1 (CA1-L7)',
    weight: '40%',
    deadlineText: '1st November 2026 at 23:59 IST',
    deadlineDate: '2026-11-01T23:59:00',
    dataset: 'Smart_Home_Energy.csv (Download from Moodle)',
    submissionMethod: 'Moodle Upload (Individual files, NO ZIP ARCHIVES)',
    penalties: 'Up to 5 calendar days late: 10% penalty. >5 days: 0% awarded.',
    deliverables: [
      {
        name: 'Jupyter Notebook',
        format: '.ipynb ONLY (No python .py scripts)',
        marks: '30 Marks',
        description: 'Complete Python workflow covering EDA, Data Cleaning, Duplicates Handling, Missing Values Strategy, and Feature Selection.'
      },
      {
        name: 'Academic Poster',
        format: '.ppt ONLY (No PDF, No AI-generated content)',
        marks: '50 Marks (40 Content + 10 Design/Clarity)',
        description: '500-600 words strictly (excluding references/titles). Must use official landscape PPT template. Includes justification for EDA, Cleaning, Feature Selection, Duplicates, and at least 1-3 high-impact visualizations.'
      },
      {
        name: 'Video Presentation',
        format: 'Google Drive Link (<3 Minutes, Face Visible)',
        marks: 'Part of 20 Marks',
        description: 'Recorded screencast explaining poster findings and methodological choices. Face must be visible throughout. Grant viewer access to miqbal@cct.ie.'
      },
      {
        name: 'GitHub Repository',
        format: 'GitHub Link (min 5 commits)',
        marks: 'Part of 20 Marks',
        description: 'Evidence of iterative development with regular descriptive commits across the project lifespan. Lecturer miqbal@cct.ie added as collaborator.'
      }
    ],
    checklist: [
      { id: 'chk-1', text: 'Download Smart_Home_Energy.csv from Moodle to project workspace', category: 'setup', done: false },
      { id: 'chk-2', text: 'Create GitHub repository and add lecturer (miqbal@cct.ie) as collaborator', category: 'git', done: false },
      { id: 'chk-3', text: 'Commit initial project structure to GitHub (Commit 1)', category: 'git', done: false },
      { id: 'chk-4', text: 'Conduct initial data inspection (shape, info, describe, datatypes, missingness)', category: 'eda', done: false },
      { id: 'chk-5', text: 'Commit initial EDA inspection into GitHub (Commit 2)', category: 'git', done: false },
      { id: 'chk-6', text: 'Clean missing data (choose and document Drop vs Impute vs Flagging strategy)', category: 'cleaning', done: false },
      { id: 'chk-7', text: 'Detect and resolve duplicate observations with written justification', category: 'cleaning', done: false },
      { id: 'chk-8', text: 'Outlier detection using IQR / Boxplots on key energy variables', category: 'cleaning', done: false },
      { id: 'chk-9', text: 'Commit data cleaning and preparation steps to GitHub (Commit 3)', category: 'git', done: false },
      { id: 'chk-10', text: 'Feature Selection: Correlation heatmap and variance analysis to pick predictors', category: 'engineering', done: false },
      { id: 'chk-11', text: 'Generate 2-3 polished, publication-ready visualizations (labeled axes, titles, units)', category: 'eda', done: false },
      { id: 'chk-12', text: 'Commit completed Jupyter Notebook to GitHub (Commit 4)', category: 'git', done: false },
      { id: 'chk-13', text: 'Download official Poster template (Poster template (Landscape) blue.ppt)', category: 'poster', done: false },
      { id: 'chk-14', text: 'Draft Poster text (Introduction, Methods, Results, Conclusions, Harvard Refs)', category: 'poster', done: false },
      { id: 'chk-15', text: 'Check Poster word count: STRICTLY between 500 and 600 words', category: 'poster', done: false },
      { id: 'chk-16', text: 'Embed high-resolution EDA figures into Poster and check formatting', category: 'poster', done: false },
      { id: 'chk-17', text: 'Record walkthrough video (<= 3 min, face clearly visible)', category: 'video', done: false },
      { id: 'chk-18', text: 'Upload video to Google Drive and grant view access to miqbal@cct.ie', category: 'video', done: false },
      { id: 'chk-19', text: 'Final commit of Poster and updated README to GitHub (Commit 5+)', category: 'git', done: false },
      { id: 'chk-20', text: 'Submit individual files (Notebook, Poster PPT, Video Link & GitHub Link) on Moodle', category: 'submission', done: false }
    ],
    codeTemplates: {
      eda: "# --- 1. INITIAL INSPECTION ---\nimport pandas as pd\nimport numpy as np\nimport matplotlib.pyplot as plt\nimport seaborn as sns\n\nplt.style.use('seaborn-v0_8-whitegrid')\ndf = pd.read_csv('Smart_Home_Energy.csv')\n\nprint('Shape:', df.shape)\nprint('\\nData Types & Non-Null Counts:')\ndf.info()\n\nprint('\\nDescriptive Statistics:')\ndisplay(df.describe(include='all'))\n\nprint('\\nMissing Values Breakdown:')\nmissing = df.isnull().sum()\nprint(missing[missing > 0])\n\nprint('\\nDuplicate Count:', df.duplicated().sum())",
      cleaning: "# --- 2. DATA CLEANING & MISSING VALUES ---\n# Handling duplicates\ninitial_rows = len(df)\ndf = df.drop_duplicates()\nprint(f'Dropped {initial_rows - len(df)} duplicate records.')\n\n# Missing value strategy:\n# - For skewed numeric features: Impute with Median\n# - For symmetric numeric features: Impute with Mean\n# - For categorical features: Impute with Mode or 'Unknown'\n# - Optional: Add missingness indicator flag if missingness is informative\nfor col in df.select_dtypes(include=[np.number]).columns:\n    if df[col].isnull().sum() > 0:\n        # Flagging\n        df[f'{col}_was_missing'] = df[col].isnull().astype(int)\n        # Median imputation (robust to outliers)\n        median_val = df[col].median()\n        df[col] = df[col].fillna(median_val)\n        print(f'Imputed {col} with median: {median_val}')",
      outliers: "# --- 3. OUTLIER DETECTION (IQR METHOD) ---\ndef detect_outliers_iqr(series):\n    q1 = series.quantile(0.25)\n    q3 = series.quantile(0.75)\n    iqr = q3 - q1\n    lower_bound = q1 - 1.5 * iqr\n    upper_bound = q3 + 1.5 * iqr\n    outliers = series[(series < lower_bound) | (series > upper_bound)]\n    return lower_bound, upper_bound, len(outliers)\n\n# Example on target energy consumption\n# target_col = 'Energy_Consumption'\n# lb, ub, n_outliers = detect_outliers_iqr(df[target_col])\n# print(f'{target_col}: {n_outliers} outliers detected outside [{lb:.2f}, {ub:.2f}]')",
      featureSelection: "# --- 4. FEATURE SELECTION (CORRELATION & VARIANCE) ---\n# Correlation matrix with target\nnumeric_df = df.select_dtypes(include=[np.number])\nplt.figure(figsize=(10, 8))\nsns.heatmap(numeric_df.corr(), annot=True, cmap='coolwarm', fmt='.2f', linewidths=0.5)\nplt.title('Correlation Matrix for Feature Selection', fontsize=14, weight='bold')\nplt.tight_layout()\nplt.show()"
    }
  },
  weeks: [
    {
      weekNumber: 1,
      calendarDates: '14 Sep - 20 Sep 2026',
      lectureNumber: 'Module Introduction & Python Primer',
      title: 'Course Introduction & Python Fundamentals',
      badge: 'Completed',
      status: 'completed',
      summary: 'Overview of the Data Exploration & Preparation module, assessment structure (CA1 40%, CA2 60%), learning outcomes, and foundational Python programming syntax for data science.',
      topics: [
        'Module aims, assessment breakdown and weekly schedule',
        'Python syntax refresher: variables, dynamic typing, arithmetic & comparison operators',
        'Data structures: Lists, Tuples, Dictionaries and Sets',
        'Control flow: if / elif / else conditionals and for loops',
        'Jupyter Notebook interactive workflow'
      ],
      practicalHighlights: 'Setup of virtual environment and practice notebooks: Input/output, basic data types, lists/dicts, and conditional statements.',
      keyDocuments: [
        { name: 'Module Introduction - DEP.pdf', path: 'Docs/Week 1 - 14 September - 20 September/Module Introduction - DEP.pdf' },
        { name: 'Week1_Python_Tutorial.pdf', path: 'Docs/Week 1 - 14 September - 20 September/Week1_Python_Tutorial.pdf' }
      ],
      videoSlots: [
        { id: 'w1-v1', title: 'Class Session 1: Module Onboarding & Python Basics', time: 'Thursday 17:45 - 19:45', transcript: '' },
        { id: 'w1-v2', title: 'Class Session 2: Data Structures & Hands-on Coding', time: 'Thursday 20:00 - 22:00', transcript: '' }
      ]
    },
    {
      weekNumber: 2,
      calendarDates: '21 Sep - 27 Sep 2026',
      lectureNumber: 'Lecture 1: Introduction to DEP',
      title: 'Data Fundamentals, Taxonomy & Version Control',
      badge: 'Completed',
      status: 'completed',
      summary: 'Comprehensive foundation of Data Exploration & Preparation. Covers the philosophical and operational distinction between raw data and decision-grade information, the complete taxonomy of data types (Categorical vs Numerical) which dictates all statistical choices, data lifecycle governance, primary vs secondary data sourcing, and mandatory version control standards using Git and GitHub for CA1.',
      topics: [
        'Data vs Information: The DIKW hierarchy and transforming raw observations into business insight',
        'Tabular Dataset Anatomy: Observations (rows), Variables/Features (columns), and Tidy Data principles',
        'Data Taxonomy: Categorical (Nominal vs Ordinal) and Numerical (Discrete vs Continuous)',
        'Data Sourcing Trade-offs: Primary Data (first-hand) vs Secondary Data (pre-existing open/internal data)',
        'The What, Where, How Acquisition Framework: Business questions, authoritative sources, ingestion pipelines',
        'Ethics, GDPR & Licensing: Data minimization, anonymization of PII, and Creative Commons licensing',
        'The 7 Stages of Data Management & The 4 Quality Pillars (Accuracy, Completeness, Consistency, Validity)',
        'Version Control with Git & GitHub: Commits, staging, branches, and the mandatory 5-commit CA1 workflow'
      ],
      practicalHighlights: 'Analyzing historical birth statistics from arbuthnot.txt using pandas and matplotlib: data ingestion, column inspection, ratio calculations (Boy-to-Girl ratio trends), and temporal line plotting.',
      deepDive: {
        lectureTitle: 'Lecture 1: Introduction to Data Exploration & Preparation',
        lecturer: 'Dr. Muhammad Iqbal (CCT College Dublin)',
        slidesUrl: 'docs/Week%202%20-%2021%20September%20-%2027%20September/Lecture%201%20-%20Introduction%20to%20DEP.pdf',
        slidesName: 'Lecture 1 - Introduction to DEP.pdf',
        executiveSummary: 'Lecture 1 establishes the theoretical and methodological bedrock for the entire Data Exploration & Preparation module and the CA1 assessment. Every practical analytical choice in exploratory data analysis—such as choosing between a bar chart or a histogram, computing a mean versus a median, selecting imputation strategies for missing values, or encoding categorical variables—stems directly from the taxonomy of data types and the data management lifecycle formalized here.',
        sections: [
          {
            id: 'l1-s1',
            title: '1. Data vs. Information (The DIKW Hierarchy)',
            badge: 'Conceptual Core',
            badgeColor: 'blue',
            icon: '💡',
            content: 'Data in its raw form consists of individual observations, symbols, unorganized characters, or numeric readings that lack inherent meaning or operational context. When raw data is cleaned, structured, aggregated, and placed within a relevant business or domain context, it transforms into Information—which subsequently empowers Knowledge and Wisdom for decision-making.',
            comparison: {
              colA: {
                label: 'Raw Data (Unprocessed Observations)',
                items: [
                  '120, 95, 180, 240 (isolated, uncontextualized numbers)',
                  'No units, timestamps, or operational reference points',
                  'Cannot directly answer business or research hypotheses',
                  'Example: Raw register readings from an IoT smart energy meter'
                ]
              },
              colB: {
                label: 'Actionable Information (Context-Driven)',
                items: [
                  'Mean monthly household consumption = 149 kWh (+18% vs Dec baseline)',
                  'Enriched with temporal dimensions, currency units, and benchmarks',
                  'Directly guides peak-load grid shedding and customer tariff optimization',
                  'Example: Section 3 Results section of your CA1 academic poster'
                ]
              }
            },
            takeaway: 'In CA1, submitting raw counts or unformatted numbers is insufficient. You must synthesize raw data into interpreted information that addresses energy consumption patterns.'
          },
          {
            id: 'l1-s2',
            title: '2. Anatomy of a Tabular Dataset',
            badge: 'Dataset Structure',
            badgeColor: 'emerald',
            icon: '📐',
            content: 'Modern data analytics operates predominantly on two-dimensional tabular data representations where real-world systems are decomposed into two orthogonal mathematical dimensions:',
            points: [
              '<strong>Observations (Rows / Records / Instances / Cases):</strong> Each row represents a single distinct entity or experimental unit under study (e.g., a specific household meter reading at timestamp t, or a specific patient record). In tabular notation, N denotes the total number of observations.',
              '<strong>Variables (Columns / Attributes / Features / Dimensions):</strong> Each column captures a measurable property, characteristic, or quantity that can vary across different observations (e.g., Household_ID, Energy_Consumption, Outside_Temperature, HVAC_Usage). In notation, p denotes the number of features.',
              '<strong>Tidy Data Principle (Hadley Wickham):</strong> 1) Each variable must have its own column; 2) Each observation must have its own row; 3) Each value must have its own cell. Messy datasets (e.g., multiple variables packed into one header) must be reshaped into tidy structure during preparation.'
            ]
          },
          {
            id: 'l1-s3',
            title: '3. Complete Taxonomy of Data Types (Crucial for CA1 EDA & Cleaning)',
            badge: 'Fundamental Competency',
            badgeColor: 'amber',
            icon: '🏷️',
            content: 'Every feature in your dataset belongs to a specific mathematical family. Misclassifying data types produces catastrophic analytical errors: computing averages on postal codes, generating line plots on unordered labels, or picking invalid machine learning encoders.',
            taxonomyTable: [
              {
                category: 'Categorical (Qualitative)',
                subType: 'Nominal',
                definition: 'Discrete labels, names, or categories with NO natural mathematical order or rank. Values represent distinct qualitative groups.',
                examples: 'Irish Counties [Dublin, Cork, Galway], Device Types [AC, Fridge, Heat Pump], Customer Churn [Yes, No], Gender',
                allowableOps: 'Frequency counts, Mode, Percentage distributions, Chi-Square contingency tests',
                viz: 'Bar Chart (Countplot), Pie Chart (<= 5 categories)',
                ca1Application: 'For nominal energy variables, use value_counts() and Bar Charts. NEVER calculate mean or standard deviation on nominal labels!'
              },
              {
                category: 'Categorical (Qualitative)',
                subType: 'Ordinal',
                definition: 'Categories possessing an unambiguous NATURAL ORDER or hierarchical ranking. However, the numeric distances between adjacent ranks are NOT quantifiable or uniform.',
                examples: 'Customer Satisfaction [Low < Medium < High], Energy Rating [A < B < C < D < E], Education Level [BSc < MSc < PhD], Likert Scales',
                allowableOps: 'Median, Mode, Percentiles, Rank-Order Correlation (Spearman rho, Kendall tau), Non-parametric tests',
                viz: 'Ordered Bar Chart, Stacked Frequency Bar Plot',
                ca1Application: 'Preserve natural ranking sequence during visualization. When encoding, use Ordinal Encoding rather than unordered One-Hot Encoding.'
              },
              {
                category: 'Numerical (Quantitative)',
                subType: 'Discrete',
                definition: 'Countable numerical values obtained through counting. Takes distinct whole integer steps (0, 1, 2, ...); cannot take intermediate fractional values.',
                examples: 'Number of household occupants, Count of energy consumption spikes per day, Number of connected smart devices',
                allowableOps: 'Mean, Median, Mode, Variance, Standard Deviation, Poisson and Negative Binomial modeling',
                viz: 'Discrete Histogram, Frequency Bar Plot, Step Plot',
                ca1Application: 'Verify that counts are non-negative and integer-valued. Investigate zero-inflation (excessive zeros) during cleaning.'
              },
              {
                category: 'Numerical (Quantitative)',
                subType: 'Continuous',
                definition: 'Measurable numerical values along an unbroken continuum. Can take any real value (fractions, decimals) within a defined range, limited only by measurement precision.',
                examples: 'Energy Consumption (kWh: 3.425), Grid Voltage (V: 230.15), Ambient Temperature (°C: 18.72), Household Income (€)',
                allowableOps: 'Mean, Median, Standard Deviation, IQR, Skewness, Kurtosis, Pearson correlation, Parametric statistical tests',
                viz: 'Histogram with KDE curve, Boxplot, Violin Plot, Scatter Plot (Continuous vs Continuous)',
                ca1Application: 'Primary target for IQR outlier detection, skewness assessment, and Median (if skewed) vs Mean (if symmetric) imputation.'
              }
            ]
          },
          {
            id: 'l1-s4',
            title: '4. Primary vs. Secondary Data Acquisition',
            badge: 'Data Sourcing Strategy',
            badgeColor: 'purple',
            icon: '🌐',
            content: 'Data acquisition is the genesis of every data project. Deciding whether to capture raw primary data or exploit existing secondary repositories carries major tradeoffs in time, budget, data quality, and provenance transparency:',
            comparison: {
              colA: {
                label: 'Primary Data (First-Hand Collection)',
                items: [
                  '<strong>Definition:</strong> Data collected directly by the researcher/analyst for the specific analytical problem at hand.',
                  '<strong>Methods:</strong> Field surveys, IoT hardware sensors, controlled A/B testing, user interviews, scientific laboratory experiments.',
                  '<strong>Advantages:</strong> Tailored directly to the research hypothesis; high control over sampling design; known provenance and collection methods; maximum freshness.',
                  '<strong>Disadvantages:</strong> Highly resource-intensive; expensive logistics and hardware; time-consuming; potential researcher sampling bias.'
                ]
              },
              colB: {
                label: 'Secondary Data (Reused Existing Data)',
                items: [
                  '<strong>Definition:</strong> Pre-existing data originally collected by third-party institutions, governments, or enterprises for other purposes.',
                  '<strong>Sources:</strong> Central Statistics Office (cso.ie), data.gov.ie, Eurostat, World Bank, Kaggle, corporate ERP/CRM databases.',
                  '<strong>Advantages:</strong> Instant accessibility; low or zero financial cost; longitudinal historical coverage; massive population scale.',
                  '<strong>Disadvantages:</strong> Possible variable mismatch; outdated records; schema inconsistencies; unknown collection bias or unrecorded missingness mechanisms.'
                ]
              }
            },
            takeaway: 'In CA1, Smart_Home_Energy.csv is secondary data. Your academic poster must critically evaluate the quality, completeness, and potential limitations of this secondary dataset.'
          },
          {
            id: 'l1-s5',
            title: '5. The "What, Where, How" Acquisition Framework & Ethical Compliance',
            badge: 'Methodological Framework',
            badgeColor: 'blue',
            icon: '🔍',
            content: 'Before executing any code or querying databases, professional data analysts follow the structured "What, Where, How" framework while adhering to legal and ethical mandates:',
            frameworkSteps: [
              {
                step: 'WHAT Data is Needed?',
                desc: 'Strictly dictated by the Business Problem or Research Question. Define target metrics, unit of analysis (hourly vs daily), target features, and required temporal span. Avoid hoarding unneeded variables (Data Minimisation principle).'
              },
              {
                step: 'WHERE Does it Reside?',
                desc: 'Identify authoritative and legitimate data repositories: Internal relational databases (PostgreSQL, Snowflake), RESTful APIs, Government Open Data Portals (data.gov.ie), or IoT sensor data lakes.'
              },
              {
                step: 'HOW Will it be Ingested?',
                desc: 'Determine technical pipelines: Batch flat-file downloads (CSV, Parquet), programmatic API requests with rate limiting, or automated web scraping (strictly complying with robots.txt and website terms of service).'
              }
            ],
            complianceChecklist: [
              '<strong>GDPR & Data Privacy (Regulation EU 2016/679):</strong> Enforce strict data minimization. Any Personally Identifiable Information (PII) such as personal names, exact GPS coordinates, or IP addresses must be pseudorandomly hashed, aggregated, or expunged prior to analysis.',
              '<strong>Licensing & Copyright Compliance:</strong> Always audit data usage rights. Verify whether data is licensed under Creative Commons (CC-BY, CC0), Open Data Commons, or proprietary commercial contracts that prohibit third-party publication.',
              '<strong>Ethical Bias & Algorithmic Fairness:</strong> Screen for historical and demographic sampling biases. If training smart energy or predictive models, verify whether vulnerable low-income households or specific climate zones are under-represented.'
            ]
          },
          {
            id: 'l1-s6',
            title: '6. The 7-Stage Data Management Lifecycle & The 4 Quality Pillars',
            badge: 'Data Governance',
            badgeColor: 'emerald',
            icon: '🔄',
            content: 'Data is a living corporate asset that progresses through a continuous 7-stage lifecycle. Throughout this cycle, analysts must uphold the 4 Pillars of Data Quality:',
            lifecycleStages: [
              '1. Collect (Ingestion & Capture)',
              '2. Store (Secure persistence & warehousing)',
              '3. Clean & Organize (Normalization, deduplication, schema validation)',
              '4. Maintain (Version tracking & data drift monitoring)',
              '5. Analyze (Exploratory data analysis & statistical modeling)',
              '6. Share (Reporting, dashboards, and academic poster dissemination)',
              '7. Archive (Long-term retention or GDPR-compliant secure purging)'
            ],
            qualityPillars: [
              {
                title: 'Accuracy',
                desc: 'Data values must truthfully and reliably reflect the real-world phenomena they represent, free from systemic measurement bias or recording sensor errors.'
              },
              {
                title: 'Completeness',
                desc: 'All necessary observational records and required feature attributes must be present, with unobserved values systematically audited using MCAR/MAR diagnostics.'
              },
              {
                title: 'Consistency',
                desc: 'Data representations must be harmonized across all records and tables: standard datetime formats (ISO 8601: YYYY-MM-DD), uniform measurement units (kWh vs Wh), and uniform categorical naming.'
              },
              {
                title: 'Validity',
                desc: 'Values must conform strictly to defined business rules, valid ranges, and allowed data types (e.g., negative energy consumption or ages > 120 must be flagged and handled).'
              }
            ],
            takeaway: 'In CA1, your Jupyter Notebook must explicitly audit and demonstrate remediation across all four quality pillars before proceeding to visualization and feature selection.'
          },
          {
            id: 'l1-s7',
            title: '7. Version Control with Git & GitHub (CA1 Mandatory Deliverable)',
            badge: 'Engineering Standard',
            badgeColor: 'rose',
            icon: '🐙',
            content: 'Version control is the bedrock of reproducible data science. It eliminates disastrous filename sprawl (e.g., "final_v2_really_done.ipynb") and provides an immutable cryptographic audit log of analytical exploration:',
            gitConcepts: [
              '<strong>Repository (Repo):</strong> The centralized directory tracking all project files, history, branches, and configuration.',
              '<strong>Staging Area (git add):</strong> The deliberate staging zone where specific incremental modifications are reviewed before committing.',
              '<strong>Commit (git commit -m "..."):</strong> A permanent snapshot of your project state accompanied by a descriptive, professional message explaining the analytical rationale.',
              '<strong>Remote Synchronization (git push/pull):</strong> Mirroring local development to a hosted cloud repository (GitHub) for collaboration and assessment grading.'
            ],
            ca1GitStrategy: '<strong>CCT CA1 Rubric Requirement:</strong> You must maintain a public or lecturer-shared GitHub repository with a <strong>minimum of 5 chronological commits</strong> reflecting genuine milestone progression:<br/>' +
              '• <em>Commit 1:</em> Repository initialization, README structure, and data directory setup.<br/>' +
              '• <em>Commit 2:</em> Initial dataset inspection, shape, info, and summary statistics.<br/>' +
              '• <em>Commit 3:</em> Missing value imputation, duplicate removal, and outlier detection.<br/>' +
              '• <em>Commit 4:</em> Feature selection heatmap, correlation analysis, and polished visual figures.<br/>' +
              '• <em>Commit 5+:</em> Final Jupyter Notebook documentation and Academic Poster presentation.'
          }
        ]
      },
      keyDocuments: [
        { name: 'Lecture 1 - Introduction to DEP.pdf', path: 'Docs/Week 2 - 21 September - 27 September/Lecture 1 - Introduction to DEP.pdf' },
        { name: 'Week_2_Practical.ipynb', path: 'Docs/Week 2 - 21 September - 27 September/Week_2_Practical.ipynb' }
      ],
      videoSlots: [
        { id: 'w2-v1', title: 'Class Session 1: Data Definitions & Taxonomy', time: 'Thursday 17:45 - 19:45', transcript: '' },
        { id: 'w2-v2', title: 'Class Session 2: Git Fundamentals & Arbuthnot Lab', time: 'Thursday 20:00 - 22:00', transcript: '' }
      ]
    },
    {
      weekNumber: 3,
      calendarDates: '28 Sep - 04 Oct 2026',
      lectureNumber: 'Lecture 2: Data Management & EDA',
      title: 'Data Lifecycle, Data Dictionaries & Ethics/GDPR',
      badge: 'Completed',
      status: 'completed',
      summary: 'Data management cycle (Collect -> Store -> Clean -> Transform -> Analyze -> Report -> Archive). Data dictionaries and consistency. Legal & ethical requirements (GDPR, EU AI Act), univariate vs multivariate statistical analysis.',
      topics: [
        'Data consistency: dates formats, unit mismatches, typos, and duplicate records',
        'Data Dictionary architecture: variable name, description, type, allowed values, examples',
        'GDPR core principles: Lawfulness, purpose limitation, data minimisation, accuracy, storage limitation',
        'Ethics in AI & EU AI Act: Risk tiers (unacceptable, high risk, generative AI disclosure)',
        'Descriptive statistics: Central tendency (mean, median, mode) and dispersion (std dev, variance, IQR)',
        'Univariate vs Bivariate vs Multivariate exploration'
      ],
      practicalHighlights: 'Class practical with college_enrolment.csv and introduction to Titanic dataset; grouping statistics and identifying anomalies.',
      keyDocuments: [
        { name: 'Lecture 2 - Data Management and EDA.pdf', path: 'Docs/Week 3 - 28 September - 4 October/Lecture 2 - Data Management and EDA.pdf' },
        { name: 'Legal, Ethical and Regulatory Constraints.pptx', path: 'Docs/Week 3 - 28 September - 4 October/Legal, Ethical and Regulatory Constraints.pptx' }
      ],
      videoSlots: [
        { id: 'w3-v1', title: 'Class Session 1: Data Lifecycle & Regulatory Frameworks', time: 'Thursday 17:45 - 19:45', transcript: '' },
        { id: 'w3-v2', title: 'Class Session 2: Statistical Summaries & Data Dictionaries', time: 'Thursday 20:00 - 22:00', transcript: '' }
      ]
    },
    {
      weekNumber: 4,
      calendarDates: '05 Oct - 11 Oct 2026',
      lectureNumber: 'Lecture 3: Exploratory Data Analysis',
      title: 'Deep Dive into EDA & Methodologies (CRISP-DM vs SEMMA)',
      badge: 'Completed',
      status: 'completed',
      summary: 'Methodological frameworks for data science projects. Detailed comparison of CRISP-DM (business focused) and SEMMA (technical modeling focused). Advanced plotting with pandas, matplotlib, and seaborn.',
      topics: [
        'CRISP-DM 6 phases: Business Understanding, Data Understanding, Data Preparation, Modeling, Evaluation, Deployment',
        'SEMMA 5 phases: Sample, Explore, Modify, Model, Assess',
        'Choosing an analytical framework: Why CRISP-DM fits business problem framing',
        'Visual techniques: Histograms (distributions), Box plots (outliers), Scatter plots (relationships), Heatmaps (correlation)',
        'Data understanding applied to the Titanic survival problem'
      ],
      practicalHighlights: 'Week 4 Titanic Practical with Seaborn: correlation heatmaps, facet grids, survival rate breakdowns by class and sex.',
      keyDocuments: [
        { name: 'Lecture 3 - EDA.pdf', path: 'Docs/Week 4 - 5 October - 11 October/Lecture 3 - EDA.pdf' },
        { name: 'Data Dictionary - titanic.pdf', path: 'Docs/Week 4 - 5 October - 11 October/titanic dataset and data dictionary/Data Dictionary - titanic.pdf' },
        { name: 'Week_4_Class_Practical.ipynb', path: 'Docs/Week 4 - 5 October - 11 October/Classwork/Week_4_Class_Practical.ipynb' }
      ],
      videoSlots: [
        { id: 'w4-v1', title: 'Class Session 1: CRISP-DM Framework & EDA Foundations', time: 'Thursday 08 Oct 17:45', transcript: 'Audio recording present in workspace (17_44_32.mp4)' },
        { id: 'w4-v2', title: 'Class Session 2: Seaborn Visualizations & Heatmaps', time: 'Thursday 08 Oct 20:00', transcript: 'Audio recording present in workspace (20_00_03.mp4)' }
      ]
    },
    {
      weekNumber: 5,
      calendarDates: '12 Oct - 18 Oct 2026',
      lectureNumber: 'Lecture 4: Data Cleaning & Preprocessing',
      title: 'Systematic Data Cleaning, Missing Data & Poster Strategy',
      badge: 'Current Week',
      status: 'active',
      summary: 'Garbage In -> Garbage Out. Strategies for missing data: dropping vs constant imputation vs mean/median/mode vs flagging indicators. Legacy data anomalies. Setting up GitHub Desktop and analyzing the Sample Academic Poster.',
      topics: [
        'The cleaning cycle: Inspect -> Identify -> Clean -> Transform -> Validate -> Document',
        'Missing data strategies: df.dropna() risks vs df.fillna(mean/median/mode)',
        'When to use Median (skewed / outliers) vs Mean (normal distribution) vs Mode (categorical)',
        'Missingness flags: Preserving information when missingness itself has predictive power',
        'Real-world dirty data examples: truncated zip codes, negative incomes, numeric codes in text fields',
        'GitHub Desktop installation and repository collaboration workflow',
        'Anatomy of an academic poster: 500-600 words strictly, clear methods, 1-3 charts, Harvard referencing'
      ],
      practicalHighlights: 'Palmer Penguins cleaning notebook (Week5_practical_penguins.zip): handling missing measurements, island categories, sex imputation.',
      keyDocuments: [
        { name: 'Lecture 4 - Data Cleaning.pdf', path: 'Docs/Week 5 - 12 October - 18 October/Lecture 4 - Data Cleaning.pdf' },
        { name: 'Data Cleaning - Example.pdf', path: 'Docs/Week 5 - 12 October - 18 October/Data Cleaning - Example.pdf' },
        { name: 'Tutorial_GitHub_Desktop_Installation.pdf', path: 'Docs/Week 5 - 12 October - 18 October/Tutorial_GitHub_Desktop_Installation.pdf' },
        { name: 'Sample_Poster.pdf', path: 'Docs/Week 5 - 12 October - 18 October/Sample_Poster.pdf' }
      ],
      videoSlots: [
        { id: 'w5-v1', title: 'Class Session 1: Missing Data Imputation & Outlier Theory', time: 'Thursday 15 Oct 17:45', transcript: '' },
        { id: 'w5-v2', title: 'Class Session 2: GitHub Desktop Setup & Poster Rubric Discussion', time: 'Thursday 15 Oct 20:00', transcript: '' }
      ]
    },
    {
      weekNumber: 6,
      calendarDates: '19 Oct - 25 Oct 2026',
      lectureNumber: 'Lecture 5 (Upcoming)',
      title: 'Feature Selection, Duplicates & Malformed Data',
      badge: 'Starts Tomorrow',
      status: 'upcoming',
      summary: 'Techniques for identifying and selecting informative features, eliminating duplicate rows, and sanitizing malformed numerical, categorical, and text-based fields.',
      topics: [
        'Detecting exact vs partial duplicates (subset matching)',
        'Feature selection strategies: filter methods, correlation thresholds, variance thresholding',
        'Dealing with malformed string and numeric data (strip whitespace, regex parsing)',
        'CA1 Progress Review and Poster drafting checkpoint'
      ],
      practicalHighlights: 'Implementing automated deduplication and feature filtering in Jupyter.',
      keyDocuments: [],
      videoSlots: [
        { id: 'w6-v1', title: 'Class Session 1: Feature Selection & Deduplication', time: 'Thursday 22 Oct 17:45', transcript: '' },
        { id: 'w6-v2', title: 'Class Session 2: CA1 Working Session & Q&A', time: 'Thursday 22 Oct 20:00', transcript: '' }
      ]
    },
    {
      weekNumber: 7,
      calendarDates: '26 Oct - 01 Nov 2026',
      lectureNumber: 'Reading Week & CA1 Submission',
      title: 'Reading Week & Final CA1 Deadline',
      badge: 'CA1 Due Nov 1',
      status: 'milestone',
      summary: 'Designated reading week for focused independent study, final consolidation, poster printing/formatting, video screencast recording, and official CA1 submission by Sunday, 1st November at 23:59.',
      topics: [
        'Self-directed review of all data cleaning and preparation pipelines',
        'Poster final review: exactly 500-600 words, Harvard references',
        'Video recording: 3-minute limit, face visibility check, Google Drive permission check',
        'GitHub repository audit: ensure minimum 5 commits are pushed'
      ],
      practicalHighlights: 'Final verification of Jupyter Notebook code and Moodle submission without ZIP packaging.',
      keyDocuments: [
        { name: 'CA1 - 40% - L7 (1).docx', path: 'Docs/Assessments/CA1 - 40% - L7 (1).docx' },
        { name: 'Poster template (Landscape) blue.ppt', path: 'Docs/Assessments/Poster template (Landscape) blue.ppt' }
      ],
      videoSlots: [
        { id: 'w7-v1', title: 'Office Hours & Q&A Support', time: 'By appointment / Moodle forum', transcript: '' }
      ]
    },
    {
      weekNumber: 8,
      calendarDates: '02 Nov - 08 Nov 2026',
      lectureNumber: 'Lecture 6',
      title: 'Feature Engineering: Discretization & Binning',
      badge: 'Semester Part 2',
      status: 'upcoming',
      summary: 'Transforming continuous variables into categorical intervals (equal width, equal frequency, and decision-tree binning) to improve model robustness.',
      topics: ['Equal-width interval binning', 'Equal-frequency quantile binning', 'Supervised decision tree discretization'],
      practicalHighlights: 'Using pd.cut() and pd.qcut() on continuous attributes.',
      keyDocuments: [],
      videoSlots: []
    },
    {
      weekNumber: 9,
      calendarDates: '09 Nov - 15 Nov 2026',
      lectureNumber: 'Lecture 7',
      title: 'Feature Engineering: Categorical Encoding',
      badge: 'Upcoming',
      status: 'upcoming',
      summary: 'Translating qualitative labels into machine-readable numerical matrices. Comparing One-Hot Encoding, Ordinal Encoding, Count/Frequency Encoding.',
      topics: ['One-Hot Encoding and dummy variable trap', 'Ordinal & label encoding', 'Frequency & target encoding'],
      practicalHighlights: 'pd.get_dummies() vs OneHotEncoder in Scikit-Learn.',
      keyDocuments: [],
      videoSlots: []
    },
    {
      weekNumber: 10,
      calendarDates: '16 Nov - 22 Nov 2026',
      lectureNumber: 'Lecture 8',
      title: 'Feature Engineering: Feature Scaling & Normalization',
      badge: 'Upcoming',
      status: 'upcoming',
      summary: 'Bringing variables to a common magnitude to prevent large features from dominating algorithms: Min-Max Scaling, Standardisation (Z-score), and L2 Normalisation.',
      topics: ['Min-Max Scaling [0, 1]', 'Z-Score Standardization (mean=0, std=1)', 'L2 Normalization for distance metrics'],
      practicalHighlights: 'Applying StandardScaler and MinMaxScaler from sklearn.preprocessing.',
      keyDocuments: [],
      videoSlots: []
    },
    {
      weekNumber: 11,
      calendarDates: '23 Nov - 29 Nov 2026',
      lectureNumber: 'Lecture 9',
      title: 'Curse of Dimensionality & Dimensionality Reduction (PCA & LDA)',
      badge: 'Upcoming',
      status: 'upcoming',
      summary: 'Why high-dimensional data degrades algorithmic performance. Unsupervised dimensionality reduction with Principal Component Analysis (PCA) and supervised Linear Discriminant Analysis (LDA).',
      topics: ['The Curse of Dimensionality explained', 'Eigenvalues, eigenvectors, and variance explained in PCA', 'Linear Discriminant Analysis (LDA) principles'],
      practicalHighlights: 'Fitting PCA on multi-feature datasets and plotting scree plots.',
      keyDocuments: [],
      videoSlots: []
    },
    {
      weekNumber: 12,
      calendarDates: '30 Nov - 06 Dec 2026',
      lectureNumber: 'Lecture 10',
      title: 'Feature Creation, Extraction & Aggregations',
      badge: 'Upcoming',
      status: 'upcoming',
      summary: 'Creating new domain-specific predictive features through aggregations, mathematical transformations (log, square root, polynomial interactions), and temporal date/time extraction.',
      topics: ['Extracting temporal features (day of week, hour, season)', 'Domain-specific ratios and aggregations', 'Non-linear transformations (log transform for right-skewed data)'],
      practicalHighlights: 'Constructing feature interaction terms and datetime attributes.',
      keyDocuments: [],
      videoSlots: []
    },
    {
      weekNumber: 13,
      calendarDates: '07 Dec - 13 Dec 2026',
      lectureNumber: 'Lecture 11 & Semester Review',
      title: 'Comprehensive Review, CA2 Preparation & Open Q&A',
      badge: 'Final Week',
      status: 'upcoming',
      summary: 'Consolidation of the entire data exploration and preparation pipeline, final preparations for Continuous Assessment 2 (60%), and module retrospective.',
      topics: ['Full pipeline recap from raw ingestion to model-ready features', 'CA2 briefing (60% weight, MLO1, MLO5, MLO6)', 'Final Q&A and grading guidelines'],
      practicalHighlights: 'End-to-end automated pipeline walkthrough.',
      keyDocuments: [],
      videoSlots: []
    }
  ],
  courseFiles: [
  {
    "name": "Basic data types and variables.ipynb",
    "rel": "Week 1 - 14 September - 20 September\\Basic data types and variables.ipynb",
    "url": "docs/Week%201%20-%2014%20September%20-%2020%20September%5CBasic%20data%20types%20and%20variables.ipynb",
    "size_kb": 164.3,
    "ext": ".ipynb",
    "tag": "Jupyter Notebook",
    "week_tag": "Week 1"
  },
  {
    "name": "Conditional statement.ipynb",
    "rel": "Week 1 - 14 September - 20 September\\Conditional statement.ipynb",
    "url": "docs/Week%201%20-%2014%20September%20-%2020%20September%5CConditional%20statement.ipynb",
    "size_kb": 230.4,
    "ext": ".ipynb",
    "tag": "Jupyter Notebook",
    "week_tag": "Week 1"
  },
  {
    "name": "Input, output, operator, and expression.ipynb",
    "rel": "Week 1 - 14 September - 20 September\\Input, output, operator, and expression.ipynb",
    "url": "docs/Week%201%20-%2014%20September%20-%2020%20September%5CInput%2C%20output%2C%20operator%2C%20and%20expression.ipynb",
    "size_kb": 10.3,
    "ext": ".ipynb",
    "tag": "Jupyter Notebook",
    "week_tag": "Week 1"
  },
  {
    "name": "Lists, tuples, and dictionary.ipynb",
    "rel": "Week 1 - 14 September - 20 September\\Lists, tuples, and dictionary.ipynb",
    "url": "docs/Week%201%20-%2014%20September%20-%2020%20September%5CLists%2C%20tuples%2C%20and%20dictionary.ipynb",
    "size_kb": 14.4,
    "ext": ".ipynb",
    "tag": "Jupyter Notebook",
    "week_tag": "Week 1"
  },
  {
    "name": "Module Introduction - DEP.pdf",
    "rel": "Week 1 - 14 September - 20 September\\Module Introduction - DEP.pdf",
    "url": "docs/Week%201%20-%2014%20September%20-%2020%20September%5CModule%20Introduction%20-%20DEP.pdf",
    "size_kb": 363.2,
    "ext": ".pdf",
    "tag": "PDF Document",
    "week_tag": "Week 1"
  },
  {
    "name": "Week1_Python_Tutorial.docx",
    "rel": "Week 1 - 14 September - 20 September\\Week1_Python_Tutorial.docx",
    "url": "docs/Week%201%20-%2014%20September%20-%2020%20September%5CWeek1_Python_Tutorial.docx",
    "size_kb": 33.9,
    "ext": ".docx",
    "tag": "Word Document",
    "week_tag": "Week 1"
  },
  {
    "name": "Week1_Python_Tutorial.pdf",
    "rel": "Week 1 - 14 September - 20 September\\Week1_Python_Tutorial.pdf",
    "url": "docs/Week%201%20-%2014%20September%20-%2020%20September%5CWeek1_Python_Tutorial.pdf",
    "size_kb": 246.1,
    "ext": ".pdf",
    "tag": "PDF Document",
    "week_tag": "Week 1"
  },
  {
    "name": "Week1_Python_Tutorial_Solutions.docx",
    "rel": "Week 1 - 14 September - 20 September\\Week1_Python_Tutorial_Solutions.docx",
    "url": "docs/Week%201%20-%2014%20September%20-%2020%20September%5CWeek1_Python_Tutorial_Solutions.docx",
    "size_kb": 33.6,
    "ext": ".docx",
    "tag": "Word Document",
    "week_tag": "Week 1"
  },
  {
    "name": "Week_1_DEP.ipynb",
    "rel": "Week 1 - 14 September - 20 September\\Week_1_DEP.ipynb",
    "url": "docs/Week%201%20-%2014%20September%20-%2020%20September%5CWeek_1_DEP.ipynb",
    "size_kb": 29.2,
    "ext": ".ipynb",
    "tag": "Jupyter Notebook",
    "week_tag": "Week 1"
  },
  {
    "name": "Lecture 1 - Introduction to DEP.pdf",
    "rel": "Week 2 - 21 September - 27 September\\Lecture 1 - Introduction to DEP.pdf",
    "url": "docs/Week%202%20-%2021%20September%20-%2027%20September%5CLecture%201%20-%20Introduction%20to%20DEP.pdf",
    "size_kb": 409.6,
    "ext": ".pdf",
    "tag": "PDF Document",
    "week_tag": "Week 2"
  },
  {
    "name": "Lecture 1 - Introduction to DEP.pptx",
    "rel": "Week 2 - 21 September - 27 September\\Lecture 1 - Introduction to DEP.pptx",
    "url": "docs/Week%202%20-%2021%20September%20-%2027%20September%5CLecture%201%20-%20Introduction%20to%20DEP.pptx",
    "size_kb": 1492.8,
    "ext": ".pptx",
    "tag": "PowerPoint",
    "week_tag": "Week 2"
  },
  {
    "name": "Tutorial_1.zip",
    "rel": "Week 2 - 21 September - 27 September\\Tutorial_1.zip",
    "url": "docs/Week%202%20-%2021%20September%20-%2027%20September%5CTutorial_1.zip",
    "size_kb": 187.0,
    "ext": ".zip",
    "tag": "Archive (ZIP)",
    "week_tag": "Week 2"
  },
  {
    "name": "Week_2_Practical.ipynb",
    "rel": "Week 2 - 21 September - 27 September\\Week_2_Practical.ipynb",
    "url": "docs/Week%202%20-%2021%20September%20-%2027%20September%5CWeek_2_Practical.ipynb",
    "size_kb": 13.9,
    "ext": ".ipynb",
    "tag": "Jupyter Notebook",
    "week_tag": "Week 2"
  },
  {
    "name": "arbuthnot.txt",
    "rel": "Week 2 - 21 September - 27 September\\Database\\arbuthnot.txt",
    "url": "docs/Week%202%20-%2021%20September%20-%2027%20September%5CDatabase%5Carbuthnot.txt",
    "size_kb": 1.3,
    "ext": ".txt",
    "tag": "Dataset",
    "week_tag": "Week 2"
  },
  {
    "name": "Lecture 2 - Data Management and EDA.pdf",
    "rel": "Week 3 - 28 September - 4 October\\Lecture 2 - Data Management and EDA.pdf",
    "url": "docs/Week%203%20-%2028%20September%20-%204%20October%5CLecture%202%20-%20Data%20Management%20and%20EDA.pdf",
    "size_kb": 625.1,
    "ext": ".pdf",
    "tag": "PDF Document",
    "week_tag": "Week 3"
  },
  {
    "name": "Lecture 2 - Data Management and EDA.pptx",
    "rel": "Week 3 - 28 September - 4 October\\Lecture 2 - Data Management and EDA.pptx",
    "url": "docs/Week%203%20-%2028%20September%20-%204%20October%5CLecture%202%20-%20Data%20Management%20and%20EDA.pptx",
    "size_kb": 368.5,
    "ext": ".pptx",
    "tag": "PowerPoint",
    "week_tag": "Week 3"
  },
  {
    "name": "Legal, Ethical and Regulatory Constraints.pptx",
    "rel": "Week 3 - 28 September - 4 October\\Legal, Ethical and Regulatory Constraints.pptx",
    "url": "docs/Week%203%20-%2028%20September%20-%204%20October%5CLegal%2C%20Ethical%20and%20Regulatory%20Constraints.pptx",
    "size_kb": 659.1,
    "ext": ".pptx",
    "tag": "PowerPoint",
    "week_tag": "Week 3"
  },
  {
    "name": "Week_3_DM_EDA.zip",
    "rel": "Week 3 - 28 September - 4 October\\Week_3_DM_EDA.zip",
    "url": "docs/Week%203%20-%2028%20September%20-%204%20October%5CWeek_3_DM_EDA.zip",
    "size_kb": 639.7,
    "ext": ".zip",
    "tag": "Archive (ZIP)",
    "week_tag": "Week 3"
  },
  {
    "name": "college_enrolment.csv",
    "rel": "Week 3 - 28 September - 4 October\\Databases\\college_enrolment.csv",
    "url": "docs/Week%203%20-%2028%20September%20-%204%20October%5CDatabases%5Ccollege_enrolment.csv",
    "size_kb": 44.7,
    "ext": ".csv",
    "tag": "Dataset",
    "week_tag": "Week 3"
  },
  {
    "name": "titanic.csv",
    "rel": "Week 3 - 28 September - 4 October\\Databases\\titanic.csv",
    "url": "docs/Week%203%20-%2028%20September%20-%204%20October%5CDatabases%5Ctitanic.csv",
    "size_kb": 59.8,
    "ext": ".csv",
    "tag": "Dataset",
    "week_tag": "Week 3"
  },
  {
    "name": "Week_3_Practical.ipynb",
    "rel": "Week 3 - 28 September - 4 October\\Classwork\\Week_3_Practical.ipynb",
    "url": "docs/Week%203%20-%2028%20September%20-%204%20October%5CClasswork%5CWeek_3_Practical.ipynb",
    "size_kb": 403.3,
    "ext": ".ipynb",
    "tag": "Jupyter Notebook",
    "week_tag": "Week 3"
  },
  {
    "name": "college_enrolment (1).csv",
    "rel": "Week 3 - 28 September - 4 October\\Classwork\\college_enrolment (1).csv",
    "url": "docs/Week%203%20-%2028%20September%20-%204%20October%5CClasswork%5Ccollege_enrolment%20%281%29.csv",
    "size_kb": 44.7,
    "ext": ".csv",
    "tag": "Dataset",
    "week_tag": "Week 3"
  },
  {
    "name": "Lecture 3 - EDA.pdf",
    "rel": "Week 4 - 5 October - 11 October\\Lecture 3 - EDA.pdf",
    "url": "docs/Week%204%20-%205%20October%20-%2011%20October%5CLecture%203%20-%20EDA.pdf",
    "size_kb": 468.1,
    "ext": ".pdf",
    "tag": "PDF Document",
    "week_tag": "Week 4"
  },
  {
    "name": "Lecture 3 - EDA.pptx",
    "rel": "Week 4 - 5 October - 11 October\\Lecture 3 - EDA.pptx",
    "url": "docs/Week%204%20-%205%20October%20-%2011%20October%5CLecture%203%20-%20EDA.pptx",
    "size_kb": 215.0,
    "ext": ".pptx",
    "tag": "PowerPoint",
    "week_tag": "Week 4"
  },
  {
    "name": "Plotting with pandas and seaborn using data.docx",
    "rel": "Week 4 - 5 October - 11 October\\Plotting with pandas and seaborn using data.docx",
    "url": "docs/Week%204%20-%205%20October%20-%2011%20October%5CPlotting%20with%20pandas%20and%20seaborn%20using%20data.docx",
    "size_kb": 702.4,
    "ext": ".docx",
    "tag": "Word Document",
    "week_tag": "Week 4"
  },
  {
    "name": "Week4_practical_titanic.zip",
    "rel": "Week 4 - 5 October - 11 October\\Week4_practical_titanic.zip",
    "url": "docs/Week%204%20-%205%20October%20-%2011%20October%5CWeek4_practical_titanic.zip",
    "size_kb": 615.5,
    "ext": ".zip",
    "tag": "Archive (ZIP)",
    "week_tag": "Week 4"
  },
  {
    "name": "titanic (2).csv",
    "rel": "Week 4 - 5 October - 11 October\\titanic (2).csv",
    "url": "docs/Week%204%20-%205%20October%20-%2011%20October%5Ctitanic%20%282%29.csv",
    "size_kb": 59.8,
    "ext": ".csv",
    "tag": "Dataset",
    "week_tag": "Week 4"
  },
  {
    "name": "Data Dictionary - titanic.docx",
    "rel": "Week 4 - 5 October - 11 October\\titanic dataset and data dictionary\\Data Dictionary - titanic.docx",
    "url": "docs/Week%204%20-%205%20October%20-%2011%20October%5Ctitanic%20dataset%20and%20data%20dictionary%5CData%20Dictionary%20-%20titanic.docx",
    "size_kb": 464.8,
    "ext": ".docx",
    "tag": "Word Document",
    "week_tag": "Week 4"
  },
  {
    "name": "Data Dictionary - titanic.pdf",
    "rel": "Week 4 - 5 October - 11 October\\titanic dataset and data dictionary\\Data Dictionary - titanic.pdf",
    "url": "docs/Week%204%20-%205%20October%20-%2011%20October%5Ctitanic%20dataset%20and%20data%20dictionary%5CData%20Dictionary%20-%20titanic.pdf",
    "size_kb": 388.0,
    "ext": ".pdf",
    "tag": "PDF Document",
    "week_tag": "Week 4"
  },
  {
    "name": "titanic (1).csv",
    "rel": "Week 4 - 5 October - 11 October\\titanic dataset and data dictionary\\titanic (1).csv",
    "url": "docs/Week%204%20-%205%20October%20-%2011%20October%5Ctitanic%20dataset%20and%20data%20dictionary%5Ctitanic%20%281%29.csv",
    "size_kb": 59.8,
    "ext": ".csv",
    "tag": "Dataset",
    "week_tag": "Week 4"
  },
  {
    "name": "Data Dictionary - titanic (1).docx",
    "rel": "Week 4 - 5 October - 11 October\\Classwork\\Data Dictionary - titanic (1).docx",
    "url": "docs/Week%204%20-%205%20October%20-%2011%20October%5CClasswork%5CData%20Dictionary%20-%20titanic%20%281%29.docx",
    "size_kb": 464.8,
    "ext": ".docx",
    "tag": "Word Document",
    "week_tag": "Week 4"
  },
  {
    "name": "Week_4_Class_Practical.ipynb",
    "rel": "Week 4 - 5 October - 11 October\\Classwork\\Week_4_Class_Practical.ipynb",
    "url": "docs/Week%204%20-%205%20October%20-%2011%20October%5CClasswork%5CWeek_4_Class_Practical.ipynb",
    "size_kb": 206.4,
    "ext": ".ipynb",
    "tag": "Jupyter Notebook",
    "week_tag": "Week 4"
  },
  {
    "name": "titanic (2).csv",
    "rel": "Week 4 - 5 October - 11 October\\Classwork\\titanic (2).csv",
    "url": "docs/Week%204%20-%205%20October%20-%2011%20October%5CClasswork%5Ctitanic%20%282%29.csv",
    "size_kb": 59.8,
    "ext": ".csv",
    "tag": "Dataset",
    "week_tag": "Week 4"
  },
  {
    "name": "Data Cleaning - Example.pdf",
    "rel": "Week 5 - 12 October - 18 October\\Data Cleaning - Example.pdf",
    "url": "docs/Week%205%20-%2012%20October%20-%2018%20October%5CData%20Cleaning%20-%20Example.pdf",
    "size_kb": 300.7,
    "ext": ".pdf",
    "tag": "PDF Document",
    "week_tag": "Week 5"
  },
  {
    "name": "Data Dictionary - penguin.docx",
    "rel": "Week 5 - 12 October - 18 October\\Data Dictionary - penguin.docx",
    "url": "docs/Week%205%20-%2012%20October%20-%2018%20October%5CData%20Dictionary%20-%20penguin.docx",
    "size_kb": 14.2,
    "ext": ".docx",
    "tag": "Word Document",
    "week_tag": "Week 5"
  },
  {
    "name": "Lecture 4 - Data Cleaning.pdf",
    "rel": "Week 5 - 12 October - 18 October\\Lecture 4 - Data Cleaning.pdf",
    "url": "docs/Week%205%20-%2012%20October%20-%2018%20October%5CLecture%204%20-%20Data%20Cleaning.pdf",
    "size_kb": 528.6,
    "ext": ".pdf",
    "tag": "PDF Document",
    "week_tag": "Week 5"
  },
  {
    "name": "Lecture 4 - Data Cleaning.pptx",
    "rel": "Week 5 - 12 October - 18 October\\Lecture 4 - Data Cleaning.pptx",
    "url": "docs/Week%205%20-%2012%20October%20-%2018%20October%5CLecture%204%20-%20Data%20Cleaning.pptx",
    "size_kb": 332.7,
    "ext": ".pptx",
    "tag": "PowerPoint",
    "week_tag": "Week 5"
  },
  {
    "name": "Sample_Poster.pdf",
    "rel": "Week 5 - 12 October - 18 October\\Sample_Poster.pdf",
    "url": "docs/Week%205%20-%2012%20October%20-%2018%20October%5CSample_Poster.pdf",
    "size_kb": 301.6,
    "ext": ".pdf",
    "tag": "PDF Document",
    "week_tag": "Week 5"
  },
  {
    "name": "Tutorial_GitHub_Desktop_Installation.pdf",
    "rel": "Week 5 - 12 October - 18 October\\Tutorial_GitHub_Desktop_Installation.pdf",
    "url": "docs/Week%205%20-%2012%20October%20-%2018%20October%5CTutorial_GitHub_Desktop_Installation.pdf",
    "size_kb": 297.9,
    "ext": ".pdf",
    "tag": "PDF Document",
    "week_tag": "Week 5"
  },
  {
    "name": "Week5_practical_penguins.ipynb",
    "rel": "Week 5 - 12 October - 18 October\\Week5_practical_penguins.ipynb",
    "url": "docs/Week%205%20-%2012%20October%20-%2018%20October%5CWeek5_practical_penguins.ipynb",
    "size_kb": 312.8,
    "ext": ".ipynb",
    "tag": "Jupyter Notebook",
    "week_tag": "Week 5"
  },
  {
    "name": "Week5_practical_penguins.zip",
    "rel": "Week 5 - 12 October - 18 October\\Week5_practical_penguins.zip",
    "url": "docs/Week%205%20-%2012%20October%20-%2018%20October%5CWeek5_practical_penguins.zip",
    "size_kb": 210.5,
    "ext": ".zip",
    "tag": "Archive (ZIP)",
    "week_tag": "Week 5"
  },
  {
    "name": "penguins.csv",
    "rel": "Week 5 - 12 October - 18 October\\penguins.csv",
    "url": "docs/Week%205%20-%2012%20October%20-%2018%20October%5Cpenguins.csv",
    "size_kb": 17.9,
    "ext": ".csv",
    "tag": "Dataset",
    "week_tag": "Week 5"
  },
  {
    "name": "CA1 - 40% - L7 (1).docx",
    "rel": "Assessments\\CA1 - 40% - L7 (1).docx",
    "url": "docs/Assessments%5CCA1%20-%2040%25%20-%20L7%20%281%29.docx",
    "size_kb": 3481.0,
    "ext": ".docx",
    "tag": "Word Document",
    "week_tag": "Assessments"
  },
  {
    "name": "Module 4 Data Exploration and Preparation.pdf",
    "rel": "Assessments\\Module 4 Data Exploration and Preparation.pdf",
    "url": "docs/Assessments%5CModule%204%20Data%20Exploration%20and%20Preparation.pdf",
    "size_kb": 265.9,
    "ext": ".pdf",
    "tag": "PDF Document",
    "week_tag": "Assessments"
  },
  {
    "name": "Poster template (Landscape) blue.ppt",
    "rel": "Assessments\\Poster template (Landscape) blue.ppt",
    "url": "docs/Assessments%5CPoster%20template%20%28Landscape%29%20blue.ppt",
    "size_kb": 169.5,
    "ext": ".ppt",
    "tag": "PowerPoint",
    "week_tag": "Assessments"
  },
  {
    "name": "Poster template (Landscape) blue.ppt.pdf",
    "rel": "Assessments\\Poster template (Landscape) blue.ppt.pdf",
    "url": "docs/Assessments%5CPoster%20template%20%28Landscape%29%20blue.ppt.pdf",
    "size_kb": 117.2,
    "ext": ".pdf",
    "tag": "PDF Document",
    "week_tag": "Assessments"
  }
],
  glossary: [
    { term: 'Categorical Data', def: 'Data representing labels or groups. Divided into Nominal (no order, e.g., Dublin, Cork) and Ordinal (inherent order, e.g., Low, Medium, High).' },
    { term: 'Numerical Data', def: 'Measurable quantities. Divided into Discrete (countable integers, e.g., purchase count) and Continuous (real values within a continuum, e.g., temperature, revenue).' },
    { term: 'Data Dictionary', def: 'Centralized reference document describing schema, data types, allowed ranges, definitions, and business logic for every column in a dataset.' },
    { term: 'CRISP-DM', def: 'Cross-Industry Standard Process for Data Mining. 6 iterative phases: Business Understanding, Data Understanding, Data Preparation, Modeling, Evaluation, Deployment.' },
    { term: 'SEMMA', def: 'SAS methodology focused on technical data mining: Sample, Explore, Modify, Model, Assess.' },
    { term: 'Garbage In, Garbage Out', def: 'Fundamental axiom that model quality is strictly bounded by the accuracy, completeness, and consistency of the input training data.' },
    { term: 'Missing Data Imputation', def: 'Technique of estimating missing values. Mode for categorical; Mean for symmetric data; Median for skewed distributions or data containing outliers.' },
    { term: 'Missingness Flag', def: 'Creating a binary column (0 or 1) indicating whether a value was originally absent before imputation, preserving missingness as a predictive signal.' },
    { term: 'Outlier (IQR Method)', def: 'Data point falling below Q1 - 1.5 * IQR or above Q3 + 1.5 * IQR, where IQR = Q3 - Q1.' },
    { term: 'GDPR (EU 2016/679)', def: 'European General Data Protection Regulation enforcing data minimisation, lawful basis, purpose limitation, storage limitation, and subject privacy rights.' },
    { term: 'EU AI Act', def: 'Risk-based European AI regulation classifying systems into Unacceptable risk, High risk (requiring conformity assessments), and General Purpose AI (transparency disclosures).' },
    { term: 'Harvard Referencing', def: 'Author-date academic citation system (e.g., Foxwell, 2020) with full corresponding alphabetical bibliography at the end of the poster or report.' }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = COURSE_DATA;
}
