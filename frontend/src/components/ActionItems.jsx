const SEVERITY_RANK = { critical: 0, high: 1, medium: 2, low: 3 };

function ActionItems({ analysis }) {
  const items = [];

  for (const issue of analysis?.detailed_feedback || []) {
    const level = (issue?.severity_level || "low").toLowerCase();
    const title = issue?.issue_title || "";
    for (const action of issue?.action_items || []) {
      items.push({ level, title, action });
    }
  }

  if (items.length === 0) {
    for (const suggestion of analysis?.suggestions || []) {
      items.push({ level: "medium", title: "General", action: suggestion });
    }
  }

  items.sort((a, b) => (SEVERITY_RANK[a.level] ?? 99) - (SEVERITY_RANK[b.level] ?? 99));

  if (items.length === 0) return null;

  const badgeTheme = {
    critical: "bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/30",
    high: "bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/30",
    medium: "bg-[#3B82F6]/10 text-[#3B82F6] border-[#3B82F6]/30",
    low: "bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/30",
  };

  return (
    <div className="bg-[#151719] border border-[#292C30] rounded-xl p-6 sm:p-8 space-y-4">
      <div>
        <h3 className="text-base font-bold text-[#F5F5F5]">Prioritized Action Items</h3>
        <p className="text-xs text-[#9CA3AF] mt-0.5">
          Sorted by urgency to quickly maximize ATS readability and score.
        </p>
      </div>

      <div className="space-y-2">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-xl bg-[#0F1113] border border-[#292C30] flex items-start gap-3"
          >
            <span
              className={`shrink-0 px-2 py-0.5 rounded-md border text-[10px] font-bold uppercase ${
                badgeTheme[item.level] || badgeTheme.low
              }`}
            >
              {item.level}
            </span>
            <div className="text-xs text-[#9CA3AF] leading-snug">
              <strong className="text-[#F5F5F5] font-semibold mr-1">[{item.title}]</strong>
              <span>{item.action}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ActionItems;
