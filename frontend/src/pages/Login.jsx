import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL;

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [isRegister, setIsRegister] = useState(false);

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

  const switchMode = (registerMode) => {
    setIsRegister(registerMode);

    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = formData;

    if (isRegister) {
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
    } else {
      if (!email || !password) {
        toast.error("Please enter your email and password");
        return;
      }
    }

    try {
      setLoading(true);

      const endpoint = isRegister
        ? `${API_URL}/auth/register`
        : `${API_URL}/auth/login`;

      const payload = isRegister
        ? {
            name,
            email,
            password,
          }
        : {
            email,
            password,
          };

      const response = await axios.post(endpoint, payload, {
        withCredentials: true,
      });

      login(response.data.user);

      toast.success(
        response.data.message ||
          (isRegister
            ? "Registration successful"
            : "Login successful")
      );

      navigate("/dashboard");
    } catch (error) {
      console.log("LOGIN ERROR:", error);
  console.log("LOGIN ERROR RESPONSE:", error.response);
  console.log("LOGIN ERROR DATA:", error.response?.data);
      const message =
        error.response?.data?.message ||
        (isRegister
          ? "Unable to create your account. Please try again."
          : "Unable to login. Please try again.");

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${API_URL}/auth/google`;
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#F5F1E8] text-[#172536]">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* =========================================================
            LEFT SIDE
        ========================================================= */}

        <div className="relative hidden overflow-hidden lg:flex lg:items-center lg:justify-center">

          {/* Decorative background */}
          <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-[#60A5FA]/10 blur-3xl" />

          <div className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-[#A78335]/10 blur-3xl" />

          <div className="relative z-10 max-w-xl px-12 xl:px-16">

            {/* Logo */}

            <Link
              to="/"
              className="group text-2xl font-bold tracking-tight text-[#172536]"
            >
              Intervu
              <span className="text-[#4F8FD9] transition-colors group-hover:text-[#3578C4]">
                AI
              </span>
            </Link>

            {/* Animated content */}

            <motion.div
              key={isRegister ? "register-content" : "login-content"}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
              }}
            >

              <h1 className="mt-16 max-w-lg text-5xl font-bold leading-[1.08] tracking-tight text-[#172536] xl:text-6xl">

                {isRegister ? (
                  <>
                    Start your journey.
                    <span className="block text-[#68734F]">
                      Prepare with AI.
                    </span>
                  </>
                ) : (
                  <>
                    Your next interview starts
                    <span className="text-[#68734F]">
                      {" "}here.
                    </span>
                  </>
                )}

              </h1>

              <p className="mt-7 max-w-lg text-lg leading-8 text-[#66717A]">

                {isRegister
                  ? "Create your IntervuAI account and start preparing for your next interview with personalized AI-powered practice."
                  : "Practice with AI-powered mock interviews, analyze your resume, and become more confident before the real interview."}

              </p>

              {/* Feature points */}

              <div className="mt-10 space-y-4">

                {[
                  "AI-powered mock interviews",
                  "Personalized performance feedback",
                  "Resume analysis and insights",
                ].map((item, index) => (

                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.35,
                      delay: index * 0.08,
                    }}
                    className="flex items-center gap-3 text-[#344354]"
                  >

                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#E7EEF8] text-sm font-semibold text-[#4F8FD9]">
                      ✓
                    </span>

                    <span className="text-[15px] font-medium">
                      {item}
                    </span>

                  </motion.div>

                ))}

              </div>

              {/* Small visual accent */}

              <div className="mt-12 flex items-center gap-3">

                <div className="h-px w-12 bg-[#D2C9B9]" />

                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9A8F7B]">
                  Prepare smarter
                </span>

              </div>

            </motion.div>

          </div>
        </div>


        {/* =========================================================
            RIGHT SIDE
        ========================================================= */}

        <div className="relative flex items-center justify-center px-5 py-10 sm:px-8 lg:px-12">

          {/* Mobile background decoration */}

          <div className="pointer-events-none absolute -right-32 top-10 h-72 w-72 rounded-full bg-[#60A5FA]/10 blur-3xl lg:hidden" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
            }}
            className="relative z-10 w-full max-w-md"
          >

            {/* Mobile Logo */}

            <div className="mb-8 lg:hidden">

              <Link
                to="/"
                className="text-2xl font-bold tracking-tight text-[#172536]"
              >
                Intervu
                <span className="text-[#4F8FD9]">
                  AI
                </span>
              </Link>

            </div>


            {/* Main Card */}

            <div className="rounded-2xl border border-[#D8D0C1] bg-[#FBF9F4] p-7 shadow-[0_20px_60px_-30px_rgba(23,37,54,0.3)] sm:p-9">

              {/* Login / Register Switch */}

              <div className="mb-8 grid grid-cols-2 rounded-xl border border-[#DED6C8] bg-[#EEE9DF] p-1">

                <button
                  type="button"
                  onClick={() => switchMode(false)}
                  className={`rounded-lg py-2.5 text-sm font-semibold transition-all duration-200 ${
                    !isRegister
                      ? "bg-[#172536] text-white shadow-md"
                      : "text-[#727A80] hover:text-[#172536]"
                  }`}
                >
                  Sign In
                </button>

                <button
                  type="button"
                  onClick={() => switchMode(true)}
                  className={`rounded-lg py-2.5 text-sm font-semibold transition-all duration-200 ${
                    isRegister
                      ? "bg-[#172536] text-white shadow-md"
                      : "text-[#727A80] hover:text-[#172536]"
                  }`}
                >
                  Create Account
                </button>

              </div>


              {/* Heading */}

              <motion.div
                key={isRegister ? "register-heading" : "login-heading"}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.25,
                }}
                className="mb-8"
              >

                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#A78335]">
                  {isRegister
                    ? "Get started"
                    : "Welcome back"}
                </p>

                <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#172536]">

                  {isRegister
                    ? "Create your account"
                    : "Welcome back"}

                </h2>

                <p className="mt-2 text-sm leading-6 text-[#727A80]">

                  {isRegister
                    ? "Start your interview preparation journey."
                    : "Sign in to continue your interview preparation."}

                </p>

              </motion.div>


              {/* Form */}

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                {/* Name */}

                {isRegister && (
                  <div>

                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-semibold text-[#344354]"
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
                      className="w-full rounded-xl border border-[#D7CFC0] bg-[#F8F5EE] px-4 py-3.5 text-[#172536] outline-none placeholder:text-[#A5A7A4] transition-all duration-200 focus:border-[#60A5FA] focus:bg-white focus:ring-4 focus:ring-[#60A5FA]/10"
                    />

                  </div>
                )}


                {/* Email */}

                <div>

                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-[#344354]"
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
                    className="w-full rounded-xl border border-[#D7CFC0] bg-[#F8F5EE] px-4 py-3.5 text-[#172536] outline-none placeholder:text-[#A5A7A4] transition-all duration-200 focus:border-[#60A5FA] focus:bg-white focus:ring-4 focus:ring-[#60A5FA]/10"
                  />

                </div>


                {/* Password */}

                <div>

                  <div className="mb-2 flex items-center justify-between">

                    <label
                      htmlFor="password"
                      className="block text-sm font-semibold text-[#344354]"
                    >
                      Password
                    </label>

                    {!isRegister && (
                      <button
                        type="button"
                        className="text-xs font-semibold text-[#4F8FD9] transition hover:text-[#3578C4]"
                      >
                        Forgot password?
                      </button>
                    )}

                  </div>

                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    autoComplete={
                      isRegister
                        ? "new-password"
                        : "current-password"
                    }
                    className="w-full rounded-xl border border-[#D7CFC0] bg-[#F8F5EE] px-4 py-3.5 text-[#172536] outline-none placeholder:text-[#A5A7A4] transition-all duration-200 focus:border-[#60A5FA] focus:bg-white focus:ring-4 focus:ring-[#60A5FA]/10"
                  />

                </div>


                {/* Confirm Password */}

                {isRegister && (
                  <div>

                    <label
                      htmlFor="confirmPassword"
                      className="mb-2 block text-sm font-semibold text-[#344354]"
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
                      className="w-full rounded-xl border border-[#D7CFC0] bg-[#F8F5EE] px-4 py-3.5 text-[#172536] outline-none placeholder:text-[#A5A7A4] transition-all duration-200 focus:border-[#60A5FA] focus:bg-white focus:ring-4 focus:ring-[#60A5FA]/10"
                    />

                  </div>
                )}


                {/* Submit */}

                <button
                  type="submit"
                  disabled={loading}
                  className="group mt-1 flex w-full items-center justify-center rounded-xl bg-[#172536] py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#24364A] hover:shadow-lg hover:shadow-[#172536]/15 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                >

                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                      {isRegister
                        ? "Creating account..."
                        : "Signing in..."}
                    </span>
                  ) : (
                    <>
                      {isRegister
                        ? "Create Account"
                        : "Sign In"}

                      <span className="ml-2 transition-transform duration-200 group-hover:translate-x-1">
                        →
                      </span>
                    </>
                  )}

                </button>

              </form>


              {/* Divider */}

              <div className="my-7 flex items-center gap-4">

                <div className="h-px flex-1 bg-[#DED6C8]" />

                <span className="text-xs font-medium text-[#9A9B98]">
                  OR
                </span>

                <div className="h-px flex-1 bg-[#DED6C8]" />

              </div>


              {/* Google */}

              <button
                type="button"
                onClick={handleGoogleLogin}
                className="group flex w-full items-center justify-center gap-3 rounded-xl border border-[#D7CFC0] bg-[#FAF8F2] py-3.5 text-sm font-semibold text-[#344354] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#BDB4A4] hover:bg-white hover:shadow-md"
              >

                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[#D8D0C1] bg-white text-xs font-bold text-[#4285F4]">
                  G
                </span>

                Continue with Google

              </button>


              {/* Bottom Switch */}

              <p className="mt-7 text-center text-sm text-[#858B8D]">

                {isRegister
                  ? "Already have an account?"
                  : "Don't have an account?"}{" "}

                <button
                  type="button"
                  onClick={() => switchMode(!isRegister)}
                  className="font-semibold text-[#4F8FD9] transition hover:text-[#3578C4]"
                >
                  {isRegister
                    ? "Sign in"
                    : "Create one"}
                </button>

              </p>

            </div>


            {/* Terms */}

            <p className="mt-6 px-4 text-center text-xs leading-5 text-[#9A9B98]">

              By continuing, you agree to IntervuAI's terms
              and privacy policy.

            </p>

          </motion.div>

        </div>

      </div>
    </div>
  );
};

export default Login;