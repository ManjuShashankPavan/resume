import { useState, useEffect } from 'react'; // Add useEffect import
import { uploadAndProcessResume, getUserResumes } from '../services/resume.service';

const ResumeUpload = ({ userId }) => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [resumes, setResumes] = useState([]);
  const [error, setError] = useState('');

  const handleUpload = async () => {
    setError('');
    try {
      const result = await uploadAndProcessResume(file, userId, setIsUploading);
      setResumes(prev => [result, ...prev]);
    } catch (err) {
      setError(err.message);
    }
  };

  // Properly defined useEffect
  useEffect(() => {
    const fetchResumes = async () => {
      const userResumes = await getUserResumes(userId);
      setResumes(userResumes);
    };

    fetchResumes();
  }, [userId]);

  return (
    <div className="resume-manager">
      <div className="upload-section">
        <input 
          type="file"
          accept=".pdf,.docx"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button 
          onClick={handleUpload} 
          disabled={!file || isUploading}
        >
          {isUploading ? 'Uploading...' : 'Upload Resume'}
        </button>
        {error && <div className="error-message">{error}</div>}
      </div>

      <div className="resume-list">
        <h3>Your Resumes</h3>
        {resumes.length === 0 ? (
          <p>No resumes uploaded yet</p>
        ) : (
          <ul>
            {resumes.map((resume, index) => (
              <li key={index}>
                <a 
                  href={resume.downloadUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  {resume.displayName}
                </a>
                <span>
                  {new Date(resume.uploadedAt).toLocaleDateString()}
                </span>
                <span>
                  {(resume.size / 1024).toFixed(1)} KB
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ResumeUpload;