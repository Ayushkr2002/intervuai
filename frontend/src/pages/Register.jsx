import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${API_URL}/auth/register`,
        {
          name,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      login(response.data.user);

      toast.success(
        response.data.message || "Registration successful"
      );

      navigate("/dashboard");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Unable to create your account. Please try again.";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${API_URL}/auth/google`;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left side */}
        <div className="relative hidden overflow-hidden lg:flex lg:items-center lg:justify-center">
          <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/20 blur-3xl" />

          <div className="relative z-10 max-w-lg px-10">
            <Link
              to="/"
              className="text-2xl font-bold tracking-tight"
            >
              Intervu<span className="text-indigo-400">AI</span>
            </Link>

            <h1 className="mt-16 text-5xl font-bold leading-tight">
              Build confidence.
              <span className="block text-indigo-400">
                Land the opportunity.
              </span>
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-400">
              Create your IntervuAI account and start preparing for
              interviews with personalized AI-powered practice.
            </p>

            <div className="mt-10 space-y-4">
              {[
                "Practice realistic AI interviews",
                "Get personalized performance feedback",
                "Analyze and improve your resume",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-slate-300"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500/15 text-sm text-indigo-400">
                    ✓
                  </span>

                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center justify-center px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            <div className="mb-8 lg:hidden">
              <Link
                to="/"
                className="text-2xl font-bold tracking-tight"
              >
                Intervu<span className="text-indigo-400">AI</span>
              </Link>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl backdrop-blur-xl sm:p-10">
              <div className="mb-8">
                <h2 className="text-3xl font-bold">
                  Create your account
                </h2>

                <p className="mt-2 text-slate-400">
                  Start your interview preparation journey.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-slate-300"
                  >
                    Full Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    autoComplete="name"
                    className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-white outline-none placeholder:text-slate-600 transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-slate-300"
                  >
                    Email
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-white outline-none placeholder:text-slate-600 transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-slate-300"
                  >
                    Password
                  </label>

                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-white outline-none placeholder:text-slate-600 transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20"
                  />
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="mb-2 block text-sm font-medium text-slate-300"
                  >
                    Confirm Password
                  </label>

                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-white outline-none placeholder:text-slate-600 transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-indigo-500 py-3.5 font-semibold transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Creating account..." : "Create Account"}
                </button>
              </form>

              <div className="my-7 flex items-center gap-4">
                <div className="h-px flex-1 bg-white/10" />

                <span className="text-sm text-slate-500">
                  OR
                </span>

                <div className="h-px flex-1 bg-white/10" />
              </div>

              <button
                type="button"
                onClick={handleGoogleLogin}
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] py-3.5 font-medium transition hover:bg-white/[0.07]"
              >
                <span className="text-lg font-bold">G</span>
                Continue with Google
              </button>

              <p className="mt-7 text-center text-sm text-slate-500">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-indigo-400 hover:text-indigo-300"
                >
                  Sign in
                </Link>
              </p>
            </div>

            <p className="mt-6 text-center text-xs text-slate-600">
              By continuing, you agree to IntervuAI's terms and privacy
              policy.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Register;