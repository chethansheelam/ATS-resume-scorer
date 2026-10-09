import { useState } from "react";
import { useNavigate, Navigate, useSearchParams } from "react-router-dom";
import { supabase } from "../services/supabase";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();

  const [isSignUp, setIsSignUp] = useState(searchParams.get("mode") === "signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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

    if (isSignUp && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

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

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-10 px-4">
      <div className="max-w-md w-full bg-[#151719] border border-[#292C30] rounded-xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-xl font-bold text-[#F5F5F5] tracking-tight">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </h2>
          <p className="text-xs text-[#9CA3AF]">
            {isSignUp
              ? "Enter your details to create an account"
              : "Enter your credentials to access your account"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#F5F5F5] mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              className="pro-input w-full px-3.5 py-2.5 text-xs bg-[#0F1113] border border-[#292C30] rounded-lg text-[#F5F5F5] placeholder:text-[#9CA3AF]/50 focus:outline-none focus:border-[#3B82F6]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#F5F5F5] mb-1.5">
              Password
            </label>
            <input
              type="password"
              className="pro-input w-full px-3.5 py-2.5 text-xs bg-[#0F1113] border border-[#292C30] rounded-lg text-[#F5F5F5] placeholder:text-[#9CA3AF]/50 focus:outline-none focus:border-[#3B82F6]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>

          {isSignUp && (
            <div>
              <label className="block text-xs font-semibold text-[#F5F5F5] mb-1.5">
                Confirm Password
              </label>
              <input
                type="password"
                className="pro-input w-full px-3.5 py-2.5 text-xs bg-[#0F1113] border border-[#292C30] rounded-lg text-[#F5F5F5] placeholder:text-[#9CA3AF]/50 focus:outline-none focus:border-[#3B82F6]"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>
          )}

          {error && (
            <div className="p-3 bg-[#EF4444]/10 border border-[#EF4444]/30 text-[#EF4444] rounded-lg text-xs">
              {error}
            </div>
          )}

          {message && (
            <div className="p-3 bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E] rounded-lg text-xs">
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 rounded-lg text-xs font-medium text-white bg-[#3B82F6] hover:bg-[#2563EB] disabled:opacity-50 transition-colors shadow-xs cursor-pointer"
          >
            {loading ? "Processing..." : isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>

        <div className="text-center text-xs text-[#9CA3AF] pt-1">
          {isSignUp ? (
            <span>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(false);
                  setError("");
                  setMessage("");
                  setConfirmPassword("");
                }}
                className="text-[#3B82F6] font-medium hover:underline cursor-pointer"
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
                  setConfirmPassword("");
                }}
                className="text-[#3B82F6] font-medium hover:underline cursor-pointer"
              >
                Sign Up
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;