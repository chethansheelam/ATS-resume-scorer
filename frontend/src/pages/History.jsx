import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [downloadingId, setDownloadingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await api.get("/api/v1/history");
      setHistory(res.data || []);
    } catch (err) {
      setError(err.response?.data?.detail || "Could not load history records.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
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
    } catch (err) {
      alert("Failed to download PDF report.");
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">📊 Analysis History</h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Historical evaluations, dimension scores, and downloadable PDF reports stored for your account.
          </p>
        </div>
        <Link
          to="/scorer"
          className="btn-accent px-4 py-2 rounded-xl text-xs font-bold self-start sm:self-auto"
        >
          + New Analysis
        </Link>
      </div>

      {error && (
        <div className="p-4 bg-red-950/50 border border-red-800 text-red-300 rounded-xl text-xs font-medium">
          {error}
        </div>
      )}

      {loading ? (
        <div className="pro-card p-12 text-center text-xs text-slate-500">
          Loading historical analyses...
        </div>
      ) : history.length === 0 ? (
        <div className="pro-card p-12 text-center space-y-4">
          <div className="text-4xl">📁</div>
          <h3 className="text-base font-bold text-slate-200">No saved analyses yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Upload and score a resume on the ATS Scorer page to start building your analysis history.
          </p>
          <Link to="/scorer" className="btn-accent px-5 py-2.5 rounded-xl text-xs font-bold inline-block">
            🎯 Go to ATS Scorer
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
              <div key={item.id} className="pro-card pro-card-hover p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <span>📄</span> {item.filename || "Resume"}
                    </h3>
                    <p className="text-[11px] text-slate-400">Analyzed on {dateStr}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right mr-2">
                      <span className="text-2xl font-black text-indigo-400">{score}</span>
                      <span className="text-xs text-slate-500 font-medium"> / 100</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDownloadPdf(item.id, item.filename)}
                      disabled={downloadingId === item.id}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 bg-slate-800/80 hover:bg-slate-700 transition-colors border border-slate-700 disabled:opacity-50"
                    >
                      {downloadingId === item.id ? "Exporting..." : "📑 Export PDF"}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      disabled={deletingId === item.id}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-300 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/50 transition-colors disabled:opacity-50"
                    >
                      {deletingId === item.id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>

                {interpretation && (
                  <p className="text-xs text-slate-300 bg-slate-900/60 p-3 rounded-xl border border-slate-800 leading-relaxed">
                    {interpretation}
                  </p>
                )}

                {/* Score Breakdown Footer */}
                {components && (
                  <div className="flex flex-wrap gap-x-4 gap-y-2 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 font-medium">
                    <span>Formatting: <strong className="text-slate-200">{components.formatting ?? "--"}/20</strong></span>
                    <span>Keywords: <strong className="text-slate-200">{components.keywords ?? "--"}/25</strong></span>
                    <span>Content: <strong className="text-slate-200">{components.content ?? "--"}/25</strong></span>
                    <span>Skill Validation: <strong className="text-slate-200">{components.skill_validation ?? "--"}/15</strong></span>
                    <span>ATS Compatibility: <strong className="text-slate-200">{components.ats_compatibility ?? "--"}/15</strong></span>
                    {jdComp && (
                      <span className="text-indigo-400 font-bold bg-indigo-950/60 px-2 py-0.5 rounded-md border border-indigo-500/30">
                        🎯 JD Match: {Math.round(Number(jdComp.match_percentage ?? 0))}%
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