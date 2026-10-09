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
        <h2 className="text-2xl font-bold text-[#F5F5F5] tracking-tight">Analytics Dashboard</h2>
        <p className="text-xs sm:text-sm text-[#9CA3AF] mt-1">
          Track historical ATS compatibility scores, keyword match performance, and resume iterations.
        </p>
      </div>

      {error && (
        <div className="p-4 bg-[#EF4444]/10 border border-[#EF4444]/30 text-[#EF4444] rounded-xl text-xs font-medium">
          {error}
        </div>
      )}

      {loading ? (
        <div className="bg-[#151719] border border-[#292C30] rounded-xl p-12 text-center text-xs text-[#9CA3AF]">
          Loading metrics...
        </div>
      ) : (
        <>
          {/* Top 3 KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-[#151719] border border-[#292C30] rounded-xl p-6 space-y-2 hover:border-[#3B82F6]/50 transition-colors">
              <span className="text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider">Total Analyses</span>
              <div className="text-3xl font-black text-[#F5F5F5]">{totalAnalyses}</div>
              <p className="text-xs text-[#9CA3AF]">Resumes evaluated</p>
            </div>

            <div className="bg-[#151719] border border-[#292C30] rounded-xl p-6 space-y-2 hover:border-[#3B82F6]/50 transition-colors">
              <span className="text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider">Latest Score</span>
              <div className="text-3xl font-black text-[#3B82F6]">
                {latestScore}
                {latestScore !== "--" && <span className="text-sm text-[#9CA3AF] font-normal"> / 100</span>}
              </div>
              <p className="text-xs text-[#9CA3AF] truncate">{latestAnalysis?.filename || "No activity yet"}</p>
            </div>

            <div className="bg-[#151719] border border-[#292C30] rounded-xl p-6 space-y-2 hover:border-[#3B82F6]/50 transition-colors">
              <span className="text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider">Average Score</span>
              <div className="text-3xl font-black text-[#F5F5F5]">
                {avgScore}
                {avgScore !== "--" && <span className="text-sm text-[#9CA3AF] font-normal"> / 100</span>}
              </div>
              <p className="text-xs text-[#9CA3AF]">Across all runs</p>
            </div>
          </div>

          {/* Recent Activity Table */}
          <div className="bg-[#151719] border border-[#292C30] rounded-xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[#F5F5F5]">Recent Activity</h3>
              <Link
                to="/scorer"
                className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-white bg-[#3B82F6] hover:bg-[#2563EB] transition-colors"
              >
                + Analyze Resume
              </Link>
            </div>

            {history.length === 0 ? (
              <div className="text-center py-10 space-y-3">
                <p className="text-xs text-[#9CA3AF]">No previous resume evaluations found.</p>
                <Link to="/scorer" className="px-5 py-2 rounded-lg text-xs font-semibold text-white bg-[#3B82F6] hover:bg-[#2563EB] inline-block transition-colors">
                  Run First Analysis
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#292C30] text-[#9CA3AF] font-semibold uppercase tracking-wider text-[10px]">
                      <th className="py-3 px-3">File</th>
                      <th className="py-3 px-3">ATS Score</th>
                      <th className="py-3 px-3">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#292C30]">
                    {history.slice(0, 5).map((item) => {
                      const sc = Math.round(Number(item.analysis_result?.ats_score ?? item.analysis_result?.ATS_score ?? 0));
                      const dateStr = item.created_at ? new Date(item.created_at).toLocaleDateString() : "--";
                      return (
                        <tr key={item.id} className="hover:bg-[#1C1F22] transition-colors">
                          <td className="py-3.5 px-3 font-medium text-[#F5F5F5] flex items-center gap-2">
                            <span>📄</span> {item.filename || "Resume"}
                          </td>
                          <td className="py-3.5 px-3">
                            <span className="font-bold text-[#3B82F6]">{sc}</span>
                            <span className="text-[#9CA3AF] font-normal"> / 100</span>
                          </td>
                          <td className="py-3.5 px-3 text-[#9CA3AF]">{dateStr}</td>
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