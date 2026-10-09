import { useState } from "react";

function Resources() {
  const [activeTab, setActiveTab] = useState("tech");

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-[#F5F5F5] tracking-tight">ATS Optimization Resources & Tips</h2>
        <p className="text-xs sm:text-sm text-[#9CA3AF] mt-1">
          Master the technical rules of Applicant Tracking Systems with curated dos, don'ts, and role keywords.
        </p>
      </div>

      {/* 2-Column Do's and Don'ts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#151719] border border-[#292C30] border-l-4 border-l-[#22C55E] rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-[#22C55E]/10 text-[#22C55E] flex items-center justify-center font-bold text-sm">
              ✓
            </span>
            <h3 className="text-base font-semibold text-[#F5F5F5]">ATS Best Practices (Do's)</h3>
          </div>

          <ul className="space-y-2.5 text-xs text-[#9CA3AF] leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-[#22C55E] font-bold">•</span>
              <span><strong className="text-[#F5F5F5]">Standard headings:</strong> Use clear sections like Experience, Education, Skills, and Projects.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#22C55E] font-bold">•</span>
              <span><strong className="text-[#F5F5F5]">Exact keywords:</strong> Align terms precisely with the target role description.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#22C55E] font-bold">•</span>
              <span><strong className="text-[#F5F5F5]">Single-column flow:</strong> Ensure parsers read content top-to-bottom without column interleaving.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#22C55E] font-bold">•</span>
              <span><strong className="text-[#F5F5F5]">Quantified metrics:</strong> Quantify impact with percentages, latency reductions, and user scale.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#22C55E] font-bold">•</span>
              <span><strong className="text-[#F5F5F5]">Standard fonts:</strong> Use system fonts (Inter, Arial, Calibri, Helvetica) for reliable character encoding.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#22C55E] font-bold">•</span>
              <span><strong className="text-[#F5F5F5]">PDF or DOCX format:</strong> Preserve text layers cleanly without image rasterization.</span>
            </li>
          </ul>
        </div>

        <div className="bg-[#151719] border border-[#292C30] border-l-4 border-l-[#EF4444] rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-[#EF4444]/10 text-[#EF4444] flex items-center justify-center font-bold text-sm">
              ✕
            </span>
            <h3 className="text-base font-semibold text-[#F5F5F5]">Common ATS Pitfalls (Don'ts)</h3>
          </div>

          <ul className="space-y-2.5 text-xs text-[#9CA3AF] leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-[#EF4444] font-bold">•</span>
              <span><strong className="text-[#F5F5F5]">Avoid tables & text boxes:</strong> Complex table structures frequently corrupt parser hierarchy.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#EF4444] font-bold">•</span>
              <span><strong className="text-[#F5F5F5]">No header/footer contact info:</strong> Many parsers omit headers and footers entirely.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#EF4444] font-bold">•</span>
              <span><strong className="text-[#F5F5F5]">Avoid graphical skill bars:</strong> Percentage graphic bars are unreadable to text extractors.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#EF4444] font-bold">•</span>
              <span><strong className="text-[#F5F5F5]">No white text stuffing:</strong> Modern algorithms flag hidden repeated keywords as spam.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#EF4444] font-bold">•</span>
              <span><strong className="text-[#F5F5F5]">Spell out acronyms:</strong> Include both the acronym and full name on first mention.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Role-Based Keyword Vault */}
      <div className="bg-[#151719] border border-[#292C30] rounded-xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-semibold text-[#F5F5F5]">Role Keyword Vault</h3>
            <p className="text-xs text-[#9CA3AF] mt-0.5">High-frequency terms expected by ATS filters for top tech tracks.</p>
          </div>

          <div className="inline-flex p-1 bg-[#0F1113] border border-[#292C30] rounded-xl text-xs flex-wrap gap-1">
            <button
              type="button"
              className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                activeTab === "tech" ? "bg-[#151719] text-[#F5F5F5] border border-[#292C30]" : "text-[#9CA3AF] hover:text-[#F5F5F5]"
              }`}
              onClick={() => setActiveTab("tech")}
            >
              SDE / Full Stack
            </button>
            <button
              type="button"
              className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                activeTab === "aiml" ? "bg-[#151719] text-[#F5F5F5] border border-[#292C30]" : "text-[#9CA3AF] hover:text-[#F5F5F5]"
              }`}
              onClick={() => setActiveTab("aiml")}
            >
              Data & ML
            </button>
            <button
              type="button"
              className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                activeTab === "business" ? "bg-[#151719] text-[#F5F5F5] border border-[#292C30]" : "text-[#9CA3AF] hover:text-[#F5F5F5]"
              }`}
              onClick={() => setActiveTab("business")}
            >
              Product & Mgmt
            </button>
            <button
              type="button"
              className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                activeTab === "creative" ? "bg-[#151719] text-[#F5F5F5] border border-[#292C30]" : "text-[#9CA3AF] hover:text-[#F5F5F5]"
              }`}
              onClick={() => setActiveTab("creative")}
            >
              UI/UX & Design
            </button>
          </div>
        </div>

        {activeTab === "tech" && (
          <div className="space-y-3 text-xs text-[#9CA3AF] leading-relaxed bg-[#0F1113] p-5 rounded-xl border border-[#292C30]">
            <p><strong className="text-[#F5F5F5]">Languages:</strong> Python, JavaScript, TypeScript, Java, C++, Go, Rust, SQL</p>
            <p><strong className="text-[#F5F5F5]">Frontend & Architecture:</strong> React, Next.js, Vue, TailwindCSS, State Management, REST APIs, GraphQL, Microfrontends</p>
            <p><strong className="text-[#F5F5F5]">Backend & Infrastructure:</strong> FastAPI, Node.js, Express, PostgreSQL, MongoDB, Redis, Docker, Kubernetes, AWS (S3, EC2, Lambda), CI/CD</p>
            <p><strong className="text-[#F5F5F5]">Core Concepts:</strong> System Design, Distributed Systems, Data Structures, OOP, Unit & Integration Testing</p>
          </div>
        )}

        {activeTab === "aiml" && (
          <div className="space-y-3 text-xs text-[#9CA3AF] leading-relaxed bg-[#0F1113] p-5 rounded-xl border border-[#292C30]">
            <p><strong className="text-[#F5F5F5]">Machine Learning Frameworks:</strong> PyTorch, TensorFlow, scikit-learn, HuggingFace Transformers, Keras, XGBoost</p>
            <p><strong className="text-[#F5F5F5]">NLP & Embeddings:</strong> spaCy, SentenceTransformers, NLTK, LLM Prompt Engineering, Vector Databases, RAG</p>
            <p><strong className="text-[#F5F5F5]">Data Engineering & Operations:</strong> Pandas, NumPy, Data Pipeline Orchestration, MLflow, Dockerized Model Serving</p>
          </div>
        )}

        {activeTab === "business" && (
          <div className="space-y-3 text-xs text-[#9CA3AF] leading-relaxed bg-[#0F1113] p-5 rounded-xl border border-[#292C30]">
            <p><strong className="text-[#F5F5F5]">Methodologies:</strong> Agile, Scrum, Kanban, Sprint Planning, Stakeholder Alignment, Product Roadmapping</p>
            <p><strong className="text-[#F5F5F5]">Analytics:</strong> KPI Tracking, A/B Testing, User Cohort Analysis, ROI Optimization, Google Analytics</p>
          </div>
        )}

        {activeTab === "creative" && (
          <div className="space-y-3 text-xs text-[#9CA3AF] leading-relaxed bg-[#0F1113] p-5 rounded-xl border border-[#292C30]">
            <p><strong className="text-[#F5F5F5]">Design Tools:</strong> Figma, Adobe XD, Illustrator, Photoshop</p>
            <p><strong className="text-[#F5F5F5]">User Experience:</strong> Wireframing, Rapid Prototyping, Design Systems, Usability Testing, Information Architecture</p>
          </div>
        )}
      </div>

      {/* ATS Template Notice */}
      <div className="p-4 rounded-xl bg-[#3B82F6]/10 border border-[#3B82F6]/20 text-xs text-[#9CA3AF] flex items-center gap-3">
        <span className="text-xl">📄</span>
        <div>
          <strong className="font-semibold block text-[#F5F5F5]">ATS Template Tip</strong>
          <span>Stick with single-column layouts with clear text hierarchy (Heading 1, Bold Job Titles, Bullet Points) to achieve 100% parser accuracy.</span>
        </div>
      </div>
    </div>
  );
}

export default Resources;