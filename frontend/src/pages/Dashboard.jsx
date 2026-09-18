
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

const Dashboard = () => {
  const { user } = useAuth();

  const [resume, setResume] = useState(null);

  const [interviewStats, setInterviewStats] = useState({
    totalInterviews: 0,
    completedCount: 0,
    averageScore: 0,
    bestScore: 0,
  });

  const [recentInterviews, setRecentInterviews] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch resume separately so a missing resume
        // does not prevent interview data from loading.
        try {
          const resumeResponse = await api.get("/resumes/my-resume");
          setResume(resumeResponse.data.resume);
        } catch (error) {
          if (error.response?.status !== 404) {
            console.error("Resume dashboard error:", error);
          }
          setResume(null);
        }

        // Fetch interview statistics
        const interviewResponse = await api.get("/interviews/stats");

        setInterviewStats(
          interviewResponse.data.stats || {
            totalInterviews: 0,
            completedCount: 0,
            averageScore: 0,
            bestScore: 0,
          }
        );

        setRecentInterviews(
          interviewResponse.data.recentInterviews || []
        );
      } catch (error) {
        console.error("Dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-9 w-9 animate-spin rounded-full border-4 border-[#D9DDE5] border-t-[#4F8FD9]" />

          <p className="text-sm font-medium text-[#7A817A]">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  const atsScore = resume?.analysis?.atsScore ?? 0;

  const firstName = user?.name?.split(" ")[0] || "there";

  return (
    <div className="mx-auto w-full max-w-7xl">

      {/* =========================================================
          WELCOME SECTION
      ========================================================= */}

      <section className="mb-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#A78335]">
              Your workspace
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-[#172536] sm:text-4xl">
              Welcome back, {firstName} 👋
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#6F787D] sm:text-base">
              Keep improving your resume and interview skills.
              Your next opportunity starts with better preparation.
            </p>
          </div>

          <Link
            to="/interview"
            className="inline-flex w-fit items-center justify-center gap-2 rounded-xl bg-[#172536] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#24364A] hover:shadow-lg"
          >
            Start Interview
            <span className="text-base">→</span>
          </Link>

        </div>
      </section>


      {/* =========================================================
          STATS
      ========================================================= */}

      <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

        {/* Resume */}
        <div className="rounded-2xl border border-[#DDD7CA] bg-[#FBF9F4] p-5 shadow-[0_8px_30px_-20px_rgba(23,37,54,0.35)] transition-shadow hover:shadow-[0_12px_35px_-20px_rgba(23,37,54,0.4)]">

          <div className="flex items-start justify-between">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E7EEF8] text-lg">
              📄
            </div>

            <span
              className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                resume
                  ? "bg-[#E7F4EA] text-[#3E7650]"
                  : "bg-[#F1EDE5] text-[#8A8172]"
              }`}
            >
              {resume ? "Ready" : "Pending"}
            </span>

          </div>

          <p className="mt-5 text-sm font-medium text-[#7A817A]">
            Resume
          </p>

          <h2 className="mt-1 text-xl font-bold text-[#172536]">
            {resume ? "Uploaded" : "Not uploaded"}
          </h2>

        </div>


        {/* ATS Score */}
        <div className="rounded-2xl border border-[#DDD7CA] bg-[#FBF9F4] p-5 shadow-[0_8px_30px_-20px_rgba(23,37,54,0.35)] transition-shadow hover:shadow-[0_12px_35px_-20px_rgba(23,37,54,0.4)]">

          <div className="flex items-start justify-between">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F0ECE2] text-lg">
              🎯
            </div>

            {resume && (
              <span className="text-xs font-semibold text-[#A78335]">
                / 100
              </span>
            )}

          </div>

          <p className="mt-5 text-sm font-medium text-[#7A817A]">
            ATS Score
          </p>

          <h2 className="mt-1 text-xl font-bold text-[#172536]">
            {resume ? `${atsScore}/100` : "--"}
          </h2>

        </div>


        {/* Total Interviews */}
        <div className="rounded-2xl border border-[#DDD7CA] bg-[#FBF9F4] p-5 shadow-[0_8px_30px_-20px_rgba(23,37,54,0.35)] transition-shadow hover:shadow-[0_12px_35px_-20px_rgba(23,37,54,0.4)]">

          <div className="flex items-start justify-between">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E7EEF8] text-lg">
              🎤
            </div>

            <span className="rounded-full bg-[#E7F4EA] px-2.5 py-1 text-[11px] font-semibold text-[#3E7650]">
              Practice
            </span>

          </div>

          <p className="mt-5 text-sm font-medium text-[#7A817A]">
            Interviews
          </p>

          <h2 className="mt-1 text-xl font-bold text-[#172536]">
            {interviewStats.totalInterviews}
          </h2>

        </div>


        {/* Average Score */}
        <div className="rounded-2xl border border-[#DDD7CA] bg-[#FBF9F4] p-5 shadow-[0_8px_30px_-20px_rgba(23,37,54,0.35)] transition-shadow hover:shadow-[0_12px_35px_-20px_rgba(23,37,54,0.4)]">

          <div className="flex items-start justify-between">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F0ECE2] text-lg">
              ⭐
            </div>

            <span className="text-xs font-semibold text-[#A78335]">
              / 10
            </span>

          </div>

          <p className="mt-5 text-sm font-medium text-[#7A817A]">
            Average Score
          </p>

          <h2 className="mt-1 text-xl font-bold text-[#172536]">
            {interviewStats.completedCount > 0
              ? `${interviewStats.averageScore}/10`
              : "--"}
          </h2>

        </div>

      </section>


      {/* =========================================================
          INTERVIEW PERFORMANCE
      ========================================================= */}

      <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">

        {/* Completed Interviews */}
        <div className="rounded-2xl border border-[#C8D9EA] bg-[#EEF4FA] p-5">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm font-medium text-[#697681]">
                Completed Interviews
              </p>

              <h2 className="mt-2 text-2xl font-bold text-[#172536]">
                {interviewStats.completedCount}
              </h2>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-lg shadow-sm">
              ✓
            </div>

          </div>

        </div>


        {/* Best Score */}
        <div className="rounded-2xl border border-[#E0D7C7] bg-[#F0ECE2] p-5">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm font-medium text-[#777B76]">
                Best Interview Score
              </p>

              <h2 className="mt-2 text-2xl font-bold text-[#172536]">
                {interviewStats.completedCount > 0
                  ? `${interviewStats.bestScore}/10`
                  : "--"}
              </h2>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-lg shadow-sm">
              🏆
            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          MAIN GRID
      ========================================================= */}

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">


        {/* =======================================================
            LATEST RESUME
        ======================================================= */}

        <div className="rounded-2xl border border-[#DDD7CA] bg-[#FBF9F4] p-6 shadow-[0_8px_30px_-20px_rgba(23,37,54,0.35)] sm:p-7 lg:col-span-2">

          <div className="mb-7 flex items-start justify-between gap-4">

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#A78335]">
                Resume
              </p>

              <h2 className="mt-2 text-xl font-bold tracking-tight text-[#172536]">
                Latest Resume
              </h2>

              <p className="mt-1.5 text-sm text-[#7A817A]">
                Your most recent resume analysis
              </p>
            </div>

            <Link
              to="/resume"
              className="shrink-0 text-sm font-semibold text-[#4F8FD9] transition hover:text-[#3578C4]"
            >
              {resume ? "View" : "Upload"}
            </Link>

          </div>


          {resume ? (

            <div className="rounded-xl border border-[#E2DCCE] bg-[#F8F5EE] p-5">

              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

                {/* File */}
                <div className="flex min-w-0 items-center gap-4">

                  <div className="flex h-14 w-12 shrink-0 items-center justify-center rounded-lg bg-[#FCEAEA] text-xs font-extrabold tracking-wide text-[#C65353]">
                    PDF
                  </div>

                  <div className="min-w-0">

                    <h3 className="truncate text-sm font-semibold text-[#172536]">
                      {resume.fileName}
                    </h3>

                    <p className="mt-1 text-xs text-[#7A817A]">
                      Analyzed by Gemini AI
                    </p>

                  </div>

                </div>


                {/* Score */}
                <div className="flex items-center gap-5">

                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-[5px] border-[#4F8FD9] bg-[#FBF9F4]">

                    <span className="text-lg font-bold text-[#172536]">
                      {atsScore}
                    </span>

                  </div>

                  <div>

                    <p className="text-sm font-semibold text-[#172536]">
                      ATS Score
                    </p>

                    <p className="mt-1 text-xs leading-5 text-[#7A817A]">
                      Your resume scored{" "}
                      <span className="font-semibold text-[#172536]">
                        {atsScore}/100
                      </span>
                    </p>

                  </div>

                </div>

              </div>

            </div>

          ) : (

            <div className="rounded-xl border border-dashed border-[#D5CDBF] bg-[#F8F5EE] px-5 py-10 text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E7EEF8] text-2xl">
                📄
              </div>

              <h3 className="mt-5 text-base font-semibold text-[#172536]">
                No resume uploaded yet
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#7A817A]">
                Upload your resume and let AI analyze your ATS score,
                skills, and areas for improvement.
              </p>

              <Link
                to="/resume"
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-[#172536] px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#24364A] hover:shadow-lg"
              >
                Upload Resume
                <span>→</span>
              </Link>

            </div>

          )}

        </div>


        {/* =======================================================
            AI INTERVIEW
        ======================================================= */}

        <div className="relative overflow-hidden rounded-2xl border border-[#C8D9EA] bg-[#EEF4FA] p-6 shadow-[0_8px_30px_-20px_rgba(23,37,54,0.35)] sm:p-7">

          <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#60A5FA]/10 blur-2xl" />

          <div className="relative">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-lg shadow-sm">
              🎤
            </div>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-[#4F8FD9]">
              Practice
            </p>

            <h2 className="mt-2 text-xl font-bold tracking-tight text-[#172536]">
              AI Interview
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#697681]">
              Practice with an AI interviewer and get personalized
              feedback to improve your performance.
            </p>

            <div className="mt-6 space-y-3">

              <div className="flex items-center gap-3 text-sm text-[#42515E]">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-bold text-[#4F8FD9]">
                  ✓
                </span>

                Realistic interview questions
              </div>

              <div className="flex items-center gap-3 text-sm text-[#42515E]">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-bold text-[#4F8FD9]">
                  ✓
                </span>

                Personalized feedback
              </div>

              <div className="flex items-center gap-3 text-sm text-[#42515E]">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-bold text-[#4F8FD9]">
                  ✓
                </span>

                Performance scoring
              </div>

            </div>

            <Link
              to="/interview"
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#172536] px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#24364A] hover:shadow-lg"
            >
              Start Interview
              <span>→</span>
            </Link>

          </div>

        </div>

      </section>


      {/* =========================================================
          RECENT INTERVIEWS
      ========================================================= */}

      <section className="mt-6 rounded-2xl border border-[#DDD7CA] bg-[#FBF9F4] p-6 shadow-[0_8px_30px_-20px_rgba(23,37,54,0.35)] sm:p-7">

        <div className="mb-6 flex items-start justify-between gap-4">

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#A78335]">
              Performance
            </p>

            <h2 className="mt-2 text-xl font-bold tracking-tight text-[#172536]">
              Recent Interviews
            </h2>

            <p className="mt-1.5 text-sm text-[#7A817A]">
              Your latest interview attempts and results
            </p>
          </div>

          <Link
            to="/interview"
            className="shrink-0 text-sm font-semibold text-[#4F8FD9] transition hover:text-[#3578C4]"
          >
            Practice
          </Link>

        </div>


        {recentInterviews.length > 0 ? (

          <div className="space-y-3">

            {recentInterviews.map((interview) => (

              <div
                key={interview._id}
                className="flex flex-col gap-4 rounded-xl border border-[#E2DCCE] bg-[#F8F5EE] p-4 sm:flex-row sm:items-center sm:justify-between"
              >

                <div className="min-w-0">

                  <h3 className="truncate text-sm font-semibold text-[#172536]">
                    {interview.jobRole}
                  </h3>

                  <p className="mt-1 text-xs text-[#7A817A]">
                    {interview.experience} · {interview.interviewType} ·{" "}
                    {interview.questionCount} questions
                  </p>

                </div>


                <div className="flex items-center gap-4">

                  <span
                    className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                      interview.status === "completed"
                        ? "bg-[#E7F4EA] text-[#3E7650]"
                        : "bg-[#F1EDE5] text-[#8A8172]"
                    }`}
                  >
                    {interview.status === "completed"
                      ? "Completed"
                      : "In Progress"}
                  </span>


                  <div className="min-w-[60px] text-right">

                    {interview.status === "completed" ? (
                      <p className="text-sm font-bold text-[#172536]">
                        {interview.overallScore}/10
                      </p>
                    ) : (
                      <p className="text-xs font-medium text-[#8A8172]">
                        Pending
                      </p>
                    )}

                  </div>

                </div>

              </div>

            ))}

          </div>

        ) : (

          <div className="rounded-xl border border-dashed border-[#D5CDBF] bg-[#F8F5EE] px-5 py-10 text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E7EEF8] text-2xl">
              🎤
            </div>

            <h3 className="mt-5 text-base font-semibold text-[#172536]">
              No interviews yet
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#7A817A]">
              Start your first AI interview to practice your skills and
              receive personalized feedback.
            </p>

            <Link
              to="/interview"
              className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-[#172536] px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#24364A] hover:shadow-lg"
            >
              Start Interview
              <span>→</span>
            </Link>

          </div>

        )}

      </section>


      {/* =========================================================
          BOTTOM TIP
      ========================================================= */}

      <section className="mt-6 rounded-2xl border border-[#E0D7C7] bg-[#F0ECE2] px-5 py-4 sm:px-6">

        <div className="flex items-start gap-3">

          <span className="mt-0.5 text-lg">
            💡
          </span>

          <div>

            <p className="text-sm font-semibold text-[#172536]">
              Preparation tip
            </p>

            <p className="mt-1 text-xs leading-5 text-[#777B76] sm:text-sm">
              A strong resume gets you noticed. Consistent interview
              practice helps you convert opportunities into offers.
            </p>

          </div>

        </div>

      </section>

    </div>
  );
};

export default Dashboard;

