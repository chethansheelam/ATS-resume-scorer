import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const navItemClass = ({ isActive }) =>
    `px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
      isActive
        ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 shadow-xs"
        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
    }`;

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0f19] text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-[#0b0f19]/80 backdrop-blur-xl border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white text-base shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
                🎯
              </div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight text-white">ATS Pro</span>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full tracking-wide uppercase">
                  AI NLP
                </span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-1.5">
              <NavLink to="/" className={navItemClass}>
                Home
              </NavLink>
              <NavLink to="/scorer" className={navItemClass}>
                ATS Scorer
              </NavLink>
              <NavLink to="/dashboard" className={navItemClass}>
                Dashboard
              </NavLink>
              <NavLink to="/history" className={navItemClass}>
                History
              </NavLink>
              <NavLink to="/resources" className={navItemClass}>
                Resources & Tips
              </NavLink>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex flex-col text-right">
                  <span className="text-xs font-semibold text-slate-200">{user.email?.split("@")[0]}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{user.email}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-3.5 py-1.5 text-xs font-semibold text-slate-300 bg-slate-800/80 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="btn-accent px-4 py-1.5 rounded-lg text-xs"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-[#080c14] py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>ATS Resume Scorer & Skill Matcher — Powered by Local spaCy NLP & SentenceTransformers</span>
          <span className="text-indigo-400 font-semibold">100% Privacy & Data Security</span>
        </div>
      </footer>
    </div>
  );
}

export default Layout;