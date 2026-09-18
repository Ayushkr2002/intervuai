
import { useState } from "react";
import api from "../api/axios";

const TOTAL_QUESTIONS = 5;

const Interview = () => {
  const [jobRole, setJobRole] = useState("");
  const [experience, setExperience] = useState("");
  const [interviewType, setInterviewType] = useState("");

  const [interview, setInterview] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answer, setAnswer] = useState("");
  const [evaluation, setEvaluation] = useState(null);

  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);

  const [loading, setLoading] = useState(false);
  const [questionLoading, setQuestionLoading] = useState(false);
  const [answerLoading, setAnswerLoading] = useState(false);

  const [error, setError] = useState("");

  // =========================================================
  // START INTERVIEW
  // =========================================================

  const handleStartInterview = async () => {
    if (!jobRole || !experience || !interviewType) {
      setError("Please select all interview options.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await api.post("/interviews/create", {
        jobRole,
        experience,
        interviewType,
      });

      setInterview(response.data.interview);
      setStarted(true);

      // Automatically generate first question
      await generateQuestion(response.data.interview._id);
    } catch (error) {
      console.error("Interview creation error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to start interview."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // GENERATE QUESTION
  // =========================================================

  const generateQuestion = async (interviewId) => {
    try {
      setQuestionLoading(true);
      setError("");
      setEvaluation(null);
      setAnswer("");

      const response = await api.post(
        `/interviews/${interviewId}/question`
      );

      setCurrentQuestion(response.data.question);

      setInterview((prev) => ({
        ...prev,
        questions: [
          ...(prev?.questions || []),
          response.data.question,
        ],
      }));
    } catch (error) {
      console.error("Question generation error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to generate interview question."
      );
    } finally {
      setQuestionLoading(false);
    }
  };

  // =========================================================
  // SUBMIT ANSWER
  // =========================================================

  const handleSubmitAnswer = async () => {
    if (!answer.trim()) {
      setError("Please enter your answer.");
      return;
    }

    if (!interview?._id) {
      setError("Interview not found.");
      return;
    }

    try {
      setAnswerLoading(true);
      setError("");

      const response = await api.post(
        `/interviews/${interview._id}/answer`,
        {
          answer,
        }
      );

      console.log("Answer evaluated:", response.data);

      setEvaluation(response.data.evaluation);

      setInterview((prev) => ({
        ...prev,
        status: response.data.interview.status,
        overallScore: response.data.interview.overallScore,
        questions: prev.questions?.map((question) =>
          question._id === response.data.question._id
            ? response.data.question
            : question
        ),
      }));

      setAnswer("");

      if (response.data.interview.isCompleted) {
        setCompleted(true);
        setCurrentQuestion(null);
      }
    } catch (error) {
      console.error("Answer submission error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to evaluate answer."
      );
    } finally {
      setAnswerLoading(false);
    }
  };

  // =========================================================
  // NEXT QUESTION
  // =========================================================

  const handleNextQuestion = async () => {
    if (!interview?._id) {
      setError("Interview not found.");
      return;
    }

    const questionCount = interview.questions?.length || 0;

    if (questionCount >= TOTAL_QUESTIONS) {
      setCompleted(true);
      return;
    }

    await generateQuestion(interview._id);
  };

  // =========================================================
  // SETUP SCREEN
  // =========================================================

  if (!started) {
    return (
      <div className="mx-auto w-full max-w-6xl">

        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#A78335]">
            AI Interview
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#172536] sm:text-4xl">
            Practice like it’s the real thing.
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#727A80] sm:text-base">
            Configure your interview and let AI generate realistic
            questions based on your role, experience, and interview type.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* Setup Card */}
          <div className="rounded-2xl border border-[#D8D0C1] bg-[#FBF9F4] p-6 shadow-sm sm:p-8 lg:col-span-2">

            <div className="mb-7">
              <h2 className="text-lg font-bold text-[#172536]">
                Interview Setup
              </h2>

              <p className="mt-1 text-sm text-[#727A80]">
                Choose how you want your AI interview to be conducted.
              </p>
            </div>

            <div className="space-y-5">

              {/* Job Role */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#344354]">
                  Job Role
                </label>

                <select
                  value={jobRole}
                  onChange={(e) => setJobRole(e.target.value)}
                  className="w-full rounded-xl border border-[#D7CFC0] bg-[#F8F5EE] px-4 py-3.5 text-sm text-[#172536] outline-none transition focus:border-[#60A5FA] focus:bg-white focus:ring-4 focus:ring-[#60A5FA]/10"
                >
                  <option value="" disabled>
                    Select a job role
                  </option>

                  <option value="frontend">
                    Frontend Developer
                  </option>

                  <option value="backend">
                    Backend Developer
                  </option>

                  <option value="fullstack">
                    Full Stack Developer
                  </option>

                  <option value="software">
                    Software Engineer
                  </option>
                </select>
              </div>

              {/* Experience */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#344354]">
                  Experience Level
                </label>

                <select
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full rounded-xl border border-[#D7CFC0] bg-[#F8F5EE] px-4 py-3.5 text-sm text-[#172536] outline-none transition focus:border-[#60A5FA] focus:bg-white focus:ring-4 focus:ring-[#60A5FA]/10"
                >
                  <option value="" disabled>
                    Select experience level
                  </option>

                  <option value="fresher">Fresher</option>
                  <option value="junior">Junior</option>
                  <option value="mid">Mid Level</option>
                  <option value="senior">Senior</option>
                </select>
              </div>

              {/* Interview Type */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#344354]">
                  Interview Type
                </label>

                <select
                  value={interviewType}
                  onChange={(e) => setInterviewType(e.target.value)}
                  className="w-full rounded-xl border border-[#D7CFC0] bg-[#F8F5EE] px-4 py-3.5 text-sm text-[#172536] outline-none transition focus:border-[#60A5FA] focus:bg-white focus:ring-4 focus:ring-[#60A5FA]/10"
                >
                  <option value="" disabled>
                    Select interview type
                  </option>

                  <option value="technical">Technical</option>
                  <option value="behavioral">Behavioral</option>
                  <option value="mixed">
                    Technical + Behavioral
                  </option>
                </select>
              </div>

              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                  {error}
                </div>
              )}

              <button
                type="button"
                onClick={handleStartInterview}
                disabled={loading}
                className="w-full rounded-xl bg-[#172536] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#24364A] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {loading ? "Preparing Interview..." : "Start AI Interview →"}
              </button>

            </div>
          </div>

          {/* How it works */}
          <div className="rounded-2xl border border-[#D8D0C1] bg-[#FBF9F4] p-6 shadow-sm sm:p-7">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E7EEF8] text-2xl">
              🎤
            </div>

            <h2 className="mt-5 text-lg font-bold text-[#172536]">
              How it works
            </h2>

            <div className="mt-6 space-y-5">

              {[
                ["01", "Choose your role and interview preferences."],
                ["02", "Answer five AI-generated interview questions."],
                ["03", "Get feedback and a score after every answer."],
                ["04", "Receive your final overall interview score."],
              ].map(([number, text]) => (
                <div key={number} className="flex gap-3">
                  <span className="text-sm font-bold text-[#4F8FD9]">
                    {number}
                  </span>

                  <p className="text-sm leading-6 text-[#66717A]">
                    {text}
                  </p>
                </div>
              ))}

            </div>

          </div>
        </div>
      </div>
    );
  }

  // =========================================================
  // COMPLETED SCREEN
  // =========================================================

  if (completed) {
    return (
      <div className="mx-auto w-full max-w-3xl">

        <div className="rounded-2xl border border-[#D8D0C1] bg-[#FBF9F4] p-7 text-center shadow-sm sm:p-10">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-3xl">
            ✓
          </div>

          <p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-[#A78335]">
            Interview Completed
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#172536]">
            Great job!
          </h1>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#727A80]">
            You completed all five questions. Here's your overall
            interview performance.
          </p>

          <div className="mx-auto mt-8 flex h-32 w-32 flex-col items-center justify-center rounded-full border-[8px] border-[#60A5FA] bg-white">
            <span className="text-3xl font-bold text-[#172536]">
              {interview?.overallScore ?? 0}
            </span>

            <span className="text-xs font-medium text-[#727A80]">
              out of 10
            </span>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">

            <div className="rounded-xl bg-[#F3F0E9] p-4">
              <p className="text-xs text-[#858B8D]">
                Questions
              </p>

              <p className="mt-1 text-xl font-bold text-[#172536]">
                5
              </p>
            </div>

            <div className="rounded-xl bg-[#F3F0E9] p-4">
              <p className="text-xs text-[#858B8D]">
                Interview
              </p>

              <p className="mt-1 text-sm font-bold capitalize text-[#172536]">
                {interviewType}
              </p>
            </div>

            <div className="rounded-xl bg-[#F3F0E9] p-4">
              <p className="text-xs text-[#858B8D]">
                Status
              </p>

              <p className="mt-1 text-sm font-bold text-green-600">
                Completed
              </p>
            </div>

          </div>

        </div>

      </div>
    );
  }

  // =========================================================
  // INTERVIEW SCREEN
  // =========================================================

  const questionNumber = interview?.questions?.length || 1;

  return (
    <div className="mx-auto w-full max-w-4xl">

      {/* Header */}
      <div className="mb-6">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#A78335]">
              Live AI Interview
            </p>

            <h1 className="mt-2 text-2xl font-bold tracking-tight text-[#172536] sm:text-3xl">
              {jobRole === "frontend"
                ? "Frontend Developer"
                : jobRole === "backend"
                ? "Backend Developer"
                : jobRole === "fullstack"
                ? "Full Stack Developer"
                : "Software Engineer"}
            </h1>
          </div>

          <div className="rounded-full bg-[#E7EEF8] px-4 py-2 text-sm font-semibold text-[#4F8FD9]">
            Question {Math.min(questionNumber, TOTAL_QUESTIONS)} /{" "}
            {TOTAL_QUESTIONS}
          </div>

        </div>

        {/* Progress */}
        <div className="mt-5 h-2 overflow-hidden rounded-full bg-[#E5E0D6]">
          <div
            className="h-full rounded-full bg-[#60A5FA] transition-all duration-500"
            style={{
              width: `${Math.min(
                (questionNumber / TOTAL_QUESTIONS) * 100,
                100
              )}%`,
            }}
          />
        </div>

      </div>

      {error && (
        <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
          {error}
        </div>
      )}

      {/* Question */}
      <div className="rounded-2xl border border-[#D8D0C1] bg-[#FBF9F4] p-6 shadow-sm sm:p-8">

        {questionLoading ? (
          <div className="flex min-h-[300px] flex-col items-center justify-center text-center">

            <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#DDE5EF] border-t-[#4F8FD9]" />

            <p className="mt-5 text-sm font-semibold text-[#344354]">
              AI is preparing your question...
            </p>

            <p className="mt-1 text-xs text-[#858B8D]">
              This may take a few seconds.
            </p>

          </div>
        ) : currentQuestion ? (
          <>
            <div>
              <p className="text-sm font-bold text-[#4F8FD9]">
                Question {questionNumber}
              </p>

              <h2 className="mt-4 text-xl font-bold leading-8 text-[#172536] sm:text-2xl">
                {currentQuestion.question}
              </h2>
            </div>

            <div className="mt-8">

              <label
                htmlFor="answer"
                className="mb-2 block text-sm font-semibold text-[#344354]"
              >
                Your Answer
              </label>

              <textarea
                id="answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                rows={7}
                disabled={answerLoading}
                placeholder="Type your answer here..."
                className="w-full resize-none rounded-xl border border-[#D7CFC0] bg-white p-4 text-sm leading-6 text-[#172536] outline-none transition placeholder:text-[#A5A7A4] focus:border-[#60A5FA] focus:ring-4 focus:ring-[#60A5FA]/10 disabled:cursor-not-allowed disabled:opacity-60"
              />

              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                <p className="text-xs text-[#858B8D]">
                  Take your time and explain your reasoning clearly.
                </p>

                <button
                  type="button"
                  onClick={handleSubmitAnswer}
                  disabled={answerLoading || !answer.trim()}
                  className="rounded-xl bg-[#172536] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#24364A] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {answerLoading
                    ? "Evaluating..."
                    : "Submit Answer →"}
                </button>

              </div>

            </div>
          </>
        ) : (
          <div className="py-10 text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E7EEF8] text-2xl">
              🎤
            </div>

            <h2 className="mt-5 text-xl font-bold text-[#172536]">
              Ready?
            </h2>

            <button
              type="button"
              onClick={() => generateQuestion(interview._id)}
              className="mt-5 rounded-xl bg-[#172536] px-6 py-3 text-sm font-semibold text-white"
            >
              Begin Questions
            </button>

          </div>
        )}

      </div>

      {/* Evaluation */}
      {evaluation && (
        <div className="mt-6 rounded-2xl border border-[#D8D0C1] bg-[#FBF9F4] p-6 shadow-sm sm:p-8">

          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">

            <div className="flex-1">

              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#68734F]">
                AI Feedback
              </p>

              <p className="mt-3 text-sm leading-7 text-[#4B5563]">
                {evaluation.feedback}
              </p>

            </div>

            <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-2xl bg-[#E7EEF8]">
              <span className="text-2xl font-bold text-[#4F8FD9]">
                {evaluation.score}
              </span>

              <span className="text-xs text-[#727A80]">
                / 10
              </span>
            </div>

          </div>

          {evaluation.strengths?.length > 0 && (
            <div className="mt-7">

              <h3 className="text-sm font-bold text-[#172536]">
                Strengths
              </h3>

              <div className="mt-3 space-y-2">
                {evaluation.strengths.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-3 rounded-lg bg-[#F3F0E9] px-4 py-3"
                  >
                    <span className="font-bold text-green-600">
                      ✓
                    </span>

                    <p className="text-sm leading-6 text-[#59636D]">
                      {item}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          )}

          {evaluation.improvements?.length > 0 && (
            <div className="mt-7">

              <h3 className="text-sm font-bold text-[#172536]">
                Areas to Improve
              </h3>

              <div className="mt-3 space-y-2">
                {evaluation.improvements.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-3 rounded-lg bg-[#F3F0E9] px-4 py-3"
                  >
                    <span className="font-bold text-[#A78335]">
                      →
                    </span>

                    <p className="text-sm leading-6 text-[#59636D]">
                      {item}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          )}

          {!completed && (
            <div className="mt-8 flex justify-end">

              <button
                type="button"
                onClick={handleNextQuestion}
                disabled={questionLoading}
                className="rounded-xl bg-[#172536] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#24364A] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {questionNumber >= TOTAL_QUESTIONS
                  ? "Finish Interview →"
                  : "Next Question →"}
              </button>

            </div>
          )}

        </div>
      )}

    </div>
  );
};

export default Interview;

