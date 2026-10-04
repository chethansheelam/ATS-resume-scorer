import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Dashboard() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await api.get("/api/v1/history");
        setHistory(res.data || []);
      } catch (err) {
        setError(err.response?.data?.detail || "Could not load history metrics.");
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  const totalAnalyses = history.length;
  const latestAnalysis = history.length > 0 ? history[0] : null;
  const latestScore = latestAnalysis
    ? Math.round(Number(latestAnalysis.analysis_result?.ats_score ?? latestAnalysis.analysis_result?.ATS_score ?? 0))
    : "--";

  const avgScore =
    totalAnalyses > 0
      ? Math.round(
          history.reduce((acc, curr) => {
            const sc = Number(curr.analysis_result?.ats_score ?? curr.analysis_result?.ATS_score ?? 0);
            return acc + sc;
          }, 0) / totalAnalyses
        )
      : "--";

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-extrabold text-white tracking-tight">📊 Analytics Dashboard</h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Track historical ATS compatibility scores, keyword match performance, and resume iterations.
        </p>
      </div>

      {error && (
        <div className="p-4 bg-red-950/50 border border-red-800 text-red-300 rounded-xl text-xs font-medium">
          {error}
        </div>
      )}

      {loading ? (
        <div className="pro-card p-12 text-center text-xs text-slate-500">
          Loading metrics...
        </div>
      ) : (
        <>
          {/* Top 3 KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="pro-card pro-card-hover p-6 space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Analyses</span>
              <div className="text-3xl font-black text-white">{totalAnalyses}</div>
              <p className="text-xs text-slate-400">Resumes evaluated</p>
            </div>

            <div className="pro-card pro-card-hover p-6 space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Latest Score</span>
              <div className="text-3xl font-black text-indigo-400">
                {latestScore}
                {latestScore !== "--" && <span className="text-sm text-slate-500 font-normal"> / 100</span>}
              </div>
              <p className="text-xs text-slate-400 truncate">{latestAnalysis?.filename || "No activity yet"}</p>
            </div>

            <div className="pro-card pro-card-hover p-6 space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Average Score</span>
              <div className="text-3xl font-black text-white">
                {avgScore}
                {avgScore !== "--" && <span className="text-sm text-slate-500 font-normal"> / 100</span>}
              </div>
              <p className="text-xs text-slate-400">Across all runs</p>
            </div>
          </div>

          {/* Recent Activity Table */}
          <div className="pro-card p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">Recent Activity</h3>
              <Link
                to="/scorer"
                className="btn-accent px-3.5 py-1.5 rounded-lg text-xs"
              >
                + Analyze Resume
              </Link>
            </div>

            {history.length === 0 ? (
              <div className="text-center py-10 space-y-3">
                <p className="text-xs text-slate-500">No previous resume evaluations found.</p>
                <Link to="/scorer" className="btn-accent px-5 py-2 rounded-xl text-xs font-bold inline-block">
                  Run First Analysis
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                      <th className="py-3 px-3">File</th>
                      <th className="py-3 px-3">ATS Score</th>
                      <th className="py-3 px-3">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {history.slice(0, 5).map((item) => {
                      const sc = Math.round(Number(item.analysis_result?.ats_score ?? item.analysis_result?.ATS_score ?? 0));
                      const dateStr = item.created_at ? new Date(item.created_at).toLocaleDateString() : "--";
                      return (
                        <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="py-3.5 px-3 font-semibold text-slate-200 flex items-center gap-2">
                            <span>📄</span> {item.filename || "Resume"}
                          </td>
                          <td className="py-3.5 px-3">
                            <span className="font-black text-indigo-400">{sc}</span>
                            <span className="text-slate-500 font-normal"> / 100</span>
                          </td>
                          <td className="py-3.5 px-3 text-slate-400">{dateStr}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;