import { useRef, useState } from "react";

function FileUpload({ file, onFileSelect, accept = ".pdf,.doc,.docx", label = "Upload Resume" }) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-bold text-slate-300 tracking-wide uppercase">{label}</label>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={handleChange}
      />
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center min-h-[190px] ${
          isDragging
            ? "border-indigo-400 bg-indigo-950/40 scale-[1.01]"
            : file
            ? "border-emerald-500/60 bg-emerald-950/30 hover:bg-emerald-950/40"
            : "border-slate-700 bg-slate-900/40 hover:bg-slate-800/60 hover:border-slate-500"
        }`}
      >
        <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-2xl mb-3 shadow-inner">
          {file ? "📄" : "☁️"}
        </div>
        
        {file ? (
          <div className="space-y-1">
            <div className="text-xs font-bold text-emerald-300 flex items-center justify-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-emerald-500 text-slate-950 text-[10px] flex items-center justify-center font-bold">✓</span>
              {file.name}
            </div>
            <p className="text-[11px] text-slate-400">
              {(file.size / 1024).toFixed(1)} KB — Click or drop to replace
            </p>
          </div>
        ) : (
          <div className="space-y-1">
            <p className="text-xs font-semibold text-slate-300">
              <span className="text-indigo-400 font-bold hover:underline">Click to browse</span> or drag and drop
            </p>
            <p className="text-[11px] text-slate-500">PDF, DOC, DOCX (up to 5 MB)</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default FileUpload;
