function JDComparison({ jdData }) {
  if (!jdData) return null;

  const matchPct = Math.round(Number(jdData?.match_percentage ?? 0));
  const semantic = Number(jdData?.semantic_similarity ?? 0);
  const semanticPct = Math.round(semantic <= 1 ? semantic * 100 : semantic);
  const matched = jdData?.matched_keywords || [];
  const missing = jdData?.missing_keywords || [];
  const skillsGap = jdData?.skills_gap || [];

  return (
    <div className="bg-[#151719] border border-[#292C30] rounded-xl p-6 space-y-6">
      <div className="flex items-center gap-1.5 text-xs font-semibold text-[#F5F5F5]">
        <svg className="w-3.5 h-3.5 text-[#3B82F6]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="12" cy="12" r="10" />
          <line x1="22" y1="12" x2="18" y2="12" />
          <line x1="6" y1="12" x2="2" y2="12" />
          <line x1="12" y1="6" x2="12" y2="2" />
          <line x1="12" y1="22" x2="12" y2="18" />
        </svg>
        <span>Job description match analysis</span>
      </div>

      {/* Two Progress Bar Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Keyword Coverage */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#F5F5F5] font-medium">Keyword coverage</span>
            <span className="font-mono text-[#9CA3AF] text-[11px]">{matchPct}/100</span>
          </div>
          <div className="w-full bg-[#0F1113] border border-[#292C30]/50 h-1.5 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#3B82F6] rounded-full transition-all duration-500"
              style={{ width: `${Math.min(matchPct, 100)}%` }}
            />
          </div>
        </div>

        {/* Semantic Similarity */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#F5F5F5] font-medium">Semantic similarity</span>
            <span className="font-mono text-[#9CA3AF] text-[11px]">{semanticPct}/100</span>
          </div>
          <div className="w-full bg-[#0F1113] border border-[#292C30]/50 h-1.5 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#3B82F6] rounded-full transition-all duration-500"
              style={{ width: `${Math.min(semanticPct, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Pill Badges Section */}
      <div className="space-y-4 pt-1">
        {/* Matched Keywords */}
        <div className="space-y-2">
          <div className="text-[10px] font-mono uppercase tracking-wider text-[#9CA3AF]">
            MATCHED KEYWORDS
          </div>
          {matched.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {matched.slice(0, 30).map((kw, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-[#22C55E]/10 border border-[#22C55E]/20 text-[#22C55E] text-xs font-medium"
                >
                  {kw}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-[#9CA3AF] italic">No direct keywords matched.</p>
          )}
        </div>

        {/* Missing Keywords */}
        <div className="space-y-2">
          <div className="text-[10px] font-mono uppercase tracking-wider text-[#9CA3AF]">
            MISSING KEYWORDS
          </div>
          {missing.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {missing.slice(0, 25).map((kw, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-[#EF4444]/10 border border-[#EF4444]/20 text-[#EF4444] text-xs font-medium"
                >
                  {kw}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-[#22C55E] font-medium">✓ All target keywords found!</p>
          )}
        </div>

        {/* Recommended Skills To Add */}
        {skillsGap.length > 0 && (
          <div className="space-y-2">
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#9CA3AF]">
              RECOMMENDED SKILLS TO ADD
            </div>
            <div className="flex flex-wrap gap-1.5">
              {skillsGap.slice(0, 15).map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-[#0F1113] border border-[#292C30] text-[#F5F5F5] text-xs font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default JDComparison;
