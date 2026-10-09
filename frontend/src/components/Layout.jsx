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
    `px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 ${
      isActive
        ? "bg-[#151719] text-[#F5F5F5] border border-[#292C30] shadow-xs"
        : "text-[#9CA3AF] hover:text-[#F5F5F5] hover:bg-[#151719]/60"
    }`;

  return (
    <div className="min-h-screen flex flex-col bg-[#0F1113] text-[#F5F5F5] font-sans selection:bg-[#3B82F6] selection:text-white">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-[#0F1113]/95 backdrop-blur-md border-b border-[#292C30]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-xs transition-transform group-hover:scale-105 bg-[#3B82F6]">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 7V5a2 2 0 0 1 2-2h2" />
                  <path d="M17 3h2a2 2 0 0 1 2 2v2" />
                  <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
                  <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
                  <circle cx="12" cy="12" r="1" fill="currentColor" />
                </svg>
              </div>
              <span className="font-bold text-sm tracking-tight text-[#F5F5F5]">
                ATS Resume Scorer
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
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
                  <span className="text-xs font-semibold text-[#F5F5F5]">{user.email?.split("@")[0]}</span>
                  <span className="text-[10px] text-[#9CA3AF] font-mono">{user.email}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 text-xs font-medium text-[#F5F5F5] bg-[#151719] hover:bg-[#1E2124] rounded-lg transition-colors border border-[#292C30]"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3 py-1.5 text-xs font-medium text-[#9CA3AF] hover:text-[#F5F5F5] transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/login?mode=signup"
                  className="px-3.5 py-1.5 text-xs font-medium text-white bg-[#3B82F6] hover:bg-[#2563EB] rounded-lg shadow-xs transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-[#292C30] bg-[#0F1113] py-6 text-center text-xs text-[#9CA3AF]">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>ATS Resume Scorer & Skill Matcher — Powered by Local NLP & Embeddings</span>
          <span className="text-[#3B82F6] font-medium">100% Privacy & Data Security</span>
        </div>
      </footer>
    </div>
  );
}

export default Layout;