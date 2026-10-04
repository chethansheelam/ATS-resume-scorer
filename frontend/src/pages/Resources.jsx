import { useState } from "react";

function Resources() {
  const [activeTab, setActiveTab] = useState("tech");

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-extrabold text-white tracking-tight">📚 ATS Optimization Resources & Tips</h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Master the technical rules of Applicant Tracking Systems with curated dos, don'ts, and role keywords.
        </p>
      </div>

      {/* 2-Column Do's and Don'ts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="pro-card p-6 border-l-4 border-l-emerald-500 space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
              ✓
            </span>
            <h3 className="text-base font-bold text-emerald-200">ATS Best Practices (Do's)</h3>
          </div>

          <ul className="space-y-2.5 text-xs text-slate-300 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">•</span>
              <span><strong>Standard headings:</strong> Use clear sections like Experience, Education, Skills, and Projects.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">•</span>
              <span><strong>Exact keywords:</strong> Align terms precisely with the target role description.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">•</span>
              <span><strong>Single-column flow:</strong> Ensure parsers read content top-to-bottom without column interleaving.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">•</span>
              <span><strong>Quantified metrics:</strong> Quantify impact with percentages, latency reductions, and user scale.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">•</span>
              <span><strong>Standard fonts:</strong> Use system fonts (Inter, Arial, Calibri, Helvetica) for reliable character encoding.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">•</span>
              <span><strong>PDF or DOCX format:</strong> Preserve text layers cleanly without image rasterization.</span>
            </li>
          </ul>
        </div>

        <div className="pro-card p-6 border-l-4 border-l-rose-500 space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-sm">
              ✕
            </span>
            <h3 className="text-base font-bold text-rose-200">Common ATS Pitfalls (Don'ts)</h3>
          </div>

          <ul className="space-y-2.5 text-xs text-slate-300 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-rose-400 font-bold">•</span>
              <span><strong>Avoid tables & text boxes:</strong> Complex table structures frequently corrupt parser hierarchy.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-400 font-bold">•</span>
              <span><strong>No header/footer contact info:</strong> Many parsers omit headers and footers entirely.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-400 font-bold">•</span>
              <span><strong>Avoid graphical skill bars:</strong> Percentage graphic bars are unreadable to text extractors.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-400 font-bold">•</span>
              <span><strong>No white text stuffing:</strong> Modern algorithms flag hidden repeated keywords as spam.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-400 font-bold">•</span>
              <span><strong>Spell out acronyms:</strong> Include both the acronym and full name on first mention.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Role-Based Keyword Vault */}
      <div className="pro-card p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-white">🔑 Role Keyword Vault</h3>
            <p className="text-xs text-slate-400 mt-0.5">High-frequency terms expected by ATS filters for top tech tracks.</p>
          </div>

          <div className="inline-flex p-1 bg-slate-900 border border-slate-700/80 rounded-xl text-xs flex-wrap">
            <button
              type="button"
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeTab === "tech" ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30" : "text-slate-400 hover:text-slate-200"
              }`}
              onClick={() => setActiveTab("tech")}
            >
              💻 SDE / Full Stack
            </button>
            <button
              type="button"
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeTab === "aiml" ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30" : "text-slate-400 hover:text-slate-200"
              }`}
              onClick={() => setActiveTab("aiml")}
            >
              🤖 AI & ML
            </button>
            <button
              type="button"
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeTab === "business" ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30" : "text-slate-400 hover:text-slate-200"
              }`}
              onClick={() => setActiveTab("business")}
            >
              💼 Product & Mgmt
            </button>
            <button
              type="button"
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeTab === "creative" ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30" : "text-slate-400 hover:text-slate-200"
              }`}
              onClick={() => setActiveTab("creative")}
            >
              🎨 UI/UX & Design
            </button>
          </div>
        </div>

        {activeTab === "tech" && (
          <div className="space-y-3 text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
            <p><strong className="text-white">Languages:</strong> Python, JavaScript, TypeScript, Java, C++, Go, Rust, SQL</p>
            <p><strong className="text-white">Frontend & Architecture:</strong> React, Next.js, Vue, TailwindCSS, State Management, REST APIs, GraphQL, Microfrontends</p>
            <p><strong className="text-white">Backend & Infrastructure:</strong> FastAPI, Node.js, Express, PostgreSQL, MongoDB, Redis, Docker, Kubernetes, AWS (S3, EC2, Lambda), CI/CD</p>
            <p><strong className="text-white">Core Concepts:</strong> System Design, Distributed Systems, Data Structures, OOP, Unit & Integration Testing</p>
          </div>
        )}

        {activeTab === "aiml" && (
          <div className="space-y-3 text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
            <p><strong className="text-white">Machine Learning Frameworks:</strong> PyTorch, TensorFlow, scikit-learn, HuggingFace Transformers, Keras, XGBoost</p>
            <p><strong className="text-white">NLP & Embeddings:</strong> spaCy, SentenceTransformers, NLTK, LLM Prompt Engineering, Vector Databases (Pinecone, Chroma), RAG</p>
            <p><strong className="text-white">Data Engineering & MLOps:</strong> Pandas, NumPy, Data Pipeline Orchestration, MLflow, Dockerized Model Serving</p>
          </div>
        )}

        {activeTab === "business" && (
          <div className="space-y-3 text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
            <p><strong className="text-white">Methodologies:</strong> Agile, Scrum, Kanban, Sprint Planning, Stakeholder Alignment, Product Roadmapping</p>
            <p><strong className="text-white">Analytics:</strong> KPI Tracking, A/B Testing, User Cohort Analysis, ROI Optimization, Google Analytics</p>
          </div>
        )}

        {activeTab === "creative" && (
          <div className="space-y-3 text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
            <p><strong className="text-white">Design Tools:</strong> Figma, Adobe XD, Illustrator, Photoshop</p>
            <p><strong className="text-white">User Experience:</strong> Wireframing, Rapid Prototyping, Design Systems, Usability Testing, Information Architecture</p>
          </div>
        )}
      </div>

      {/* ATS Template Notice */}
      <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-indigo-300 flex items-center gap-3">
        <span className="text-xl">📄</span>
        <div>
          <strong className="font-bold block text-white">ATS Template Tip</strong>
          <span>Stick with single-column layouts with clear text hierarchy (Heading 1, Bold Job Titles, Bullet Points) to achieve 100% parser accuracy.</span>
        </div>
      </div>
    </div>
  );
}

export default Resources;