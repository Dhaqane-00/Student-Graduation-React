import React, { useState, ChangeEvent } from 'react';
import { Box, Button, IconButton, Typography, Snackbar, Alert } from '@mui/material';
import { CloudUpload, Delete } from '@mui/icons-material';
import { useUploadFileMutation } from 'store/api/fileApi'; // Import your RTK query API

const FileUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [uploadFileMutation] = useUploadFileMutation(); // Initialize the uploadFile mutation

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      try {
        const response = await uploadFileMutation(selectedFile); // Call the uploadFile mutation
        console.log(response);
        setSnackbarMessage('File uploaded successfully!');
        setSnackbarOpen(true);
        setSelectedFile(null);
      } catch (error) {
        setSnackbarMessage('Error uploading file!');
        setSnackbarOpen(true);
      }
    } else {
      setSnackbarMessage('No file selected!');
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box
      sx={{
        border: '2px dashed #90caf9',
        borderRadius: '8px',
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        bgcolor: 'background.paper',
        boxShadow: 1,
      }}
    >
      <CloudUpload sx={{ fontSize: 48, color: '#90caf9' }} />
      <Typography variant="h6" color="text.secondary" gutterBottom>
        Browse Files to upload
      </Typography>
      <Button variant="contained" component="label">
        Browse File
        <input type="file" hidden onChange={handleFileChange} />
      </Button>
      {selectedFile && (
        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
          <Typography variant="body1">{selectedFile.name}</Typography>
          <IconButton color="error" onClick={handleRemoveFile}>
            <Delete />
          </IconButton>
        </Box>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        disabled={!selectedFile}
        sx={{ mt: 2 }}
      >
        Upload File
      </Button>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default FileUpload;
