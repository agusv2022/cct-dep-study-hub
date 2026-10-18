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
      eda: # --- 1. INITIAL INSPECTION ---
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

plt.style.use('seaborn-v0_8-whitegrid')
df = pd.read_csv('Smart_Home_Energy.csv')

print('Shape:', df.shape)
print('\nData Types & Non-Null Counts:')
df.info()

print('\nDescriptive Statistics:')
display(df.describe(include='all'))

print('\nMissing Values Breakdown:')
missing = df.isnull().sum()
print(missing[missing > 0])

print('\nDuplicate Count:', df.duplicated().sum()),
      cleaning: # --- 2. DATA CLEANING & MISSING VALUES ---
# Handling duplicates
initial_rows = len(df)
df = df.drop_duplicates()
print(f'Dropped {initial_rows - len(df)} duplicate records.')

# Missing value strategy:
# - For skewed numeric features: Impute with Median
# - For symmetric numeric features: Impute with Mean
# - For categorical features: Impute with Mode or 'Unknown'
# - Optional: Add missingness indicator flag if missingness is informative
for col in df.select_dtypes(include=[np.number]).columns:
    if df[col].isnull().sum() > 0:
        # Flagging
        df[f'{col}_was_missing'] = df[col].isnull().astype(int)
        # Median imputation (robust to outliers)
        median_val = df[col].median()
        df[col] = df[col].fillna(median_val)
        print(f'Imputed {col} with median: {median_val}'),
      outliers: # --- 3. OUTLIER DETECTION (IQR METHOD) ---
def detect_outliers_iqr(series):
    q1 = series.quantile(0.25)
    q3 = series.quantile(0.75)
    iqr = q3 - q1
    lower_bound = q1 - 1.5 * iqr
    upper_bound = q3 + 1.5 * iqr
    outliers = series[(series < lower_bound) | (series > upper_bound)]
    return lower_bound, upper_bound, len(outliers)

# Example on target energy consumption
# target_col = 'Energy_Consumption'
# lb, ub, n_outliers = detect_outliers_iqr(df[target_col])
# print(f'{target_col}: {n_outliers} outliers detected outside [{lb:.2f}, {ub:.2f}]'),
      featureSelection: # --- 4. FEATURE SELECTION (CORRELATION & VARIANCE) ---
# Correlation matrix with target
numeric_df = df.select_dtypes(include=[np.number])
plt.figure(figsize=(10, 8))
sns.heatmap(numeric_df.corr(), annot=True, cmap='coolwarm', fmt='.2f', linewidths=0.5)
plt.title('Correlation Matrix for Feature Selection', fontsize=14, weight='bold')
plt.tight_layout()
plt.show()
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
      title: 'Data Fundamentals & Version Control',
      badge: 'Completed',
      status: 'completed',
      summary: 'Distinction between raw data and actionable information. Taxonomy of data types (Categorical vs Numerical). Acquisition strategies and modern version control with Git & GitHub.',
      topics: [
        'Data vs Information: Raw observations vs context-driven meaning',
        'Taxonomy: Categorical (Nominal vs Ordinal) and Numerical (Discrete vs Continuous)',
        'Primary Data (surveys, sensors, experiments) vs Secondary Data (APIs, open-data portals, repositories)',
        'What, Where, How of Data Acquisition: defining business questions before acquiring data',
        'Git & GitHub: Repository, Commits, Branches, Push/Pull, and avoiding file sprawl'
      ],
      practicalHighlights: 'Analyzing historical birth ratios from arbuthnot.txt using pandas and matplotlib; calculating ratios and plotting trends.',
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
