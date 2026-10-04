import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="space-y-16 py-4">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 border border-indigo-500/20 p-8 sm:p-14 lg:p-16 shadow-2xl text-center">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 shadow-xs">
            <span>⚡ Deep Learning & Heuristic ATS Scoring</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            Pass the ATS Filter. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-300">
              Land More Interviews.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Validate your resume formatting, semantic keyword density, and demonstrated project skills before recruiters review your application.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/scorer"
              className="w-full sm:w-auto btn-accent px-8 py-3.5 rounded-xl text-sm shadow-xl hover:scale-[1.02] active:scale-[0.98] text-center"
            >
              🚀 Analyze Resume Now
            </Link>
            <Link
              to="/resources"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl text-sm font-semibold text-slate-200 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 transition-all text-center"
            >
              📚 ATS Rules & Guidelines
            </Link>
          </div>
        </div>
      </div>

      {/* 5-Dimensional Core Features */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Multi-Dimensional Analysis
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Local NLP models evaluate your resume against 5 industry-standard criteria.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="pro-card pro-card-hover p-6 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center text-xl font-bold">
              📊
            </div>
            <h3 className="text-base font-bold text-white">5-Pillar Score Breakdown</h3>
            <ul className="text-xs text-slate-400 space-y-2 pt-1">
              <li className="flex justify-between border-b border-slate-800 pb-1">
                <span>Formatting & Structure</span>
                <span className="text-indigo-300 font-mono font-bold">20%</span>
              </li>
              <li className="flex justify-between border-b border-slate-800 pb-1">
                <span>Keywords & Skills</span>
                <span className="text-indigo-300 font-mono font-bold">25%</span>
              </li>
              <li className="flex justify-between border-b border-slate-800 pb-1">
                <span>Content Quality</span>
                <span className="text-indigo-300 font-mono font-bold">25%</span>
              </li>
              <li className="flex justify-between border-b border-slate-800 pb-1">
                <span>Skill Validation</span>
                <span className="text-indigo-300 font-mono font-bold">15%</span>
              </li>
              <li className="flex justify-between">
                <span>ATS Compatibility</span>
                <span className="text-indigo-300 font-mono font-bold">15%</span>
              </li>
            </ul>
          </div>

          <div className="pro-card pro-card-hover p-6 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center text-xl font-bold">
              🔍
            </div>
            <h3 className="text-base font-bold text-white">Semantic Skill Verification</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Detects whether claimed skills are supported with real-world evidence from your project and experience bullet points.
            </p>
            <div className="p-3 bg-emerald-950/40 border border-emerald-800/40 rounded-xl text-emerald-300 text-xs font-medium">
              ✓ Flags empty keyword claims before recruiters discard your resume.
            </div>
          </div>

          <div className="pro-card pro-card-hover p-6 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center text-xl font-bold">
              🔒
            </div>
            <h3 className="text-base font-bold text-white">100% Private & Local AI</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              All parsing, vector embeddings, and similarity matching execute locally using spaCy and SentenceTransformer architectures.
            </p>
            <div className="p-3 bg-purple-950/40 border border-purple-800/40 rounded-xl text-purple-300 text-xs font-medium">
              🔒 Zero cloud leaks. Your data stays entirely in your environment.
            </div>
          </div>
        </div>
      </div>

      {/* 3-Step Guide */}
      <div className="pro-card p-8 sm:p-10 space-y-8">
        <h2 className="text-lg font-bold text-white text-center">How ATS Resume Scorer Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black text-sm shadow-lg shadow-indigo-500/30">
              1
            </div>
            <h4 className="font-bold text-slate-200 text-sm">Upload Resume</h4>
            <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
              Upload PDF, DOC, or DOCX and optionally paste target job descriptions.
            </p>
          </div>

          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center font-black text-sm shadow-lg shadow-purple-500/30">
              2
            </div>
            <h4 className="font-bold text-slate-200 text-sm">AI NLP Processing</h4>
            <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
              Extracts sections, computes vector semantic match, and validates project context.
            </p>
          </div>

          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black text-sm shadow-lg shadow-emerald-500/30">
              3
            </div>
            <h4 className="font-bold text-slate-200 text-sm">Actionable Reports</h4>
            <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
              Export downloadable PDF reports, view prioritized fixes, and bridge skills gaps.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
