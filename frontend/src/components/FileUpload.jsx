import { useRef, useState } from "react";

function FileUpload({ file, onFileSelect, accept = ".pdf,.doc,.docx" }) {
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

  const handleRemove = (e) => {
    e.stopPropagation();
    onFileSelect(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="w-full">
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
        className={`w-full rounded-xl p-8 sm:p-10 flex flex-col items-center justify-center transition-all bg-[#151719] border ${
          isDragging
            ? "border-[#3B82F6] bg-[#3B82F6]/10"
            : file
            ? "border-[#292C30]"
            : "border-[#292C30] hover:border-[#3B82F6]/50"
        }`}
      >
        {file ? (
          <div className="flex items-center gap-2.5 py-3 px-4 rounded-lg bg-[#0F1113] border border-[#292C30] text-xs text-[#F5F5F5]">
            <svg className="w-4 h-4 text-[#3B82F6] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            <span className="font-medium truncate max-w-xs sm:max-w-md">{file.name}</span>
            <button
              type="button"
              onClick={handleRemove}
              className="text-[#9CA3AF] hover:text-[#EF4444] transition-colors p-0.5 ml-1 cursor-pointer"
              title="Remove file"
            >
              ✕
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center">
            <div className="text-[#9CA3AF] mb-3">
              <svg className="w-6 h-6 stroke-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>
            <p className="text-xs sm:text-sm font-medium text-[#F5F5F5]">
              Drag and drop your resume here
            </p>
            <p className="text-[11px] text-[#9CA3AF] mt-1 mb-4">
              PDF or DOCX up to 5MB
            </p>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="px-4 py-1.5 rounded-lg text-xs font-medium bg-[#0F1113] hover:bg-[#1E2124] text-[#F5F5F5] border border-[#292C30] transition-colors shadow-xs cursor-pointer"
            >
              Browse files
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default FileUpload;
