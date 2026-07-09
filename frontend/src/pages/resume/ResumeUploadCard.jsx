import { useRef, useState } from "react";
import { Upload, Lock, FileText, Eye, RefreshCw } from "lucide-react";
import { uploadResume, viewResume } from "../../services/resumeService";
import toast from "react-hot-toast";

export default function ResumeUploadCard() {
  const fileInputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [isUploaded, setIsUploaded] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      setError("");
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a resume.");
      setError("Please select a resume.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const token = localStorage.getItem("accessToken");
      const response = await uploadResume(selectedFile, token);
      setUploadedFileName(response.filename);
      setIsUploaded(true);
      toast.success(response.message || "Resume uploaded successfully!");
      fileInputRef.current.value = "";
    } catch (err) {
      console.error(err);
      const errMsg = err.response?.data?.detail || "Upload failed.";
      setError(errMsg);
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleViewResume = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const blob = await viewResume(token);
      const url = window.URL.createObjectURL(blob);
      window.open(url, "_blank");
    } catch (err) {
      console.error(err);
      toast.error("Failed to load resume file.");
    }
  };

  return (
    <div className="h-full rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_8px_40px_rgba(15,23,42,0.06)] flex flex-col">
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        ref={fileInputRef}
        hidden
        onChange={handleFileChange}
      />

      {!isUploaded ? (
        <div className="flex-1 flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-emerald-200 bg-gradient-to-br from-emerald-50/30 via-white to-white p-4 transition hover:border-emerald-400 min-h-[290px]">
          {/* Upload Icon */}
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">
            <Upload size={28} className="text-emerald-700" />
          </div>

          {/* Heading */}
          <h2 className="text-2xl font-bold text-slate-900">
            Upload your resume
          </h2>

          {/* Subtitle */}
          <p className="mt-2 text-base text-slate-500">
            Drag & drop your file here
          </p>

          {/* Selected File */}
          <div className="mt-2 text-center">
            <p className="text-xs text-slate-400">
              PDF, DOCX only (Max. 5MB)
            </p>

            {selectedFile && (
              <div className="mt-2 flex items-center justify-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-2 max-w-[250px] mx-auto">
                <FileText size={16} className="text-emerald-700" />
                <span className="text-xs font-semibold text-emerald-700 truncate">
                  {selectedFile.name}
                </span>
              </div>
            )}
          </div>

          {/* Error message inside container */}
          {error && (
            <div className="mt-3 flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-2 text-red-700 text-xs font-semibold">
              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-700 font-bold">!</span>
              <span>{error}</span>
            </div>
          )}

          {/* Buttons */}
          <div className="mt-4 flex items-center gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800"
            >
              <Upload size={16} />
              Choose File
            </button>

            {selectedFile && (
              <button
                type="button"
                onClick={handleUpload}
                disabled={loading}
                className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Uploading..." : "Upload Resume"}
              </button>
            )}
          </div>

          {/* Security */}
          <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
            <Lock size={12} className="text-slate-400" />
            <span>Your data is secure and confidential</span>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-between rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50/30 via-white to-white p-6 min-h-[290px]">
          {/* Status Header */}
          <div className="flex flex-col items-center text-center mt-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <h2 className="mt-2 text-xl font-bold text-slate-900">
              Resume Ready!
            </h2>
            <p className="mt-0.5 text-xs text-slate-400">
              Your resume is successfully uploaded and parsed.
            </p>
          </div>

          {/* Document Details Box (Lines style) */}
          <div className="w-full max-w-sm my-4 rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
                <FileText size={20} className="text-emerald-700" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-900 truncate">
                  {uploadedFileName || selectedFile?.name || "resume.pdf"}
                </p>
                <p className="text-xs text-slate-400">Document File</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 pt-3 text-center">
              <div className="border-r border-slate-100">
                <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">Status</p>
                <p className="mt-1 text-xs font-bold text-emerald-600">Ready</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">Analysis</p>
                <p className="mt-1 text-xs font-bold text-slate-700">100% Parsed</p>
              </div>
            </div>
          </div>

          {/* Buttons Row */}
          <div className="flex items-center gap-3 w-full justify-center mt-2">
            <button
              type="button"
              onClick={handleViewResume}
              className="flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800 shadow-sm"
            >
              <Eye size={16} />
              View Resume
            </button>

            <button
              type="button"
              onClick={() => {
                setIsUploaded(false);
                setSelectedFile(null);
                setError("");
                setTimeout(() => fileInputRef.current.click(), 100);
              }}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <RefreshCw size={16} />
              Replace
            </button>
          </div>
        </div>
      )}
    </div>
  );
}