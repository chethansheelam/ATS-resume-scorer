function JDComparison({ jdData }) {
  if (!jdData) return null;

  const matchPct = Math.round(Number(jdData?.match_percentage ?? 0));
  const semantic = Number(jdData?.semantic_similarity ?? 0);
  const matched = jdData?.matched_keywords || [];
  const missing = jdData?.missing_keywords || [];
  const skillsGap = jdData?.skills_gap || [];

  return (
    <div className="pro-card p-6 sm:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-white">🎯 Job Description Match Analysis</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Evaluates exact keyword overlap and deep semantic embedding alignment with the target JD.
          </p>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-300">Keyword Coverage</span>
            <span className="text-sm font-black text-indigo-400">{matchPct}%</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${matchPct}%` }} />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-300">Semantic Vector Similarity</span>
            <span className="text-sm font-black text-purple-400">{(semantic * 100).toFixed(1)}%</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="h-full bg-purple-500 rounded-full" style={{ width: `${Math.min(semantic * 100, 100)}%` }} />
          </div>
        </div>
      </div>

      {/* Keywords Chips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {/* Matched Keywords */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <span className="text-emerald-400">✓</span> Matched Keywords ({matched.length})
          </h4>
          {matched.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {matched.slice(0, 25).map((kw, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-indigo-950/40 border border-indigo-500/30 text-indigo-300 text-xs font-medium"
                >
                  {kw}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500 italic">No direct keywords matched.</p>
          )}
        </div>

        {/* Missing Keywords */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <span className="text-rose-400">✕</span> Missing Keywords ({missing.length})
          </h4>
          {missing.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {missing.slice(0, 20).map((kw, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs font-medium"
                >
                  {kw}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-emerald-400 font-semibold">✓ All target keywords found!</p>
          )}
        </div>
      </div>

      {/* Skills Gap */}
      {skillsGap.length > 0 && (
        <div className="pt-4 border-t border-slate-800 space-y-2">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            📊 Recommended Skills Gap to Bridge
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {skillsGap.slice(0, 8).map((skill, idx) => (
              <div key={idx} className="p-2.5 rounded-lg bg-slate-900/70 border border-slate-800 text-xs text-slate-300 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                <span>{skill}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default JDComparison;
