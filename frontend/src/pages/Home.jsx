import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="space-y-20 py-4 max-w-4xl mx-auto">
      {/* 1. Hero Section */}
      <section className="text-center space-y-6 pt-4 sm:pt-8">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F5F5F5] leading-[1.12]">
          Pass the ATS Filter. <br />
          <span className="text-[#3B82F6]">Land More Interviews.</span>
        </h1>

        <p className="text-sm sm:text-base text-[#9CA3AF] max-w-2xl mx-auto leading-relaxed">
          Validate your resume formatting, semantic keyword density, and demonstrated project skills before recruiters review your application.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/scorer"
            className="w-full sm:w-auto px-7 py-3 rounded-lg text-sm font-medium text-white bg-[#3B82F6] hover:bg-[#2563EB] transition-all shadow-xs text-center"
          >
            Analyze Resume Now
          </Link>
          <Link
            to="/resources"
            className="w-full sm:w-auto px-6 py-3 rounded-lg text-sm font-medium text-[#F5F5F5] bg-[#151719] hover:bg-[#1E2124] border border-[#292C30] transition-all text-center shadow-xs"
          >
            ATS Rules & Guidelines
          </Link>
        </div>
      </section>

      {/* 2. Resume Illustration: Dark card, subtle borders, restrained green status indicators */}
      <section className="pt-2">
        <div className="bg-[#151719] border border-[#292C30] rounded-xl p-6 sm:p-8 max-w-2xl mx-auto space-y-6 text-left relative">
          {/* Top Paper Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#292C30]">
            <div className="space-y-1.5">
              <div className="h-4 w-40 bg-[#F5F5F5]/30 rounded" />
              <div className="h-2.5 w-28 bg-[#292C30] rounded" />
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                ATS Ready: 94 / 100
              </span>
              <span className="hidden sm:inline-flex px-2.5 py-1 rounded-md text-[11px] font-medium bg-[#3B82F6]/10 text-[#3B82F6] border border-[#3B82F6]/20">
                Parsed Clean
              </span>
            </div>
          </div>

          {/* Section 1: Experience with gray text lines & status indicators */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#9CA3AF] font-semibold">
                WORK EXPERIENCE
              </span>
              <span className="text-[10px] font-mono text-[#22C55E] font-medium">
                ✓ Chronological order verified
              </span>
            </div>

            <div className="space-y-2 pt-0.5">
              <div className="flex items-center gap-3">
                <div className="h-2 bg-[#292C30] rounded-full w-full" />
                <span className="shrink-0 w-2 h-2 rounded-full bg-[#22C55E]" title="Verified Action Verb" />
              </div>
              <div className="flex items-center gap-3">
                <div className="h-2 bg-[#292C30] rounded-full w-5/6" />
                <span className="shrink-0 w-2 h-2 rounded-full bg-[#22C55E]" title="Quantified Metric Detected" />
              </div>
              <div className="flex items-center gap-3">
                <div className="h-2 bg-[#292C30] rounded-full w-4/6" />
              </div>
            </div>
          </div>

          {/* Section 2: Skills with status indicators */}
          <div className="space-y-2.5 pt-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#9CA3AF] font-semibold">
              DEMONSTRATED TECHNICAL SKILLS
            </span>
            <div className="flex flex-wrap gap-2 pt-0.5">
              {[
                "Python",
                "System Architecture",
                "Docker",
                "FastAPI",
                "PostgreSQL",
                "REST APIs",
              ].map((skill, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-[#0F1113] text-[#F5F5F5] border border-[#292C30]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Multi-Dimensional Analysis (Feature Cards) */}
      <section className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F5F5] tracking-tight">
            Multi-Dimensional Analysis
          </h2>
          <p className="text-xs sm:text-sm text-[#9CA3AF]">
            Objective scoring evaluated against 5 industry-standard criteria.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: 5-Pillar Score */}
          <div className="bg-[#151719] border border-[#292C30] rounded-xl p-6 space-y-4">
            <div className="w-9 h-9 rounded-lg bg-[#3B82F6]/10 text-[#3B82F6] border border-[#3B82F6]/20 flex items-center justify-center text-sm font-semibold">
              01
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#F5F5F5]">5-Pillar Score Breakdown</h3>
              <p className="text-xs text-[#9CA3AF] mt-1 leading-relaxed">
                Evaluates layout, keywords, content, skill validity, and ATS standard compliance.
              </p>
            </div>
            <ul className="text-xs text-[#9CA3AF] space-y-2 pt-2 border-t border-[#292C30]">
              <li className="flex justify-between">
                <span>Formatting & Structure</span>
                <span className="font-mono text-[#3B82F6] font-medium">20%</span>
              </li>
              <li className="flex justify-between">
                <span>Keywords & Skills</span>
                <span className="font-mono text-[#3B82F6] font-medium">25%</span>
              </li>
              <li className="flex justify-between">
                <span>Content Quality</span>
                <span className="font-mono text-[#3B82F6] font-medium">25%</span>
              </li>
              <li className="flex justify-between">
                <span>Skill Validation</span>
                <span className="font-mono text-[#3B82F6] font-medium">15%</span>
              </li>
              <li className="flex justify-between">
                <span>ATS Compatibility</span>
                <span className="font-mono text-[#3B82F6] font-medium">15%</span>
              </li>
            </ul>
          </div>

          {/* Card 2: Semantic Verification */}
          <div className="bg-[#151719] border border-[#292C30] rounded-xl p-6 space-y-4">
            <div className="w-9 h-9 rounded-lg bg-[#3B82F6]/10 text-[#3B82F6] border border-[#3B82F6]/20 flex items-center justify-center text-sm font-semibold">
              02
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#F5F5F5]">Semantic Skill Verification</h3>
              <p className="text-xs text-[#9CA3AF] mt-1 leading-relaxed">
                Detects whether claimed skills are supported with real evidence in project bullets.
              </p>
            </div>
            <div className="p-3 bg-[#22C55E]/10 border border-[#22C55E]/20 rounded-lg text-xs text-[#22C55E] font-medium">
              ✓ Flags empty keyword claims before recruiters discard your resume.
            </div>
            <p className="text-xs text-[#9CA3AF] leading-relaxed">
              Differentiates between buzzwords and demonstrated execution.
            </p>
          </div>

          {/* Card 3: 100% Private & Secure */}
          <div className="bg-[#151719] border border-[#292C30] rounded-xl p-6 space-y-4">
            <div className="w-9 h-9 rounded-lg bg-[#3B82F6]/10 text-[#3B82F6] border border-[#3B82F6]/20 flex items-center justify-center text-sm font-semibold">
              03
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#F5F5F5]">Private & Secure Analysis</h3>
              <p className="text-xs text-[#9CA3AF] mt-1 leading-relaxed">
                All parsing, vector embeddings, and similarity matching execute locally and securely.
              </p>
            </div>
            <div className="p-3 bg-[#0F1113] border border-[#292C30] rounded-lg text-xs text-[#F5F5F5] font-medium">
              🔒 Zero cloud data leaks. Your information stays strictly private.
            </div>
            <p className="text-xs text-[#9CA3AF] leading-relaxed">
              Fast processing pipelines designed for reliable format parsing and semantic checks.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Three-Step Workflow */}
      <section className="bg-[#151719] border border-[#292C30] rounded-xl p-8 sm:p-10 space-y-8">
        <h2 className="text-base sm:text-lg font-semibold text-[#F5F5F5] text-center">
          How ATS Resume Scorer Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center space-y-2.5">
            <div className="w-8 h-8 rounded-full bg-[#3B82F6] text-white flex items-center justify-center font-semibold text-xs shadow-xs">
              1
            </div>
            <h4 className="font-semibold text-[#F5F5F5] text-xs">Upload Resume</h4>
            <p className="text-xs text-[#9CA3AF] max-w-xs leading-relaxed">
              Upload PDF, DOC, or DOCX and optionally paste target job descriptions.
            </p>
          </div>

          <div className="flex flex-col items-center text-center space-y-2.5">
            <div className="w-8 h-8 rounded-full bg-[#3B82F6] text-white flex items-center justify-center font-semibold text-xs shadow-xs">
              2
            </div>
            <h4 className="font-semibold text-[#F5F5F5] text-xs">Deep Analysis</h4>
            <p className="text-xs text-[#9CA3AF] max-w-xs leading-relaxed">
              Extracts sections, computes keyword match, and validates project context.
            </p>
          </div>

          <div className="flex flex-col items-center text-center space-y-2.5">
            <div className="w-8 h-8 rounded-full bg-[#3B82F6] text-white flex items-center justify-center font-semibold text-xs shadow-xs">
              3
            </div>
            <h4 className="font-semibold text-[#F5F5F5] text-xs">Actionable Reports</h4>
            <p className="text-xs text-[#9CA3AF] max-w-xs leading-relaxed">
              Export downloadable PDF reports, view prioritized fixes, and bridge skills gaps.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
