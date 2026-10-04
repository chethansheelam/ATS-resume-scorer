const COMPONENTS_CONFIG = [
  { label: "Formatting & Structure", key: "formatting", max: 20, icon: "📝" },
  { label: "Keywords & Skills", key: "keywords", max: 25, icon: "🔑" },
  { label: "Content Quality", key: "content", max: 25, icon: "📄" },
  { label: "Skill Validation", key: "skill_validation", max: 15, icon: "✅" },
  { label: "ATS Compatibility", key: "ats_compatibility", max: 15, icon: "🤖" },
];

function ScoreDisplay({ analysis }) {
  const score = Math.round(Number(analysis?.ATS_score ?? analysis?.ats_score ?? 0));
  const interpretation = analysis?.interpretation || "";
  const componentScores = analysis?.component_scores || {};

  const getScoreTheme = (val) => {
    if (val >= 80) return { bg: "from-emerald-500 to-teal-600", text: "text-emerald-400", ring: "ring-emerald-500/20", lightBg: "bg-emerald-950/20 border-emerald-500/30" };
    if (val >= 60) return { bg: "from-amber-500 to-orange-600", text: "text-amber-400", ring: "ring-amber-500/20", lightBg: "bg-amber-950/20 border-amber-500/30" };
    return { bg: "from-rose-500 to-red-600", text: "text-rose-400", ring: "ring-rose-500/20", lightBg: "bg-rose-950/20 border-rose-500/30" };
  };

  const theme = getScoreTheme(score);

  return (
    <div className="space-y-6">
      {/* Top Banner with Circular Gauge & Interpretation */}
      <div className={`pro-card p-6 sm:p-8 flex flex-col md:flex-row items-center gap-8 ${theme.lightBg}`}>
        <div className="relative flex items-center justify-center shrink-0">
          <div className={`w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-gradient-to-tr ${theme.bg} flex flex-col items-center justify-center text-white shadow-2xl ring-8 ${theme.ring}`}>
            <span className="text-4xl sm:text-5xl font-black tracking-tight">{score}</span>
            <span className="text-[10px] font-bold uppercase tracking-wider opacity-90">out of 100</span>
          </div>
        </div>

        <div className="space-y-2 text-center md:text-left flex-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-slate-900 border border-slate-700 shadow-xs">
            <span className={theme.text}>ATS Readiness Index</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {score >= 80 ? "Excellent ATS Compatibility" : score >= 60 ? "Moderate ATS Compatibility" : "Needs Immediate Optimization"}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
            {interpretation || "Detailed heuristic and deep learning evaluation computed across five core ATS dimensions."}
          </p>
        </div>
      </div>

      {/* 5-Component Score Breakdown Grid */}
      <div className="pro-card p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-base font-bold text-white">📈 Score Breakdown</h3>
          <span className="text-xs text-slate-500">5 Evaluated Dimensions</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {COMPONENTS_CONFIG.map(({ label, key, max, icon }) => {
            const val = Math.round(Number(componentScores[key] ?? 0));
            const pct = Math.min(Math.max((val / max) * 100, 0), 100);
            const colorClass = pct >= 80 ? "bg-emerald-500" : pct >= 60 ? "bg-amber-500" : "bg-rose-500";
            const textColor = pct >= 80 ? "text-emerald-400" : pct >= 60 ? "text-amber-400" : "text-rose-400";

            return (
              <div key={key} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                    <span>{icon}</span> {label}
                  </span>
                  <span className={`text-xs font-black ${textColor}`}>
                    {val} <span className="text-slate-500 font-normal">/ {max}</span>
                  </span>
                </div>

                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${colorClass}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ScoreDisplay;
