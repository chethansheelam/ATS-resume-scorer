function Recommendations({ analysis }) {
  const suggestions = analysis?.suggestions || [];

  if (suggestions.length === 0) return null;

  return (
    <div className="pro-card p-6 sm:p-8 space-y-4">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-sm">
          💡
        </div>
        <h3 className="text-base font-bold text-white">Strategic Recommendations</h3>
      </div>

      <ul className="space-y-2.5">
        {suggestions.map((sug, idx) => (
          <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0 mt-1.5" />
            <span>{sug}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Recommendations;
