import { useState } from "react";
import api from "../services/api";
import { ScoreGaugeCard, ScoreBreakdownCard } from "./ScoreDisplay";
import StrengthsIssues from "./StrengthsIssues";
import SkillValidation from "./SkillValidation";
import JDComparison from "./JDComparison";
import DetailedFeedback from "./DetailedFeedback";
import ActionItems from "./ActionItems";
import Recommendations from "./Recommendations";

function ResultsDashboard({ analysis, onReset, filename }) {
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [showDetailed, setShowDetailed] = useState(false);

  const jdData = analysis?.jd_comparison || analysis?.jd_match_analysis;

  // Plain-text summary generator
  const generateTxtSummary = () => {
    const score = Number(analysis?.ATS_score ?? analysis?.ats_score ?? 0);
    const lines = [`ATS Resume Score: ${score.toFixed(0)}/100`, ""];

    if (analysis?.strengths?.length > 0) {
      lines.push("STRENGTHS:");
      analysis.strengths.forEach((s) => lines.push(`  - ${s}`));
      lines.push("");
    }

    if (analysis?.critical_issues?.length > 0) {
      lines.push("CRITICAL ISSUES:");
      analysis.critical_issues.forEach((c) => lines.push(`  - ${c}`));
      lines.push("");
    }

    if (analysis?.suggestions?.length > 0) {
      lines.push("SUGGESTIONS:");
      analysis.suggestions.forEach((s) => lines.push(`  - ${s}`));
      lines.push("");
    }

    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `ats_summary_${filename || "resume"}.txt`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  };

  const handleDownloadPdf = async () => {
    setDownloadingPdf(true);
    try {
      const response = await api.post("/api/v1/generate-pdf", analysis, {
        responseType: "blob",
      });
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `ats_report_${filename || "resume"}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch {
      alert("Failed to export PDF report from backend.");
    } finally {
      setDownloadingPdf(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Header with Back Navigation and Exports */}
      <div className="flex items-center justify-between pb-1">
        <button
          type="button"
          onClick={onReset}
          className="text-xs text-[#9CA3AF] hover:text-[#F5F5F5] flex items-center gap-1.5 transition-colors font-medium group cursor-pointer"
        >
          <span className="group-hover:-translate-x-0.5 transition-transform">←</span>
          <span>New analysis</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={generateTxtSummary}
            className="px-3 py-1.5 rounded-lg text-xs font-medium text-[#F5F5F5] bg-[#151719] hover:bg-[#1E2124] border border-[#292C30] transition-colors cursor-pointer"
          >
            Summary (.txt)
          </button>
          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={downloadingPdf}
            className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-white bg-[#3B82F6] hover:bg-[#2563EB] disabled:opacity-50 transition-colors shadow-xs cursor-pointer"
          >
            {downloadingPdf ? "Generating..." : "Download PDF"}
          </button>
        </div>
      </div>

      {/* Row 1: Overall Score Gauge Card */}
      <ScoreGaugeCard analysis={analysis} filename={filename} />

      {/* Row 2: Two equal cards: Score Breakdown + Key strengths & Critical issues */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
        <ScoreBreakdownCard analysis={analysis} />
        <StrengthsIssues analysis={analysis} />
      </div>

      {/* Row 3: Skill Validation */}
      <SkillValidation analysis={analysis} />

      {/* Row 4: JD Comparison Analysis (if present) */}
      {jdData && <JDComparison jdData={jdData} />}

      {/* Additional In-Depth Insights (Collapsible to preserve all existing capabilities) */}
      <div className="pt-2">
        <button
          type="button"
          onClick={() => setShowDetailed(!showDetailed)}
          className="w-full py-2.5 px-4 rounded-xl text-xs font-medium text-[#9CA3AF] hover:text-[#F5F5F5] bg-[#151719] border border-[#292C30] flex items-center justify-between transition-colors cursor-pointer"
        >
          <span>{showDetailed ? "Hide in-depth feedback & action items" : "View in-depth feedback & prioritized action items"}</span>
          <span>{showDetailed ? "▲" : "▼"}</span>
        </button>

        {showDetailed && (
          <div className="space-y-4 pt-4">
            <DetailedFeedback analysis={analysis} />
            <ActionItems analysis={analysis} />
            <Recommendations analysis={analysis} />
          </div>
        )}
      </div>
    </div>
  );
}

export default ResultsDashboard;
