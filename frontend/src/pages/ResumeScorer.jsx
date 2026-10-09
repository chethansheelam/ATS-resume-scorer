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
    <div className="w-full">
      {result ? (
        <ResultsDashboard
          analysis={result}
          onReset={handleReset}
          filename={resumeFile?.name}
        />
      ) : (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-[#F5F5F5] tracking-tight">
              ATS Scorer
            </h1>
            <p className="text-xs sm:text-sm text-[#9CA3AF] mt-1">
              Upload your resume to get a full ATS compatibility score and prioritized fixes.
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
        </div>
      )}
    </div>
  );
}

export default ResumeScorer;