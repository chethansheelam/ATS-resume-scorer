import { useRef } from "react";
import FileUpload from "./FileUpload";

function ScorerInputSection({
  analysisMode,
  setAnalysisMode,
  resumeFile,
  setResumeFile,
  jdMethod,
  setJdMethod,
  jdText,
  setJdText,
  jdFile,
  setJdFile,
  onAnalyze,
  loading,
  error,
}) {
  const jdFileInputRef = useRef(null);

  const handleJdFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.name.toLowerCase().endsWith(".txt")) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setJdText(event.target.result);
          setJdFile(file);
        };
        reader.readAsText(file);
      } else {
        alert("Job description files must be plain text (.txt).");
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Select mode */}
      <div className="space-y-2.5">
        <h3 className="text-xs font-semibold text-[#F5F5F5]">1. Select mode</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {/* General ATS Score Card */}
          <div
            onClick={() => setAnalysisMode("general")}
            className={`p-4 rounded-xl cursor-pointer transition-all border text-left bg-[#151719] ${
              analysisMode === "general"
                ? "border-[#3B82F6] ring-1 ring-[#3B82F6]/40"
                : "border-[#292C30] hover:border-[#3B82F6]/50"
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#3B82F6]/10 border border-[#3B82F6]/20 text-[#3B82F6] flex items-center justify-center shrink-0 mt-0.5">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-[#F5F5F5]">General ATS Score</h4>
                <p className="text-[11px] text-[#9CA3AF] mt-1 leading-relaxed">
                  Score formatting, content, and ATS compatibility without a specific job.
                </p>
              </div>
            </div>
          </div>

          {/* Job Description Comparison Card */}
          <div
            onClick={() => setAnalysisMode("comparison")}
            className={`p-4 rounded-xl cursor-pointer transition-all border text-left bg-[#151719] ${
              analysisMode === "comparison"
                ? "border-[#3B82F6] ring-1 ring-[#3B82F6]/40"
                : "border-[#292C30] hover:border-[#3B82F6]/50"
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#3B82F6]/10 border border-[#3B82F6]/20 text-[#3B82F6] flex items-center justify-center shrink-0 mt-0.5">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="22" y1="12" x2="18" y2="12" />
                  <line x1="6" y1="12" x2="2" y2="12" />
                  <line x1="12" y1="6" x2="12" y2="2" />
                  <line x1="12" y1="22" x2="12" y2="18" />
                </svg>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-[#F5F5F5]">Job Description Comparison</h4>
                <p className="text-[11px] text-[#9CA3AF] mt-1 leading-relaxed">
                  Add keyword coverage and semantic match scoring against a target JD.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Upload resume */}
      <div className="space-y-2.5">
        <h3 className="text-xs font-semibold text-[#F5F5F5]">2. Upload resume</h3>
        <FileUpload
          file={resumeFile}
          onFileSelect={setResumeFile}
          accept=".pdf,.doc,.docx"
        />
      </div>

      {/* 3. Target job description (visible in comparison mode) */}
      {analysisMode === "comparison" && (
        <div className="space-y-2.5">
          <h3 className="text-xs font-semibold text-[#F5F5F5]">3. Target job description</h3>
          <div className="bg-[#151719] border border-[#292C30] rounded-xl p-4 sm:p-5 space-y-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setJdMethod("paste")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  jdMethod === "paste"
                    ? "bg-[#0F1113] text-[#F5F5F5] border border-[#292C30]"
                    : "text-[#9CA3AF] hover:text-[#F5F5F5]"
                }`}
              >
                Paste text
              </button>
              <button
                type="button"
                onClick={() => setJdMethod("upload")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  jdMethod === "upload"
                    ? "bg-[#0F1113] text-[#F5F5F5] border border-[#292C30]"
                    : "text-[#9CA3AF] hover:text-[#F5F5F5]"
                }`}
              >
                Upload .txt
              </button>
            </div>

            {jdMethod === "paste" ? (
              <textarea
                rows={5}
                className="w-full bg-[#0F1113] border border-[#292C30] rounded-lg p-3 text-xs text-[#F5F5F5] placeholder:text-[#9CA3AF]/50 focus:outline-none focus:border-[#3B82F6] font-mono transition-colors"
                placeholder="Paste the target job description here..."
                value={jdText}
                onChange={(e) => setJdText(e.target.value)}
              />
            ) : (
              <div className="pt-1">
                <input
                  ref={jdFileInputRef}
                  type="file"
                  accept=".txt"
                  className="hidden"
                  onChange={handleJdFileUpload}
                />
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => jdFileInputRef.current?.click()}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-medium bg-[#151719] hover:bg-[#1E2124] text-[#F5F5F5] border border-[#292C30] transition-colors"
                  >
                    Choose .txt file
                  </button>
                  <span className="text-xs text-[#9CA3AF] truncate max-w-xs">
                    {jdFile ? jdFile.name : "No file chosen"}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {error && (
        <div className="p-3.5 bg-[#EF4444]/10 border border-[#EF4444]/30 text-[#EF4444] rounded-xl text-xs">
          {error}
        </div>
      )}

      {/* Submit Button */}
      <div className="pt-1">
        <button
          type="button"
          onClick={onAnalyze}
          disabled={loading || !resumeFile || (analysisMode === "comparison" && !jdText.trim())}
          className="w-full py-2.5 px-4 rounded-lg text-xs sm:text-sm font-medium text-white bg-[#3B82F6] hover:bg-[#2563EB] disabled:bg-[#3B82F6]/50 disabled:cursor-not-allowed transition-colors shadow-xs flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Analyzing resume...</span>
            </>
          ) : (
            <span>Analyze resume</span>
          )}
        </button>
      </div>
    </div>
  );
}

export default ScorerInputSection;
