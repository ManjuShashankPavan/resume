import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { uploadAndProcessResume, getUserResumes } from '../services/resume.service';
import ToastNotification from './ToastNotification';

const ResumeUpload = ({ userId }) => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [resumes, setResumes] = useState([]);
  const [notification, setNotification] = useState(null);
  const [fileError, setFileError] = useState('');

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const userResumes = await getUserResumes(userId);
        setResumes(userResumes);
      } catch (error) {
        showNotification('error', 'Failed to load resumes');
      }
    };
    fetchResumes();
  }, [userId]);

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFileError('');
    
    if (!['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(selectedFile.type)) {
      setFileError('Only PDF and DOCX files are allowed');
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setFileError('File size must be less than 5MB');
      return;
    }

    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      setIsUploading(true);
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        showNotification('error', 'Please sign in to upload resumes');
        return;
      }

      const result = await uploadAndProcessResume(file, session.user.id);
      setResumes(prev => [result, ...prev]);
      showNotification('success', 'Resume uploaded successfully!');
      
      setFile(null);
      document.getElementById('resume-upload').value = '';
    } catch (error) {
      showNotification('error', error.message || 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="resume-manager p-4 max-w-3xl mx-auto">
      {notification && (
        <ToastNotification 
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      <div className="upload-section bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Upload New Resume</h2>
        
        <div className="flex flex-col gap-4">
          <input
            id="resume-upload"
            type="file"
            accept=".pdf,.docx"
            onChange={handleFileChange}
            className="border p-2 rounded w-full"
            disabled={isUploading}
          />
          
          <button
            onClick={handleUpload}
            disabled={!file || isUploading}
            className={`px-4 py-2 rounded text-white ${
              !file || isUploading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isUploading ? 'Uploading...' : 'Upload Resume'}
          </button>
          
          {fileError && <p className="text-red-500 text-sm">{fileError}</p>}
          {file && (
            <p className="text-gray-600 text-sm">
              Selected: {file.name} ({(file.size / 1024).toFixed(1)} KB)
            </p>
          )}
        </div>
      </div>

      <div className="resume-list bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">
          Your Resumes <span className="text-gray-500">({resumes.length})</span>
        </h3>
        
        {resumes.length === 0 ? (
          <p className="text-gray-500 italic">No resumes uploaded yet</p>
        ) : (
          <ul className="space-y-3">
            {resumes.map((resume) => (
              <li key={resume.id} className="flex justify-between items-center py-2 border-b last:border-b-0">
                <div className="flex items-center gap-3">
                  <span className="text-lg">
                    {resume.downloadUrl?.endsWith('.pdf') ? '📄' : '📝'}
                  </span>
                  <a
                    href={resume.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline break-all"
                  >
                    {resume.displayName}
                  </a>
                </div>
                <div className="text-sm text-gray-500 whitespace-nowrap">
                  {new Date(resume.uploadedAt).toLocaleDateString()} • {(resume.size / 1024).toFixed(1)} KB
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ResumeUpload;