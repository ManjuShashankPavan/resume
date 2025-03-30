import { supabase } from '../lib/supabase';

export const uploadAndProcessResume = async (file, userId, setUploading) => {
  // Validation
  if (!file) throw new Error("Please select a file!");
  
  const validTypes = [
    'application/pdf', 
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];
  
  if (!validTypes.includes(file.type)) {
    throw new Error("Only PDF and DOCX files are allowed!");
  }

  if (file.size > 5 * 1024 * 1024) {
    throw new Error("File size exceeds 5MB limit");
  }

  setUploading(true);

  try {
    const bucketName = "resumes";
    const originalFileName = file.name;
    const fileExt = originalFileName.split('.').pop();
    const filePath = `users/${userId}/${Date.now()}_${originalFileName.replace(/\s+/g, '_')}`;

    // Check for existing files
    const { data: existing } = await supabase.storage
      .from(bucketName)
      .list(`users/${userId}`, { search: originalFileName });

    if (existing?.length > 0) {
      throw new Error("You've already uploaded a file with this name");
    }

    // Upload with metadata
    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type,
        metadata: {
          originalFileName,
          userId,
          uploadedAt: new Date().toISOString()
        }
      });

    if (uploadError) throw uploadError;

    // Get downloadable URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath);

    return {
      displayName: originalFileName,
      storagePath: filePath,
      downloadUrl: publicUrl,
      uploadedAt: new Date().toISOString(),
      fileType: file.type
    };

  } catch (error) {
    console.error("Resume upload error:", error);
    throw new Error(error.message || "File upload failed");
  } finally {
    setUploading(false);
  }
};

export const getUserResumes = async (userId) => {
  try {
    const { data: files, error } = await supabase.storage
      .from('resumes')
      .list(`users/${userId}`);

    if (error) throw error;

    return Promise.all(files.map(async (file) => {
      const { data: { publicUrl } } = supabase.storage
        .from('resumes')
        .getPublicUrl(`users/${userId}/${file.name}`);

      return {
        displayName: file.metadata?.originalFileName || file.name,
        downloadUrl: publicUrl,
        uploadedAt: file.metadata?.uploadedAt || file.created_at,
        size: file.metadata?.size || 0
      };
    }));
  } catch (error) {
    console.error("Error fetching resumes:", error);
    return [];
  }
};