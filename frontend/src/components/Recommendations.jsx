function Recommendations({ analysis }) {
  const suggestions = analysis?.suggestions || [];

  if (suggestions.length === 0) return null;

  return (
    <div className="bg-[#151719] border border-[#292C30] rounded-xl p-6 sm:p-8 space-y-4">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-[#3B82F6]/10 border border-[#3B82F6]/20 text-[#3B82F6] flex items-center justify-center font-bold text-sm">
          💡
        </div>
        <h3 className="text-base font-bold text-[#F5F5F5]">Strategic Recommendations</h3>
      </div>

      <ul className="space-y-2.5">
        {suggestions.map((sug, idx) => (
          <li key={idx} className="flex items-start gap-2.5 text-xs text-[#9CA3AF] leading-relaxed">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] shrink-0 mt-1.5" />
            <span>{sug}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Recommendations;
