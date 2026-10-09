function SkillValidation({ analysis }) {
  const details = analysis?.skill_validation_details || {};
  const validated = details?.validated || [];
  const unvalidated = details?.unvalidated || [];

  return (
    <div className="bg-[#151719] border border-[#292C30] rounded-xl p-6 space-y-5">
      <h3 className="text-xs font-semibold text-[#F5F5F5]">
        Skill validation
      </h3>

      <div className="space-y-4">
        {/* Validated Skills */}
        <div className="space-y-2">
          <div className="text-[10px] font-mono uppercase tracking-wider text-[#9CA3AF]">
            VALIDATED ({validated.length})
          </div>
          {validated.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {validated.map((item, idx) => {
                const skillName = typeof item === "string" ? item : item?.skill || "Skill";
                return (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md bg-[#22C55E]/10 border border-[#22C55E]/20 text-[#22C55E] text-xs font-medium"
                  >
                    {skillName}
                  </span>
                );
              })}
            </div>
          ) : (
            <p className="text-xs text-[#9CA3AF] italic">No skills validated with supporting context.</p>
          )}
        </div>

        {/* Unvalidated Skills */}
        <div className="space-y-2 pt-2">
          <div className="text-[10px] font-mono uppercase tracking-wider text-[#9CA3AF]">
            UNVALIDATED ({unvalidated.length})
          </div>
          {unvalidated.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {unvalidated.map((item, idx) => {
                const skillName = typeof item === "string" ? item : item?.skill || "Skill";
                return (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md bg-[#F59E0B]/10 border border-[#F59E0B]/20 text-[#F59E0B] text-xs font-medium"
                  >
                    {skillName}
                  </span>
                );
              })}
            </div>
          ) : (
            <p className="text-xs text-[#9CA3AF] italic">No unvalidated skills detected.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SkillValidation;
