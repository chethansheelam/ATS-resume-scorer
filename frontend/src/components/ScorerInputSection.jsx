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
  const handleJdFileUpload = (file) => {
    if (file && file.name.toLowerCase().endsWith(".txt")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setJdText(e.target.result);
        setJdFile(file);
      };
      reader.readAsText(file);
    } else {
      alert("Job description files must be plain text (.txt).");
    }
  };

  return (
    <div className="pro-card p-6 sm:p-8 space-y-6">
      {/* Mode Selector */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
          Step 1: Select Analysis Mode
        </label>
        <div className="inline-flex p-1 bg-slate-900 border border-slate-700/80 rounded-xl w-full sm:w-auto">
          <button
            type="button"
            className={`flex-1 sm:flex-initial px-5 py-2 rounded-lg text-xs font-semibold transition-all ${
              analysisMode === "general"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                : "text-slate-400 hover:text-slate-200"
            }`}
            onClick={() => setAnalysisMode("general")}
          >
            📊 General ATS Score
          </button>
          <button
            type="button"
            className={`flex-1 sm:flex-initial px-5 py-2 rounded-lg text-xs font-semibold transition-all ${
              analysisMode === "comparison"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                : "text-slate-400 hover:text-slate-200"
            }`}
            onClick={() => setAnalysisMode("comparison")}
          >
            🎯 Job Description Comparison
          </button>
        </div>
        <p className="text-xs text-slate-400">
          {analysisMode === "general"
            ? "Evaluates overall resume formatting, keyword density, and demonstrated skill validity."
            : "Compares your resume against a target job description to compute match %, semantic similarity, and missing keywords."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Left: Resume Upload */}
        <div>
          <FileUpload
            file={resumeFile}
            onFileSelect={setResumeFile}
            label="Step 2: Upload Resume"
            accept=".pdf,.doc,.docx"
          />
        </div>

        {/* Right: Job Description */}
        <div className="space-y-2">
          {analysisMode === "comparison" ? (
            <>
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Step 3: Target Job Description
                </label>
                <div className="inline-flex p-0.5 bg-slate-900 border border-slate-700 rounded-lg text-[11px]">
                  <button
                    type="button"
                    className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                      jdMethod === "paste" ? "bg-indigo-600 text-white shadow-xs" : "text-slate-400"
                    }`}
                    onClick={() => setJdMethod("paste")}
                  >
                    Paste Text
                  </button>
                  <button
                    type="button"
                    className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                      jdMethod === "upload" ? "bg-indigo-600 text-white shadow-xs" : "text-slate-400"
                    }`}
                    onClick={() => setJdMethod("upload")}
                  >
                    Upload .txt
                  </button>
                </div>
              </div>

              {jdMethod === "paste" ? (
                <div className="space-y-1.5">
                  <textarea
                    rows={7}
                    className="pro-input w-full p-3.5 text-xs font-mono"
                    placeholder="Paste job description requirements, responsibilities, and qualifications..."
                    value={jdText}
                    onChange={(e) => setJdText(e.target.value)}
                  />
                  <div className="flex justify-between items-center text-[11px] text-slate-400">
                    <span>{jdText.length} characters</span>
                    {jdText && (
                      <button
                        type="button"
                        onClick={() => setJdText("")}
                        className="text-rose-400 font-semibold hover:underline"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <FileUpload
                  file={jdFile}
                  onFileSelect={handleJdFileUpload}
                  label="Upload JD (.txt)"
                  accept=".txt"
                />
              )}
            </>
          ) : (
            <div className="border border-slate-800 rounded-2xl p-6 bg-slate-900/40 text-center flex flex-col items-center justify-center min-h-[190px] space-y-2">
              <span className="text-2xl">📋</span>
              <h4 className="text-xs font-bold text-slate-300">General ATS Mode Active</h4>
              <p className="text-[11px] text-slate-500 max-w-xs">
                Switch to 'Job Description Comparison' above if you want to evaluate against a specific role.
              </p>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-950/50 border border-red-800 text-red-300 rounded-xl text-xs font-medium">
          {error}
        </div>
      )}

      <div className="pt-2 text-center">
        <button
          type="button"
          onClick={onAnalyze}
          disabled={loading || !resumeFile || (analysisMode === "comparison" && !jdText.trim())}
          className="btn-accent px-8 py-3.5 rounded-xl text-sm shadow-xl disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Analyzing with Local NLP Models...</span>
            </>
          ) : (
            <span>🚀 Run ATS Analysis</span>
          )}
        </button>
      </div>
    </div>
  );
}

export default ScorerInputSection;
