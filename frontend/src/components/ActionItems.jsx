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
    critical: "bg-rose-950/60 text-rose-300 border-rose-500/40",
    high: "bg-amber-950/60 text-amber-300 border-amber-500/40",
    medium: "bg-blue-950/60 text-blue-300 border-blue-500/40",
    low: "bg-emerald-950/60 text-emerald-300 border-emerald-500/40",
  };

  return (
    <div className="pro-card p-6 sm:p-8 space-y-4">
      <div>
        <h3 className="text-base font-bold text-white">⚡ Prioritized Action Items</h3>
        <p className="text-xs text-slate-400 mt-0.5">
          Sorted by urgency to quickly maximize ATS readability and score.
        </p>
      </div>

      <div className="space-y-2">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3"
          >
            <span
              className={`shrink-0 px-2 py-0.5 rounded-md border text-[10px] font-black uppercase ${
                badgeTheme[item.level] || badgeTheme.low
              }`}
            >
              {item.level}
            </span>
            <div className="text-xs text-slate-300 leading-snug">
              <strong className="text-white font-bold mr-1">[{item.title}]</strong>
              <span>{item.action}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ActionItems;
