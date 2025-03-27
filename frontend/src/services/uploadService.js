import { supabase } from "../lib/supabase";

export const uploadResume = async (file, setUploading, setResumeURL) => {
  if (!file) {
    alert("Please select a file!");
    return;
  }

  setUploading(true);

  try {
    const bucketName = "Resume"; // Ensure this matches your Supabase bucket name
    const filePath = `${file.name}`;

    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage.from(bucketName).upload(filePath, file);

    if (error) throw error;

    // Get public URL
    const { data: urlData } = supabase.storage.from(bucketName).getPublicUrl(filePath);
    setResumeURL(urlData.publicUrl);
    alert("Resume uploaded successfully!");
  } catch (error) {
    console.error("Upload failed:", error.message);
    alert("Upload failed! Check console for details.");
  } finally {
    setUploading(false);
  }
};