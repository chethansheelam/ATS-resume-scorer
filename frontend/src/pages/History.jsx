import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [downloadingId, setDownloadingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    let ignore = false;
    api.get("/api/v1/history")
      .then((res) => {
        if (!ignore) {
          setHistory(res.data || []);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!ignore) {
          setError(err.response?.data?.detail || "Could not load history records.");
          setLoading(false);
        }
      });
    return () => {
      ignore = true;
    };
  }, []);

  const handleDelete = async (analysisId) => {
    if (!window.confirm("Are you sure you want to delete this analysis record?")) return;
    setDeletingId(analysisId);
    try {
      await api.delete(`/api/v1/history/${analysisId}`);
      setHistory((prev) => prev.filter((item) => item.id !== analysisId));
    } catch (err) {
      alert(err.response?.data?.detail || "Failed to delete analysis record.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleDownloadPdf = async (analysisId, filename) => {
    setDownloadingId(analysisId);
    try {
      const response = await api.get(`/api/v1/history/${analysisId}/pdf`, {
        responseType: "blob",
      });
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `ats_report_${filename || analysisId}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch {
      alert("Failed to download PDF report.");
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#F5F5F5] tracking-tight">Analysis History</h2>
          <p className="text-xs sm:text-sm text-[#9CA3AF] mt-1">
            Historical evaluations, dimension scores, and downloadable PDF reports stored for your account.
          </p>
        </div>
        <Link
          to="/scorer"
          className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-[#3B82F6] hover:bg-[#2563EB] self-start sm:self-auto transition-colors"
        >
          + New Analysis
        </Link>
      </div>

      {error && (
        <div className="p-4 bg-[#EF4444]/10 border border-[#EF4444]/30 text-[#EF4444] rounded-xl text-xs font-medium">
          {error}
        </div>
      )}

      {loading ? (
        <div className="bg-[#151719] border border-[#292C30] rounded-xl p-12 text-center text-xs text-[#9CA3AF]">
          Loading historical analyses...
        </div>
      ) : history.length === 0 ? (
        <div className="bg-[#151719] border border-[#292C30] rounded-xl p-12 text-center space-y-4">
          <div className="text-4xl">📁</div>
          <h3 className="text-base font-bold text-[#F5F5F5]">No saved analyses yet</h3>
          <p className="text-xs text-[#9CA3AF] max-w-sm mx-auto">
            Upload and score a resume on the ATS Scorer page to start building your analysis history.
          </p>
          <Link to="/scorer" className="px-5 py-2.5 rounded-lg text-xs font-semibold text-white bg-[#3B82F6] hover:bg-[#2563EB] inline-block transition-colors">
            Go to ATS Scorer
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((item) => {
            const score = Math.round(Number(item.analysis_result?.ats_score ?? item.analysis_result?.ATS_score ?? 0));
            const dateStr = item.created_at ? new Date(item.created_at).toLocaleString() : "--";
            const interpretation = item.analysis_result?.interpretation || "";
            const components = item.analysis_result?.component_scores;
            const jdComp = item.analysis_result?.jd_comparison || item.analysis_result?.jd_match_analysis;

            return (
              <div key={item.id} className="bg-[#151719] border border-[#292C30] rounded-xl p-6 space-y-4 hover:border-[#3B82F6]/50 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="text-base font-semibold text-[#F5F5F5] flex items-center gap-2">
                      <span>📄</span> {item.filename || "Resume"}
                    </h3>
                    <p className="text-[11px] text-[#9CA3AF]">Analyzed on {dateStr}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right mr-2">
                      <span className="text-2xl font-bold text-[#3B82F6]">{score}</span>
                      <span className="text-xs text-[#9CA3AF] font-normal"> / 100</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDownloadPdf(item.id, item.filename)}
                      disabled={downloadingId === item.id}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium text-[#F5F5F5] bg-[#0F1113] hover:bg-[#1E2124] transition-colors border border-[#292C30] disabled:opacity-50 cursor-pointer"
                    >
                      {downloadingId === item.id ? "Exporting..." : "Export PDF"}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      disabled={deletingId === item.id}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium text-[#EF4444] bg-[#EF4444]/10 hover:bg-[#EF4444]/20 border border-[#EF4444]/30 transition-colors disabled:opacity-50 cursor-pointer"
                    >
                      {deletingId === item.id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>

                {interpretation && (
                  <p className="text-xs text-[#9CA3AF] bg-[#0F1113] p-3 rounded-lg border border-[#292C30] leading-relaxed">
                    {interpretation}
                  </p>
                )}

                {/* Score Breakdown Footer */}
                {components && (
                  <div className="flex flex-wrap gap-x-4 gap-y-2 pt-3 border-t border-[#292C30] text-[11px] text-[#9CA3AF] font-medium">
                    <span>Formatting: <strong className="text-[#F5F5F5]">{components.formatting ?? "--"}/20</strong></span>
                    <span>Keywords: <strong className="text-[#F5F5F5]">{components.keywords ?? "--"}/25</strong></span>
                    <span>Content: <strong className="text-[#F5F5F5]">{components.content ?? "--"}/25</strong></span>
                    <span>Skill Validation: <strong className="text-[#F5F5F5]">{components.skill_validation ?? "--"}/15</strong></span>
                    <span>ATS Compatibility: <strong className="text-[#F5F5F5]">{components.ats_compatibility ?? "--"}/15</strong></span>
                    {jdComp && (
                      <span className="text-[#3B82F6] font-medium bg-[#3B82F6]/10 px-2 py-0.5 rounded-md border border-[#3B82F6]/30">
                        JD Match: {Math.round(Number(jdComp.match_percentage ?? 0))}%
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default History;