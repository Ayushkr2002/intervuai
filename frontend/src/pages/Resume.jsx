import { useState } from "react";
import api from "../api/axios";

const Resume = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resume, setResume] = useState(null);
  const [error, setError] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("Please select a PDF resume.");
      return;
    }

    if (file.type !== "application/pdf") {
      setError("Only PDF files are allowed.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5 MB.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setResume(null);

      const formData = new FormData();
      formData.append("resume", file);

      const response = await api.post("/resumes/upload", formData);

      setResume(response.data.resume);
    } catch (error) {
      console.error("Resume upload error:", error);

      setError(
        error.response?.data?.message ||
          "Resume analysis failed."
      );
    } finally {
      setLoading(false);
    }
  };

  const analysis = resume?.analysis;

  return (
    <div className="mx-auto w-full max-w-6xl">

      {/* Page Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Resume Analyzer
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
          Upload your resume and let AI analyze it for ATS compatibility,
          skills, strengths, and areas for improvement.
        </p>
      </div>

      {/* Upload Card */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Upload your resume
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            PDF files only, maximum size 5 MB.
          </p>
        </div>

        <form onSubmit={handleUpload}>

          {/* File Upload Area */}
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 px-5 py-10 text-center transition hover:border-indigo-400 hover:bg-indigo-50/30 sm:py-14">

            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 text-2xl">
              📄
            </div>

            <p className="text-sm font-semibold text-gray-900">
              {file ? file.name : "Choose your resume"}
            </p>

            <p className="mt-2 text-xs text-gray-500">
              {file
                ? `${(file.size / 1024 / 1024).toFixed(2)} MB`
                : "Click to browse PDF files"}
            </p>

            <input
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={(e) => {
                setFile(e.target.files[0]);
                setError("");
              }}
            />
          </label>

          {/* Error */}
          {error && (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Upload Button */}
          <div className="mt-5 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Analyzing...
                </span>
              ) : (
                "Upload & Analyze"
              )}
            </button>
          </div>

        </form>
      </div>

      {/* Analysis Results */}
      {analysis && (
        <div className="mt-6 space-y-6 sm:mt-8">

          {/* ATS Score */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">

            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <p className="text-sm font-medium text-gray-500">
                  Resume Analysis
                </p>

                <h2 className="mt-1 text-xl font-bold text-gray-900 sm:text-2xl">
                  ATS Compatibility Score
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  Your resume received an ATS score based on its content
                  and structure.
                </p>
              </div>

              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-8 border-indigo-100 sm:h-28 sm:w-28">
                <div className="text-center">
                  <p className="text-2xl font-extrabold text-indigo-600 sm:text-3xl">
                    {analysis.atsScore}
                  </p>

                  <p className="text-xs font-medium text-gray-400">
                    / 100
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Summary */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
            <h2 className="text-lg font-semibold text-gray-900">
              Summary
            </h2>

            <p className="mt-3 text-sm leading-7 text-gray-600">
              {analysis.summary}
            </p>
          </div>

          {/* Technical Skills */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
            <h2 className="text-lg font-semibold text-gray-900">
              Technical Skills
            </h2>

            <div className="mt-4 flex flex-wrap gap-2">
              {analysis.technicalSkills?.map((skill, index) => (
                <span
                  key={index}
                  className="rounded-full bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Strengths & Weak Areas */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

            {/* Strengths */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
              <h2 className="text-lg font-semibold text-gray-900">
                Strengths
              </h2>

              <ul className="mt-4 space-y-3">
                {analysis.strengths?.map((item, index) => (
                  <li
                    key={index}
                    className="flex gap-3 text-sm leading-6 text-gray-600"
                  >
                    <span className="mt-1 shrink-0 text-green-600">
                      ✓
                    </span>

                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Weak Areas */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
              <h2 className="text-lg font-semibold text-gray-900">
                Weak Areas
              </h2>

              <ul className="mt-4 space-y-3">
                {analysis.weakAreas?.map((item, index) => (
                  <li
                    key={index}
                    className="flex gap-3 text-sm leading-6 text-gray-600"
                  >
                    <span className="mt-1 shrink-0 text-orange-500">
                      !
                    </span>

                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* ATS Suggestions */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
            <h2 className="text-lg font-semibold text-gray-900">
              ATS Suggestions
            </h2>

            <ul className="mt-4 space-y-3">
              {analysis.atsSuggestions?.map((item, index) => (
                <li
                  key={index}
                  className="flex gap-3 text-sm leading-6 text-gray-600"
                >
                  <span className="mt-1 shrink-0 text-indigo-600">
                    →
                  </span>

                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      )}
    </div>
  );
};

export default Resume;