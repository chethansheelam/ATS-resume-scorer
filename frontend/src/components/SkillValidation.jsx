import { useState } from "react";

function SkillValidation({ analysis }) {
  const details = analysis?.skill_validation_details || {};
  const validated = details?.validated || [];
  const unvalidated = details?.unvalidated || [];
  const total = details?.total || (validated.length + unvalidated.length);
  const pct = Math.round(Number(details?.validation_pct ?? 0));

  const [tab, setTab] = useState("validated");

  if (total === 0) {
    return (
      <div className="pro-card p-6">
        <h3 className="text-base font-bold text-white mb-2">✅ Skill Validation Analysis</h3>
        <p className="text-xs text-slate-500">No technical skills detected on the resume.</p>
      </div>
    );
  }

  return (
    <div className="pro-card p-6 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white">✅ Demonstrated Skill Validation</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            AI verifies if claimed skills have supporting evidence in your project & experience sections.
          </p>
        </div>

        <div className="inline-flex p-1 bg-slate-900 border border-slate-700/80 rounded-xl text-xs">
          <button
            type="button"
            className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all ${
              tab === "validated" ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30" : "text-slate-400 hover:text-slate-200"
            }`}
            onClick={() => setTab("validated")}
          >
            ✓ Validated ({validated.length})
          </button>
          <button
            type="button"
            className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all ${
              tab === "unvalidated" ? "bg-amber-600 text-white shadow-md shadow-amber-600/30" : "text-slate-400 hover:text-slate-200"
            }`}
            onClick={() => setTab("unvalidated")}
          >
            ! Unvalidated ({unvalidated.length})
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Skills</div>
          <div className="text-2xl font-black text-white mt-1">{total}</div>
        </div>
        <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-center">
          <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Validated</div>
          <div className="text-2xl font-black text-emerald-300 mt-1">{validated.length}</div>
        </div>
        <div className="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-800/40 text-center">
          <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">Validation Rate</div>
          <div className="text-2xl font-black text-indigo-300 mt-1">{pct}%</div>
        </div>
      </div>

      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-emerald-500 transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* Tab Panels */}
      {tab === "validated" ? (
        <div className="space-y-3">
          {validated.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {validated.map((item, idx) => {
                const skillName = item?.skill || "Skill";
                const projects = item?.projects || [];
                const similarity = item?.similarity;
                const matchStr = typeof similarity === "number" ? ` • ${Math.round(similarity * 100)}% match` : "";

                return (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-xs text-emerald-200 space-y-1"
                  >
                    <div className="font-bold flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-emerald-300">
                        <span className="text-emerald-400 font-extrabold">✓</span> {skillName}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5 rounded-full">
                        {matchStr ? matchStr.replace(" • ", "") : "Verified"}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-snug">
                      Demonstrated in: <span className="font-medium text-emerald-300">{projects.length > 0 ? projects.slice(0, 3).join(", ") : "Experience bullet points"}</span>
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-xs text-slate-500 italic">No skills validated with supporting context.</p>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-xs text-slate-400">
            These skills are listed on your resume but lack concrete project or experience evidence:
          </p>
          {unvalidated.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {unvalidated.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-amber-950/40 border border-amber-800/50 text-amber-300 text-xs font-semibold flex items-center gap-1.5"
                >
                  <span className="text-amber-500 font-bold">!</span>
                  {typeof skill === "string" ? skill : skill?.skill || "Skill"}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-emerald-400 font-semibold">✓ All listed skills are validated with evidence!</p>
          )}
        </div>
      )}
    </div>
  );
}

export default SkillValidation;
