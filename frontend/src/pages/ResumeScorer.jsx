import { useState } from "react";
import api from "../services/api";
import ScorerInputSection from "../components/ScorerInputSection";
import ResultsDashboard from "../components/ResultsDashboard";

function ResumeScorer() {
  const [analysisMode, setAnalysisMode] = useState("general"); // "general" | "comparison"
  const [resumeFile, setResumeFile] = useState(null);
  const [jdMethod, setJdMethod] = useState("paste"); // "paste" | "upload"
  const [jdText, setJdText] = useState("");
  const [jdFile, setJdFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    if (!resumeFile) {
      setError("Please select a resume file (PDF, DOC, or DOCX).");
      return;
    }

    if (analysisMode === "comparison" && !jdText.trim()) {
      setError("Please provide a job description for comparison mode.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("resume", resumeFile);
      formData.append("job_description", analysisMode === "comparison" ? jdText.trim() : "");

      const response = await api.post("/api/v1/analyze-resume", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setResult(response.data);
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Analysis pipeline failed. Please ensure the backend server is running and your file is valid."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setResumeFile(null);
    setJdText("");
    setJdFile(null);
    setError("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-white tracking-tight">
          🎯 ATS Resume Scorer
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Upload your resume — and optionally a target job description — for comprehensive ATS scoring and skill validation.
        </p>
      </div>

      <ScorerInputSection
        analysisMode={analysisMode}
        setAnalysisMode={setAnalysisMode}
        resumeFile={resumeFile}
        setResumeFile={setResumeFile}
        jdMethod={jdMethod}
        setJdMethod={setJdMethod}
        jdText={jdText}
        setJdText={setJdText}
        jdFile={jdFile}
        setJdFile={setJdFile}
        onAnalyze={handleAnalyze}
        loading={loading}
        error={error}
      />

      {result && (
        <ResultsDashboard
          analysis={result}
          onReset={handleReset}
          filename={resumeFile?.name}
        />
      )}
    </div>
  );
}

export default ResumeScorer;