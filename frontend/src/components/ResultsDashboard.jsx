import { useState } from "react";
import api from "../services/api";
import ScoreDisplay from "./ScoreDisplay";
import StrengthsIssues from "./StrengthsIssues";
import SkillValidation from "./SkillValidation";
import JDComparison from "./JDComparison";
import DetailedFeedback from "./DetailedFeedback";
import ActionItems from "./ActionItems";
import Recommendations from "./Recommendations";

function ResultsDashboard({ analysis, onReset, filename }) {
  const [downloadingPdf, setDownloadingPdf] = useState(false);

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
    } catch (err) {
      alert("Failed to export PDF report from backend.");
    } finally {
      setDownloadingPdf(false);
    }
  };

  return (
    <div className="space-y-6 pt-2">
      {/* Action Header Card */}
      <div className="pro-card p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-l-4 border-l-indigo-500">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h2 className="text-lg font-bold text-white">Analysis Results Ready</h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Report for <strong className="text-slate-200">{filename || "Uploaded Resume"}</strong>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={downloadingPdf}
            className="flex-1 sm:flex-initial btn-accent px-4 py-2 rounded-xl text-xs"
          >
            {downloadingPdf ? "Generating PDF..." : "📑 Download PDF"}
          </button>

          <button
            type="button"
            onClick={generateTxtSummary}
            className="flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-semibold text-slate-200 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 transition-colors"
          >
            📄 Summary (.txt)
          </button>

          <button
            type="button"
            onClick={onReset}
            className="flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 bg-slate-800/40 hover:bg-slate-800 transition-colors"
          >
            ↺ Reset
          </button>
        </div>
      </div>

      {/* 1. Overall Score & 5-Component Breakdown */}
      <ScoreDisplay analysis={analysis} />

      {/* 2. Strengths & Critical Issues */}
      <StrengthsIssues analysis={analysis} />

      {/* 3. Skill Validation */}
      <SkillValidation analysis={analysis} />

      {/* 4. JD Comparison (if present) */}
      {jdData && <JDComparison jdData={jdData} />}

      {/* 5. Detailed Feedback */}
      <DetailedFeedback analysis={analysis} />

      {/* 6. Prioritized Action Items */}
      <ActionItems analysis={analysis} />

      {/* 7. Strategic Recommendations */}
      <Recommendations analysis={analysis} />
    </div>
  );
}

export default ResultsDashboard;
