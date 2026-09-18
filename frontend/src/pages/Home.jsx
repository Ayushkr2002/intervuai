import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";

const Home = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    {
      number: "01",
      title: "Resume Intelligence",
      text: "Understand how your resume performs and get practical recommendations tailored to the role you want.",
    },
    {
      number: "02",
      title: "AI Interview Practice",
      text: "Practice realistic technical and behavioral interviews with questions adapted to your experience.",
    },
    {
      number: "03",
      title: "Performance Insights",
      text: "Turn every practice session into measurable feedback on communication, knowledge, confidence, and problem solving.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Upload your resume",
      text: "Let IntervuAI understand your experience, skills, projects, and career direction.",
    },
    {
      number: "02",
      title: "Practice your interview",
      text: "Select a role and interview type and practice with realistic AI-generated questions.",
    },
    {
      number: "03",
      title: "Review & improve",
      text: "Get structured feedback and use your results to focus on the areas that matter most.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5F1E8] text-[#172536]">

      {/* ================= NAVBAR ================= */}

      <nav className="sticky top-0 z-50 border-b border-[#293548] bg-[#111827]/98 backdrop-blur-xl">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="flex h-[72px] items-center justify-between">

            {/* Logo */}

            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="group text-2xl font-bold tracking-tight text-white"
            >
              Intervu
              <span className="text-[#60A5FA] transition-colors group-hover:text-[#93C5FD]">
                AI
              </span>
            </Link>


            {/* Desktop Navigation */}

            <div className="hidden items-center gap-9 lg:flex">

              {[
                ["Features", "#features"],
                ["How It Works", "#how-it-works"],
                ["About", "#about"],
              ].map(([label, href]) => (

                <a
                  key={label}
                  href={href}
                  className="group relative py-2 text-sm font-medium text-[#AEB8C7] transition-colors hover:text-white"
                >
                  {label}

                  <span className="absolute bottom-0 left-0 h-[2px] w-0 rounded-full bg-[#60A5FA] transition-all duration-300 group-hover:w-full" />
                </a>

              ))}

            </div>


            {/* Desktop CTA */}

            <div className="hidden lg:block">

              <Link
                to="/login"
                className="group inline-flex items-center rounded-lg bg-[#60A5FA] px-5 py-2.5 text-sm font-semibold text-[#0F172A] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#7DB7FF] hover:shadow-lg hover:shadow-[#60A5FA]/25"
              >
                Get Started

                <span className="ml-2 transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </Link>

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

                {[
                  ["Features", "#features"],
                  ["How It Works", "#how-it-works"],
                  ["About", "#about"],
                ].map(([label, href]) => (

                  <a
                    key={label}
                    href={href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-lg px-4 py-3 text-sm font-medium text-[#AEB8C7] transition hover:bg-[#1A2433] hover:text-white"
                  >
                    {label}
                  </a>

                ))}

                <div className="my-2 h-px bg-[#374151]" />

                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg bg-[#60A5FA] px-4 py-3 text-center text-sm font-semibold text-[#0F172A] transition hover:bg-[#7DB7FF]"
                >
                  Get Started
                </Link>

              </div>

            </motion.div>

          )}

        </div>

      </nav>


      {/* ================= HERO ================= */}

      <main>

        <section className="relative overflow-hidden">

          {/* Decorative Background */}

          <div className="absolute -right-40 top-16 -z-10 h-[480px] w-[480px] rounded-full bg-[#D8BD69]/20 blur-3xl" />

          <div className="absolute -left-40 bottom-0 -z-10 h-[420px] w-[420px] rounded-full bg-[#87916A]/10 blur-3xl" />


          <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-8 lg:py-28">

            <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">


              {/* Hero Content */}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                }}
              >

                {/* Badge */}

                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#D8CCB5] bg-[#ECE5D7] px-3.5 py-2 text-sm font-medium text-[#68734F]">

                  <span className="relative flex h-2 w-2">

                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#A78335] opacity-50" />

                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#A78335]" />

                  </span>

                  AI-powered interview preparation

                </div>


                {/* Heading */}

                <h1 className="max-w-3xl text-5xl font-bold leading-[1.08] tracking-tight text-[#172536] sm:text-6xl lg:text-[68px]">

                  Walk into your next interview

                  <span className="block text-[#68734F]">
                    prepared.
                  </span>

                </h1>


                {/* Description */}

                <p className="mt-6 max-w-xl text-lg leading-8 text-[#66717A]">

                  Analyze your resume, practice realistic AI interviews,
                  and understand exactly where you can improve before
                  the real conversation begins.

                </p>


                {/* CTA */}

                <div className="mt-8 flex flex-wrap items-center gap-4">

                  <Link
                    to="/login"
                    className="group inline-flex items-center rounded-lg bg-[#172536] px-6 py-3.5 text-sm font-semibold text-[#F5F1E8] shadow-sm transition-all duration-200 hover:-translate-y-1 hover:bg-[#26384A] hover:shadow-xl hover:shadow-[#172536]/15"
                  >

                    Start Preparing

                    <span className="ml-2 inline-block transition-transform duration-200 group-hover:translate-x-1">
                      →
                    </span>

                  </Link>


                  

                </div>


                {/* Trust Points */}

                <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-sm text-[#7A817A]">

                  <span>
                    <span className="mr-2 text-[#A78335]">✓</span>
                    Resume analysis
                  </span>

                  <span>
                    <span className="mr-2 text-[#A78335]">✓</span>
                    AI interviews
                  </span>

                  <span>
                    <span className="mr-2 text-[#A78335]">✓</span>
                    Actionable feedback
                  </span>

                </div>

              </motion.div>


              {/* Dashboard Preview */}

              <motion.div
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.1,
                  ease: "easeOut",
                }}
                className="relative"
              >

                <div className="absolute -inset-8 -z-10 rounded-full bg-[#A78335]/10 blur-3xl" />


                <div className="overflow-hidden rounded-2xl border border-[#D7CFC0] bg-[#FBF9F4] shadow-[0_25px_70px_-30px_rgba(23,37,54,0.35)] transition-transform duration-500 hover:-translate-y-1">


                  {/* Preview Header */}

                  <div className="flex items-center justify-between border-b border-[#E0D9CC] px-6 py-5">

                    <div>

                      <p className="text-xs font-medium uppercase tracking-[0.08em] text-[#81877F]">
                        Interview Performance
                      </p>

                      <p className="mt-1 text-3xl font-bold tracking-tight text-[#172536]">
                        86%
                      </p>

                    </div>


                    <div className="flex items-center gap-2 rounded-full bg-[#E8EBD9] px-3.5 py-1.5 text-xs font-semibold text-[#657044]">

                      <span className="h-1.5 w-1.5 rounded-full bg-[#7D8A54]" />

                      Excellent

                    </div>

                  </div>


                  {/* Scores */}

                  <div className="space-y-5 p-6">

                    {[
                      ["Technical Knowledge", "92%"],
                      ["Communication", "84%"],
                      ["Problem Solving", "88%"],
                      ["Confidence", "79%"],
                    ].map(([label, score], index) => (

                      <div key={label}>

                        <div className="mb-2 flex items-center justify-between">

                          <span className="text-sm font-medium text-[#56616A]">
                            {label}
                          </span>

                          <span className="text-sm font-semibold text-[#172536]">
                            {score}
                          </span>

                        </div>


                        <div className="h-2 overflow-hidden rounded-full bg-[#E7E1D6]">

                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: score }}
                            transition={{
                              duration: 0.7,
                              delay: 0.4 + index * 0.1,
                              ease: "easeOut",
                            }}
                            className="h-full rounded-full bg-[#7D8958]"
                          />

                        </div>

                      </div>

                    ))}


                    {/* Feedback */}

                    <div className="rounded-xl border border-[#DED6C8] bg-[#F0EBE1] p-5">

                      <div className="flex items-center gap-2">

                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#D9C887] text-xs font-bold text-[#344354]">
                          AI
                        </span>

                        <p className="text-xs font-semibold uppercase tracking-wider text-[#747B73]">
                          Feedback
                        </p>

                      </div>

                      <p className="mt-3 text-sm leading-6 text-[#59636A]">

                        Strong technical answers. Focus on giving
                        more structured explanations during behavioral
                        questions.

                      </p>

                    </div>

                  </div>

                </div>

              </motion.div>

            </div>

          </div>

        </section>


        {/* ================= FEATURES ================= */}

        <section
          id="features"
          className="border-y border-[#DDD5C7] bg-[#EAE4D8]"
        >

          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="max-w-2xl"
            >

              <p className="text-sm font-semibold uppercase tracking-widest text-[#A78335]">
                Everything you need
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#172536] sm:text-4xl">

                One focused workspace

                <span className="text-[#68734F]">
                  {" "}for interview preparation.
                </span>

              </h2>

              <p className="mt-4 leading-7 text-[#66717A]">

                From understanding your resume to practicing
                realistic interviews, keep your entire preparation
                process in one place.

              </p>

            </motion.div>


            <div className="mt-12 grid gap-5 md:grid-cols-3">

              {features.map((feature, index) => (

                <motion.div
                  key={feature.number}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.06,
                  }}
                  className="group relative overflow-hidden rounded-xl border border-[#D4CCBD] bg-[#F8F5EE] p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#C6B78E] hover:shadow-xl"
                >

                  {/* Hover accent */}

                  <div className="absolute left-0 top-0 h-full w-1 bg-[#A78335] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />


                  <div className="flex items-center justify-between">

                    <span className="text-sm font-semibold tracking-wider text-[#A78335]">
                      {feature.number}
                    </span>

                    <span className="h-px w-10 bg-[#CFC6B5] transition-all duration-300 group-hover:w-16 group-hover:bg-[#A78335]" />

                  </div>


                  <h3 className="mt-7 text-xl font-semibold text-[#172536]">
                    {feature.title}
                  </h3>

                  <p className="mt-3 leading-7 text-[#66717A]">
                    {feature.text}
                  </p>


                  <div className="mt-6 flex items-center text-sm font-semibold text-[#68734F] opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                    Explore feature
                    <span className="ml-2">→</span>
                  </div>

                </motion.div>

              ))}

            </div>

          </div>

        </section>


        {/* ================= HOW IT WORKS ================= */}

        <section
          id="how-it-works"
          className="bg-[#F5F1E8]"
        >

          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="max-w-2xl"
            >

              <p className="text-sm font-semibold uppercase tracking-widest text-[#A78335]">
                How it works
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#172536] sm:text-4xl">

                Simple preparation.

                <span className="text-[#68734F]">
                  {" "}Better performance.
                </span>

              </h2>

              <p className="mt-4 leading-7 text-[#66717A]">

                A straightforward workflow designed to make
                your preparation more focused and measurable.

              </p>

            </motion.div>


            <div className="mt-14 grid gap-10 md:grid-cols-3">

              {steps.map((step, index) => (

                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.06,
                  }}
                  className="group relative"
                >

                  <div className="flex items-center gap-4">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#172536] text-sm font-bold text-[#F5F1E8] transition-all duration-300 group-hover:bg-[#60A5FA] group-hover:text-[#0F172A] group-hover:shadow-lg group-hover:shadow-[#60A5FA]/20">
                      {step.number}
                    </div>

                    {index !== steps.length - 1 && (
                      <div className="hidden h-px flex-1 bg-[#D7CFC0] md:block" />
                    )}

                  </div>


                  <h3 className="mt-5 text-lg font-semibold text-[#172536]">
                    {step.title}
                  </h3>

                  <p className="mt-2 max-w-sm leading-7 text-[#66717A]">
                    {step.text}
                  </p>

                </motion.div>

              ))}

            </div>

          </div>

        </section>


        {/* ================= ABOUT ================= */}

        <section
          id="about"
          className="border-t border-[#283A4A] bg-[#172536]"
        >

          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="max-w-3xl"
            >

              <p className="text-sm font-semibold uppercase tracking-widest text-[#D2B95F]">
                About IntervuAI
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#F5F1E8] sm:text-4xl">

                A smarter way to prepare

                <span className="text-[#D2B95F]">
                  {" "}before the real interview.
                </span>

              </h2>

              <p className="mt-5 text-lg leading-8 text-[#B8C0C7]">

                IntervuAI brings resume analysis, AI-powered
                interviews, and personalized feedback together
                in one focused workspace — helping you prepare
                with clarity instead of guesswork.

              </p>

            </motion.div>

          </div>

        </section>

      </main>


      {/* ================= FOOTER ================= */}

      <footer className="border-t border-[#304354] bg-[#172536]">

        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-8">

          <div className="text-lg font-bold text-[#F5F1E8]">

            Intervu
            <span className="text-[#D2B95F]">
              AI
            </span>

          </div>

          <p className="text-sm text-[#9DA8B0]">
            AI-powered interview preparation.
          </p>

        </div>

      </footer>

    </div>
  );
};

export default Home;