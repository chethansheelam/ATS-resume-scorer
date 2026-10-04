import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { supabase } from "../services/supabase";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      if (isSignUp) {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });
        if (signUpError) throw signUpError;

        if (data?.user && !data?.session) {
          setMessage("Account created! Check your email to confirm your account.");
        } else {
          navigate("/dashboard");
        }
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) throw signInError;
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.message || "Authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin + "/dashboard",
        },
      });
      if (error) throw error;
    } catch (err) {
      setError(err.message || "Google sign-in failed.");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-6 px-4">
      <div className="max-w-4xl w-full pro-card border border-slate-800 overflow-hidden flex flex-col md:flex-row shadow-2xl">
        {/* Left Branding Pane */}
        <div className="md:w-5/12 bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 p-8 sm:p-12 text-white flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-800/80 relative">
          <div>
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white text-base shadow-lg shadow-indigo-500/30">
                🎯
              </div>
              <span className="font-extrabold text-lg text-white">ATS Pro</span>
            </div>

            <h3 className="text-2xl font-black text-white tracking-tight leading-snug">
              Boost Your Interview Callback Rate
            </h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Real-time heuristic & deep learning resume evaluation built for engineering careers.
            </p>
          </div>

          <div className="my-8 space-y-3.5 text-xs text-slate-300">
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">✓</span>
              <span>5-pillar ATS scoring algorithm</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">✓</span>
              <span>Semantic project & skill verification</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">✓</span>
              <span>Direct PDF report generation</span>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 border-t border-slate-800 pt-4">
            🔒 Local spaCy & transformer models guarantee total user privacy.
          </div>
        </div>

        {/* Right Form Pane */}
        <div className="md:w-7/12 p-8 sm:p-12 bg-[#0d1322] flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              {isSignUp ? "Create an account" : "Welcome back"}
            </h2>
            <p className="text-xs text-slate-400 mt-1 mb-6">
              {isSignUp ? "Start analyzing your resumes with local AI models" : "Sign in to access your analyses and export history"}
            </p>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors mb-5"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              Continue with Google
            </button>

            <div className="flex items-center gap-3 my-5 text-[11px] text-slate-500">
              <div className="flex-1 h-px bg-slate-800" />
              <span>or email</span>
              <div className="flex-1 h-px bg-slate-800" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
                <input
                  type="email"
                  className="pro-input w-full px-3.5 py-2.5 text-xs"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Password</label>
                <input
                  type="password"
                  className="pro-input w-full px-3.5 py-2.5 text-xs"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
              </div>

              {error && (
                <div className="p-3 bg-red-950/50 border border-red-800/50 text-red-300 rounded-xl text-xs font-medium">
                  {error}
                </div>
              )}

              {message && (
                <div className="p-3 bg-emerald-950/50 border border-emerald-800/50 text-emerald-300 rounded-xl text-xs font-medium">
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-accent py-2.5 px-4 rounded-xl text-xs"
              >
                {loading ? "Processing..." : isSignUp ? "Create Account" : "Sign In"}
              </button>
            </form>

            <div className="mt-6 text-center text-xs text-slate-400">
              {isSignUp ? (
                <span>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setIsSignUp(false);
                      setError("");
                      setMessage("");
                    }}
                    className="text-indigo-400 font-bold hover:underline"
                  >
                    Sign In
                  </button>
                </span>
              ) : (
                <span>
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setIsSignUp(true);
                      setError("");
                      setMessage("");
                    }}
                    className="text-indigo-400 font-bold hover:underline"
                  >
                    Sign Up
                  </button>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;