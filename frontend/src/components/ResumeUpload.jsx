import { useRef, useState } from "react";
import { uploadResume } from "../services/uploadService";

export default function ResumeUpload() {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [resumeUploaded, setResumeUploaded] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      uploadResume(e.target.files[0], setUploading, () => setResumeUploaded(true));
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg w-96 flex justify-center items-center m-9">
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      {!resumeUploaded && (
        <button 
          onClick={() => fileInputRef.current.click()} 
          disabled={uploading} 
          className={`w-full text-white p-2 rounded transition ${
            uploading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg--600"
          }`}
        >
          {uploading ? "Uploading..." : "Upload Resume"}
        </button>
      )}
    </div>
  );
}
