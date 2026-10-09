export function ScoreGaugeCard({ analysis, filename }) {
  const score = Math.round(Number(analysis?.ATS_score ?? analysis?.ats_score ?? 0));
  const interpretation = analysis?.interpretation;
  const jdData = analysis?.jd_comparison || analysis?.jd_match_analysis;
  const jdMatchPct = jdData?.match_percentage ? Math.round(Number(jdData.match_percentage)) : null;

  // Gauge circle SVG properties
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (Math.min(Math.max(score, 0), 100) / 100) * circumference;

  const getScoreColor = (val) => {
    if (val >= 80) return "#22C55E"; // Success
    if (val >= 50) return "#F59E0B"; // Warning
    return "#EF4444"; // Error
  };

  const getHeadline = (val) => {
    if (val >= 80) return "Excellent. Resume is strongly optimized for ATS.";
    if (val >= 65) return "Good. Minor tweaks will further improve ranking.";
    if (val >= 45) return "Fair. Some structural and content changes are recommended.";
    return "Needs Improvement. Critical issues detected.";
  };

  const scoreColor = getScoreColor(score);
  const headline = interpretation || getHeadline(score);

  return (
    <div className="bg-[#151719] border border-[#292C30] rounded-xl p-6 sm:p-7 flex flex-col md:flex-row items-center gap-6 sm:gap-8">
      {/* Circular Gauge Ring */}
      <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
            stroke="#292C30"
            strokeWidth="7"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
            stroke={scoreColor}
            strokeWidth="7"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none pointer-events-none">
          <span className="text-2xl sm:text-3xl font-extrabold text-[#F5F5F5] leading-none">
            {score}
          </span>
          <span className="text-[10px] text-[#9CA3AF] mt-0.5">
            / 100
          </span>
        </div>
      </div>

      {/* Right summary info */}
      <div className="space-y-2 text-center md:text-left flex-1">
        {filename && (
          <div className="text-[11px] font-mono uppercase tracking-wider text-[#9CA3AF]">
            {filename}
          </div>
        )}
        <h2 className="text-base sm:text-lg font-semibold text-[#F5F5F5] tracking-tight leading-snug">
          {headline}
        </h2>
        {jdMatchPct !== null && (
          <div className="pt-0.5">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#3B82F6]/10 border border-[#3B82F6]/30 text-[#3B82F6]">
              JD Match: {jdMatchPct}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

const COMPONENTS_CONFIG = [
  { label: "Formatting", key: "formatting", max: 20 },
  { label: "Keywords", key: "keywords", max: 25 },
  { label: "Content quality", key: "content", max: 25 },
  { label: "Skill validation", key: "skill_validation", max: 15 },
  { label: "ATS compatibility", key: "ats_compatibility", max: 15 },
];

export function ScoreBreakdownCard({ analysis }) {
  const componentScores = analysis?.component_scores || {};

  const formatFraction = (val, max) => {
    const formattedVal = String(Math.round(val)).padStart(2, "0");
    const formattedMax = String(max).padStart(2, "0");
    return `${formattedVal}/${formattedMax}`;
  };

  return (
    <div className="bg-[#151719] border border-[#292C30] rounded-xl p-6 h-full flex flex-col justify-between">
      <div>
        <h3 className="text-xs font-semibold text-[#F5F5F5] mb-5">
          Score breakdown
        </h3>

        <div className="space-y-4">
          {COMPONENTS_CONFIG.map(({ label, key, max }) => {
            const rawVal = Number(componentScores[key] ?? 0);
            const val = Math.round(rawVal);
            const pct = Math.min(Math.max((val / max) * 100, 0), 100);

            return (
              <div key={key} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#F5F5F5] font-medium">{label}</span>
                  <span className="font-mono text-[#9CA3AF] text-[11px]">
                    {formatFraction(val, max)}
                  </span>
                </div>
                <div className="w-full bg-[#0F1113] border border-[#292C30]/50 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#3B82F6] rounded-full transition-all duration-500"
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

function ScoreDisplay({ analysis, filename }) {
  return (
    <div className="space-y-6">
      <ScoreGaugeCard analysis={analysis} filename={filename} />
    </div>
  );
}

export default ScoreDisplay;
