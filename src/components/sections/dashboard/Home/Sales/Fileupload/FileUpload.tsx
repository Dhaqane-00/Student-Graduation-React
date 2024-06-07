import React, { useState, ChangeEvent, useCallback } from 'react';
import { Box, Button, IconButton, Typography, Grid } from '@mui/material';
import { CloudUpload, Delete } from '@mui/icons-material';
import { useUploadFileMutation } from 'store/api/fileApi'; // Import your RTK query API
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDropzone } from 'react-dropzone';

interface FileWithName extends File {
  name: string;
}

const FileUploadSchema = Yup.object().shape({
  file: Yup.mixed<FileWithName>()
    .required('A file is required')
    .test('fileType', 'Only Excel or CSV files are allowed', (value) => {
      return value && (value.name.endsWith('.xls') || value.name.endsWith('.xlsx') || value.name.endsWith('.csv'));
    }),
});

const FileDropzone: React.FC<{ setFile: (file: FileWithName | null) => void }> = ({ setFile }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0] as FileWithName;
      FileUploadSchema.validate({ file })
        .then(() => {
          setFile(file);
          toast.success('File uploaded successfully!', { position: 'top-center' });
        })
        .catch((error) => {
          toast.error(error.message, { position: 'top-center' });
        });
    }
  }, [setFile]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'text/csv': ['.csv']
    },
  });

  return (
    <Box
      {...getRootProps()}
      sx={{
        border: '2px dashed #90caf9',
        borderRadius: '8px',
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        bgcolor: 'background.paper',
        boxShadow: 1,
        mt: 2,
        cursor: 'pointer',
      }}
    >
      <input {...getInputProps()} />
      <CloudUpload sx={{ fontSize: 48, color: '#90caf9' }} />
      <Typography variant="h6" color="text.secondary" gutterBottom>
        Drag & Drop files here
      </Typography>
      <Typography variant="body1" color="text.secondary">
        or click to select files
      </Typography>
    </Box>
  );
};

const FileUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<FileWithName | null>(null);
  const [uploadFileMutation] = useUploadFileMutation(); // Initialize the uploadFile mutation

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      try {
        const response = await uploadFileMutation(selectedFile); // Call the uploadFile mutation
        console.log(response);
        toast.success('File uploaded successfully!', {
          position: "top-center",
        });
        setSelectedFile(null);
      } catch (error) {
        toast.error('Error uploading file!', {
          position: "top-center",
        });
      }
    } else {
      toast.error('No file selected!', {
        position: "top-center",
      });
    }
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6}>
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
          <FileDropzone setFile={setSelectedFile} />
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
            Process the file
          </Button>
          {!selectedFile && (
            <div className="flex justify-center mt-4">
              <a
                href="/sample.csv"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                download
              >
                Download Sample CSV file
              </a>
            </div>
          )}
          <ToastContainer />
        </Box>
      </Grid>
    </Grid>
  );
};

export default FileUpload;
