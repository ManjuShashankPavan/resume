exports.processResumeContent = async (req, res) => {
    try {
      const { filePath } = req.body;
      if (!filePath) return res.status(400).json({ error: 'File path required' });
  
      // Download file from Supabase
      const { data: fileBuffer, error: downloadError } = await supabase.storage
        .from('resumes')
        .download(filePath);
  
      if (downloadError) throw downloadError;
  
      // Process file content (using your preferred parser)
      const extractedData = await parseResumeContent(fileBuffer);
      
      res.json({
        success: true,
        data: extractedData
      });
    } catch (err) {
      console.error('Resume processing error:', err);
      res.status(500).json({ 
        error: 'Resume processing failed',
        details: err.message 
      });
    }
  };