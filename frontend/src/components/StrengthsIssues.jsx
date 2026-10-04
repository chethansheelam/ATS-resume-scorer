import { useState } from "react";

function StrengthsIssues({ analysis }) {
  const strengths = analysis?.strengths || [];
  const critical = analysis?.critical_issues || [];
  const summary = analysis?.issues_summary || [];
  const extraFlagged = summary.filter((s) => !critical.includes(s));

  const [showExtra, setShowExtra] = useState(false);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
      {/* Strengths Card */}
      <div className="pro-card p-6 border-l-4 border-l-emerald-500 space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
            💪
          </div>
          <h3 className="text-base font-bold text-white">Key Strengths</h3>
        </div>

        {strengths.length > 0 ? (
          <ul className="space-y-2.5">
            {strengths.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xs text-slate-500 italic">
            Keep optimizing your resume to highlight recognized strengths.
          </p>
        )}
      </div>

      {/* Critical Issues Card */}
      <div className="pro-card p-6 border-l-4 border-l-rose-500 space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-sm">
            🚨
          </div>
          <h3 className="text-base font-bold text-white">Critical Issues Found</h3>
        </div>

        {critical.length === 0 && summary.length === 0 ? (
          <div className="p-3.5 bg-emerald-950/40 text-emerald-300 border border-emerald-800/60 rounded-xl text-xs font-semibold">
            🎉 No critical issues detected! Your resume formatting and structure are clean.
          </div>
        ) : (
          <>
            <p className="text-[11px] font-semibold text-rose-400">
              Address these items first to prevent ATS parsing errors:
            </p>
            <ul className="space-y-2.5">
              {critical.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                  <span className="text-rose-400 font-bold shrink-0 mt-0.5">✕</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {extraFlagged.length > 0 && (
              <div className="pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowExtra(!showExtra)}
                  className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                >
                  <span>{showExtra ? "▼ Hide additional flagged items" : `▶ View additional flagged items (${extraFlagged.length})`}</span>
                </button>
                {showExtra && (
                  <ul className="mt-2.5 space-y-1.5 pl-3 border-l-2 border-slate-800 text-xs text-slate-400">
                    {extraFlagged.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default StrengthsIssues;
