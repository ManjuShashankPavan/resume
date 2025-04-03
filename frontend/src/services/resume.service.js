import { supabase } from '../lib/supabase';
import { createHash } from 'crypto-browserify';

const generateFileHash = async (file) => {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return createHash('sha256').update(buffer).digest('hex');
};

export const checkDuplicateResume = async (file, userId) => {
  try {
    const fileHash = await generateFileHash(file);
    const { data, error } = await supabase
      .from('resumes_metadata')
      .select('id')
      .eq('user_id', userId)
      .eq('file_hash', fileHash);

    if (error) throw error;
    return data?.length > 0;
  } catch (error) {
    console.error('Duplicate check error:', error);
    return false;
  }
};

export const uploadAndProcessResume = async (file, userId) => {
  if (!file) throw new Error("Please select a file!");
  
  const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  if (!validTypes.includes(file.type)) {
    throw new Error("Only PDF and DOCX files are allowed!");
  }

  if (file.size > 5 * 1024 * 1024) {
    throw new Error("File size exceeds 5MB limit");
  }

  try {
    const fileHash = await generateFileHash(file);
    const originalName = file.name;
    const filePath = `users/${userId}/${Date.now()}_${originalName.replace(/\s+/g, '_')}`;

    if (await checkDuplicateResume(file, userId)) {
      throw new Error("This resume already exists in your profile");
    }

    const { error: uploadError } = await supabase.storage
      .from('resumes')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type
      });

    if (uploadError) throw uploadError;

    const { data: metadata, error: dbError } = await supabase
      .from('resumes_metadata')
      .insert({
        user_id: userId,
        file_name: originalName,
        file_path: filePath,
        file_hash: fileHash,
        file_type: file.type,
        file_size: file.size
      })
      .select()
      .single();

    if (dbError) throw dbError;

    const { data: { publicUrl } } = supabase.storage
      .from('resumes')
      .getPublicUrl(filePath);

    return {
      id: metadata.id,
      displayName: metadata.file_name,
      downloadUrl: publicUrl,
      uploadedAt: metadata.uploaded_at,
      size: metadata.file_size
    };

  } catch (error) {
    console.error("Upload error:", error);
    throw new Error(error.message || "File upload failed");
  }
};

export const getUserResumes = async (userId) => {
  try {
    const { data: resumes, error } = await supabase
      .from('resumes_metadata')
      .select('*')
      .eq('user_id', userId)
      .order('uploaded_at', { ascending: false });

    if (error) throw error;

    return resumes.map(resume => ({
      id: resume.id,
      displayName: resume.file_name,
      downloadUrl: supabase.storage
        .from('resumes')
        .getPublicUrl(resume.file_path).data.publicUrl,
      uploadedAt: resume.uploaded_at,
      size: resume.file_size
    }));
  } catch (error) {
    console.error("Error fetching resumes:", error);
    return [];
  }
};