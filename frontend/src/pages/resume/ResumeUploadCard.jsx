import { useRef, useState } from "react";
import { Upload, Lock } from "lucide-react";
import { uploadResume } from "../../services/resumeService";
import { FileText } from "lucide-react";

export default function ResumeUploadCard() {
  const fileInputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };
  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a resume.");
      return;
    }

    try {
      setSuccess("");

      setError("");

      setLoading(true);

      const token = localStorage.getItem("accessToken");

      await uploadResume(selectedFile, token);

      setSuccess("Resume uploaded successfully!");

      setSelectedFile(null);

      fileInputRef.current.value = "";

      setTimeout(() => {
        window.location.reload();
      }, 1200);
    } catch (err) {
      console.error(err);

      setError(err.response?.data?.detail || "Upload failed.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="rounded-3xl border-2 border-dashed border-emerald-200 bg-gradient-to-br from-emerald-50/40 via-white to-teal-50/30 p-8 shadow-[0_8px_40px_rgba(15,23,42,0.06)] transition hover:border-emerald-400">
      {/* Upload Area */}

      <div className="flex flex-col items-center justify-center py-6">
        {/* Upload Icon */}

        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
          <Upload size={32} className="text-emerald-700" />
        </div>

        {/* Heading */}

        <h2 className="text-2xl font-bold text-slate-900">
          Upload your resume
        </h2>

        {/* Subtitle */}

        <p className="mt-2 text-base text-slate-500">
          Drag & drop your file here or click below
        </p>

        {/* File Types */}

        <div className="mt-2 text-center">
          <p className="text-sm text-slate-400">PDF, DOCX only (Max. 5MB)</p>

          {selectedFile && (
            <div className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-emerald-50 px-4 py-2">
              <FileText size={16} className="text-emerald-700" />

              <p className="text-sm font-semibold text-emerald-700">
                {selectedFile.name}
              </p>
            </div>
          )}
        </div>

        {/* Button */}

        <div className="mt-5 flex flex-col items-center gap-3">
          <button
            onClick={() => fileInputRef.current.click()}
            className="flex items-center gap-2 rounded-xl bg-emerald-700 px-6 py-3 text-base font-semibold text-white transition hover:bg-emerald-800"
          >
            <Upload size={18} />
            Choose File
          </button>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".pdf,.docx"
            className="hidden"
          />

          {selectedFile && (
            <button
              onClick={handleUpload}
              disabled={loading}
              className="rounded-xl bg-slate-900 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Uploading..." : "Upload Resume"}
            </button>
          )}

          {error && (
            <p className="mt-2 text-center text-sm font-semibold text-red-600">
              {error}
            </p>
          )}
        </div>

        {/* Security */}

        <div className="mt-6 flex items-center gap-2 text-sm text-slate-500">
          <Lock size={14} className="text-slate-400" />

          <span>Your data is secure and confidential</span>
        </div>
      </div>
    </div>
  );
}
