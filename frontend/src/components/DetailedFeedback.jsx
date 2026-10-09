import { useState } from "react";

const SEVERITY_ORDER = ["critical", "high", "medium", "low"];

const SEVERITY_THEMES = {
  critical: { badge: "bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/30", border: "border-l-[#EF4444]", text: "text-[#EF4444]" },
  high: { badge: "bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/30", border: "border-l-[#F59E0B]", text: "text-[#F59E0B]" },
  medium: { badge: "bg-[#3B82F6]/10 text-[#3B82F6] border-[#3B82F6]/30", border: "border-l-[#3B82F6]", text: "text-[#3B82F6]" },
  low: { badge: "bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/30", border: "border-l-[#22C55E]", text: "text-[#22C55E]" },
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
    <div className="bg-[#151719] border border-[#292C30] rounded-xl p-6 sm:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-[#F5F5F5]">Detailed Issue Breakdown</h3>
          <p className="text-xs text-[#9CA3AF] mt-0.5">
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
              <h4 className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded-md border text-[10px] font-bold ${theme.badge}`}>
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
                      className={`border border-[#292C30] ${theme.border} border-l-4 rounded-xl bg-[#0F1113] overflow-hidden transition-colors`}
                    >
                      <button
                        type="button"
                        onClick={() => toggleExpand(itemKey)}
                        className="w-full text-left p-4 flex items-center justify-between gap-4 hover:bg-[#151719]/60 transition-colors cursor-pointer"
                      >
                        <div className="space-y-1">
                          <span className="font-semibold text-xs sm:text-sm text-[#F5F5F5] block">
                            {issue.issue_title || "Issue detected"}
                          </span>
                          {issue.ats_impact && (
                            <span className="text-xs text-[#9CA3AF] block">
                              <strong className="text-[#F5F5F5]">ATS Impact:</strong> {issue.ats_impact}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-xs text-[#3B82F6] font-medium">
                            {isExpanded ? "Collapse ▲" : "View Fix ▼"}
                          </span>
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="p-4 bg-[#151719] border-t border-[#292C30] text-xs text-[#9CA3AF] space-y-3 leading-relaxed">
                          {issue.explanation && (
                            <div>
                              <strong className="text-[#F5F5F5] block mb-0.5">What's happening:</strong>
                              <p className="text-[#9CA3AF]">{issue.explanation}</p>
                            </div>
                          )}

                          {issue.where_it_appears && (
                            <div>
                              <strong className="text-[#F5F5F5] block mb-0.5">Where it appears:</strong>
                              <p className="text-[#F5F5F5] font-mono text-[11px] bg-[#0F1113] p-2 rounded-md border border-[#292C30]">
                                {issue.where_it_appears}
                              </p>
                            </div>
                          )}

                          {issue.how_to_fix && (
                            <div>
                              <strong className="text-[#F5F5F5] block mb-0.5">How to fix:</strong>
                              <p className="text-[#9CA3AF]">{issue.how_to_fix}</p>
                            </div>
                          )}

                          {issue.action_items?.length > 0 && (
                            <div className="space-y-1">
                              <strong className="text-[#F5F5F5] block">Action checklist:</strong>
                              <ul className="list-disc pl-4 space-y-1 text-[#9CA3AF]">
                                {issue.action_items.map((act, aIdx) => (
                                  <li key={aIdx}>{act}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {issue.example_improvement && (
                            <div className="p-3 bg-[#22C55E]/10 border border-[#22C55E]/20 rounded-xl space-y-1">
                              <strong className="text-[#22C55E] block font-bold text-[10px] uppercase tracking-wide">
                                Recommended improvement example:
                              </strong>
                              <pre className="text-[11px] text-[#22C55E] font-mono whitespace-pre-wrap">
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
