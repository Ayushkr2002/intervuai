import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === "/";

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-[#293548] bg-[#111827]/98 backdrop-blur-xl">

      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="flex h-[72px] items-center justify-between">

          {/* Logo */}

          <Link
            to="/"
            onClick={closeMenu}
            className="group text-2xl font-bold tracking-tight text-white"
          >
            Intervu
            <span className="text-[#60A5FA] transition-colors group-hover:text-[#93C5FD]">
              AI
            </span>
          </Link>


          {/* Desktop Navigation */}

          <div className="hidden items-center gap-9 lg:flex">

            {isHome ? (
              <>
                <a
                  href="#features"
                  className="group relative py-2 text-sm font-medium text-[#AEB8C7] transition-colors hover:text-white"
                >
                  Features

                  <span className="absolute bottom-0 left-0 h-[2px] w-0 rounded-full bg-[#60A5FA] transition-all duration-300 group-hover:w-full" />
                </a>

                <a
                  href="#how-it-works"
                  className="group relative py-2 text-sm font-medium text-[#AEB8C7] transition-colors hover:text-white"
                >
                  How It Works

                  <span className="absolute bottom-0 left-0 h-[2px] w-0 rounded-full bg-[#60A5FA] transition-all duration-300 group-hover:w-full" />
                </a>

                <a
                  href="#about"
                  className="group relative py-2 text-sm font-medium text-[#AEB8C7] transition-colors hover:text-white"
                >
                  About

                  <span className="absolute bottom-0 left-0 h-[2px] w-0 rounded-full bg-[#60A5FA] transition-all duration-300 group-hover:w-full" />
                </a>
              </>
            ) : (
              <>
                <Link
                  to="/dashboard"
                  className="group relative py-2 text-sm font-medium text-[#AEB8C7] transition-colors hover:text-white"
                >
                  Dashboard

                  <span className="absolute bottom-0 left-0 h-[2px] w-0 rounded-full bg-[#60A5FA] transition-all duration-300 group-hover:w-full" />
                </Link>

                <Link
                  to="/resume"
                  className="group relative py-2 text-sm font-medium text-[#AEB8C7] transition-colors hover:text-white"
                >
                  Resume

                  <span className="absolute bottom-0 left-0 h-[2px] w-0 rounded-full bg-[#60A5FA] transition-all duration-300 group-hover:w-full" />
                </Link>

                <Link
                  to="/interview"
                  className="group relative py-2 text-sm font-medium text-[#AEB8C7] transition-colors hover:text-white"
                >
                  Interview

                  <span className="absolute bottom-0 left-0 h-[2px] w-0 rounded-full bg-[#60A5FA] transition-all duration-300 group-hover:w-full" />
                </Link>
              </>
            )}

          </div>


          {/* Desktop CTA */}

          <div className="hidden lg:block">

            {isHome ? (
              <Link
                to="/login"
                className="group inline-flex items-center rounded-lg bg-[#60A5FA] px-5 py-2.5 text-sm font-semibold text-[#0F172A] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#7DB7FF] hover:shadow-lg hover:shadow-[#60A5FA]/25"
              >
                Get Started

                <span className="ml-2 transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            ) : (
              <Link
                to="/"
                className="group inline-flex items-center rounded-lg border border-[#374151] bg-[#1A2433] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:border-[#60A5FA] hover:bg-[#243044]"
              >
                Home

                <span className="ml-2 transition-transform duration-200 group-hover:-translate-x-1">
                  ←
                </span>
              </Link>
            )}

          </div>


          {/* Mobile Menu Button */}

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#374151] bg-[#1A2433] text-white transition hover:border-[#4B5563] hover:bg-[#243044] lg:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >

            <div className="space-y-1.5">

              <span
                className={`block h-0.5 w-5 bg-current transition ${
                  mobileMenuOpen
                    ? "translate-y-2 rotate-45"
                    : ""
                }`}
              />

              <span
                className={`block h-0.5 w-5 bg-current transition ${
                  mobileMenuOpen
                    ? "opacity-0"
                    : ""
                }`}
              />

              <span
                className={`block h-0.5 w-5 bg-current transition ${
                  mobileMenuOpen
                    ? "-translate-y-2 -rotate-45"
                    : ""
                }`}
              />

            </div>

          </button>

        </div>


        {/* Mobile Navigation */}

        {mobileMenuOpen && (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="border-t border-[#374151] py-4 lg:hidden"
          >

            <div className="flex flex-col gap-1">

              {isHome ? (
                <>
                  <a
                    href="#features"
                    onClick={closeMenu}
                    className="rounded-lg px-4 py-3 text-sm font-medium text-[#AEB8C7] transition hover:bg-[#1A2433] hover:text-white"
                  >
                    Features
                  </a>

                  <a
                    href="#how-it-works"
                    onClick={closeMenu}
                    className="rounded-lg px-4 py-3 text-sm font-medium text-[#AEB8C7] transition hover:bg-[#1A2433] hover:text-white"
                  >
                    How It Works
                  </a>

                  <a
                    href="#about"
                    onClick={closeMenu}
                    className="rounded-lg px-4 py-3 text-sm font-medium text-[#AEB8C7] transition hover:bg-[#1A2433] hover:text-white"
                  >
                    About
                  </a>
                </>
              ) : (
                <>
                  <Link
                    to="/dashboard"
                    onClick={closeMenu}
                    className="rounded-lg px-4 py-3 text-sm font-medium text-[#AEB8C7] transition hover:bg-[#1A2433] hover:text-white"
                  >
                    Dashboard
                  </Link>

                  <Link
                    to="/resume"
                    onClick={closeMenu}
                    className="rounded-lg px-4 py-3 text-sm font-medium text-[#AEB8C7] transition hover:bg-[#1A2433] hover:text-white"
                  >
                    Resume
                  </Link>

                  <Link
                    to="/interview"
                    onClick={closeMenu}
                    className="rounded-lg px-4 py-3 text-sm font-medium text-[#AEB8C7] transition hover:bg-[#1A2433] hover:text-white"
                  >
                    Interview
                  </Link>
                </>
              )}

              <div className="my-2 h-px bg-[#374151]" />

              {isHome ? (
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="rounded-lg bg-[#60A5FA] px-4 py-3 text-center text-sm font-semibold text-[#0F172A] transition hover:bg-[#7DB7FF]"
                >
                  Get Started
                </Link>
              ) : (
                <Link
                  to="/"
                  onClick={closeMenu}
                  className="rounded-lg border border-[#374151] bg-[#1A2433] px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#243044]"
                >
                  Back to Home
                </Link>
              )}

            </div>

          </motion.div>

        )}

      </div>

    </nav>
  );
};

export default Navbar;