import { useState } from "react";

const SEVERITY_ORDER = ["critical", "high", "medium", "low"];

const SEVERITY_THEMES = {
  critical: { badge: "bg-rose-950/60 text-rose-300 border-rose-500/40", border: "border-l-rose-500", text: "text-rose-400" },
  high: { badge: "bg-amber-950/60 text-amber-300 border-amber-500/40", border: "border-l-amber-500", text: "text-amber-400" },
  medium: { badge: "bg-blue-950/60 text-blue-300 border-blue-500/40", border: "border-l-blue-500", text: "text-blue-400" },
  low: { badge: "bg-emerald-950/60 text-emerald-300 border-emerald-500/40", border: "border-l-emerald-500", text: "text-emerald-400" },
};

function DetailedFeedback({ analysis }) {
  const issues = analysis?.detailed_feedback || [];
  const [expandedIndices, setExpandedIndices] = useState({});

  if (issues.length === 0) return null;

  const toggleExpand = (idx) => {
    setExpandedIndices((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const grouped = SEVERITY_ORDER.reduce((acc, level) => {
    acc[level] = issues.filter((i) => (i.severity_level || "low").toLowerCase() === level);
    return acc;
  }, {});

  return (
    <div className="pro-card p-6 sm:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-white">🔍 Detailed Issue Breakdown</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            {issues.length} flagged item(s) categorized by severity and impact on ATS parsers.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {SEVERITY_ORDER.map((level) => {
          const items = grouped[level] || [];
          if (items.length === 0) return null;

          const theme = SEVERITY_THEMES[level] || SEVERITY_THEMES.low;

          return (
            <div key={level} className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded-md border text-[10px] font-black ${theme.badge}`}>
                  {level}
                </span>
                <span>({items.length} issue{items.length > 1 ? "s" : ""})</span>
              </h4>

              <div className="space-y-2.5">
                {items.map((issue, idx) => {
                  const itemKey = `${level}-${idx}`;
                  const isExpanded = !!expandedIndices[itemKey];

                  return (
                    <div
                      key={itemKey}
                      className={`border border-slate-800 ${theme.border} border-l-4 rounded-xl bg-slate-900/60 overflow-hidden shadow-xs transition-all`}
                    >
                      <button
                        type="button"
                        onClick={() => toggleExpand(itemKey)}
                        className="w-full text-left p-4 flex items-center justify-between gap-4 hover:bg-slate-800/40 transition-colors"
                      >
                        <div className="space-y-1">
                          <span className="font-bold text-xs sm:text-sm text-slate-100 block">
                            {issue.issue_title || "Issue detected"}
                          </span>
                          {issue.ats_impact && (
                            <span className="text-xs text-slate-400 block">
                              ⚡ <strong className="text-slate-300">ATS Impact:</strong> {issue.ats_impact}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-xs text-indigo-400 font-semibold">
                            {isExpanded ? "Collapse ▲" : "View Fix ▼"}
                          </span>
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="p-4 bg-slate-950/80 border-t border-slate-800 text-xs text-slate-300 space-y-3 leading-relaxed">
                          {issue.explanation && (
                            <div>
                              <strong className="text-white block mb-0.5">What's happening:</strong>
                              <p className="text-slate-400">{issue.explanation}</p>
                            </div>
                          )}

                          {issue.where_it_appears && (
                            <div>
                              <strong className="text-white block mb-0.5">Where it appears:</strong>
                              <p className="text-slate-300 font-mono text-[11px] bg-slate-900 p-2 rounded-md border border-slate-800">
                                {issue.where_it_appears}
                              </p>
                            </div>
                          )}

                          {issue.how_to_fix && (
                            <div>
                              <strong className="text-white block mb-0.5">How to fix:</strong>
                              <p className="text-slate-400">{issue.how_to_fix}</p>
                            </div>
                          )}

                          {issue.action_items?.length > 0 && (
                            <div className="space-y-1">
                              <strong className="text-white block">Action checklist:</strong>
                              <ul className="list-disc pl-4 space-y-1 text-slate-400">
                                {issue.action_items.map((act, aIdx) => (
                                  <li key={aIdx}>{act}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {issue.example_improvement && (
                            <div className="p-3 bg-emerald-950/30 border border-emerald-500/30 rounded-xl space-y-1">
                              <strong className="text-emerald-400 block font-bold text-[10px] uppercase tracking-wide">
                                ✨ Recommended improvement example:
                              </strong>
                              <pre className="text-[11px] text-emerald-200 font-mono whitespace-pre-wrap">
                                {issue.example_improvement}
                              </pre>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DetailedFeedback;
