function StrengthsIssues({ analysis }) {
  const strengths = analysis?.strengths || [];
  const critical = analysis?.critical_issues || [];

  return (
    <div className="bg-[#151719] border border-[#292C30] rounded-xl p-6 h-full flex flex-col justify-between space-y-5">
      {/* Key strengths */}
      <div className="space-y-3">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#F5F5F5]">
          <svg className="w-3.5 h-3.5 text-[#22C55E]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>Key strengths</span>
        </div>

        {strengths.length > 0 ? (
          <ul className="space-y-2">
            {strengths.slice(0, 4).map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-[#9CA3AF]">
                <span className="text-[#22C55E] shrink-0 mt-0.5 text-[11px] font-bold">✓</span>
                <span className="leading-snug text-[#F5F5F5]/90">{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xs text-[#9CA3AF] italic">No specific strengths highlighted.</p>
        )}
      </div>

      {/* Critical issues */}
      <div className="space-y-3 pt-4 border-t border-[#292C30]">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#F5F5F5]">
          <svg className="w-3.5 h-3.5 text-[#EF4444]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          <span>Critical issues</span>
        </div>

        {critical.length > 0 ? (
          <ul className="space-y-2">
            {critical.slice(0, 4).map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-[#9CA3AF]">
                <span className="text-[#EF4444] shrink-0 mt-0.5 text-[11px] font-bold">✕</span>
                <span className="leading-snug text-[#F5F5F5]/90">{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xs text-[#22C55E]">✓ No critical issues found! Resume formatting is clean.</p>
        )}
      </div>
    </div>
  );
}

export default StrengthsIssues;
