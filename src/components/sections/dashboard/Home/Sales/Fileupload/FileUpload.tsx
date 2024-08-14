import React, { useState, useCallback } from 'react';
import { Box, Button, IconButton, Typography, Grid, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider } from '@mui/material';
import { CloudUpload, Delete } from '@mui/icons-material';
import { useUploadFileMutation } from 'store/api/fileApi'; // Import your RTK query API
import * as Yup from 'yup';
import { toast, Toaster } from 'react-hot-toast';
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
        width: '100%',
        maxWidth: 400,
        mx: 'auto',
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
  const [uploadFileMutation] = useUploadFileMutation();
  const [openDialog, setOpenDialog] = useState(false);
  const [openInfoDialog, setOpenInfoDialog] = useState(false);

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      try {
        const response = await toast.promise(
          uploadFileMutation(selectedFile),
          {
            loading: 'Uploading file...',
            success: 'Processing file!',
            error: 'Error uploading file!',
          },
          { position: 'top-center' }
        );

        if (response.data && response.data.message) {
          toast.success(response.data.message, { position: 'top-center' });
        } else if ('error' in response && response.error && 'data' in response.error) {
          throw new Error((response.error as any).data.error);
        } else {
          throw new Error('Unknown response from server!');
        }
        setSelectedFile(null);
      } catch (error) {
        toast.error((error as Error).message, { position: 'top-center' });
      }
    } else {
      toast.error('No file selected!', { position: 'top-center' });
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmUpload = () => {
    handleCloseDialog();
    handleUpload();
  };

  const handleOpenInfoDialog = () => {
    setOpenInfoDialog(true);
  };

  const handleCloseInfoDialog = () => {
    setOpenInfoDialog(false);
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12}>
        <Box
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            bgcolor: 'background.paper',
            boxShadow: 1,
            borderRadius: '8px',
            width: '100%',
            maxWidth: 400,
            mx: 'auto',
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
            onClick={handleOpenDialog}
            disabled={!selectedFile}
            sx={{ mt: 2 }}
          >
            Process the file
          </Button>
          {!selectedFile && (
            <Button
              variant="contained"
              color="secondary"
              onClick={handleOpenInfoDialog}
              sx={{ mt: 2 }}
            >
              Information
            </Button>
          )}
          <Toaster />
        </Box>
        <Box justifyContent={'space-between'}>
          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Confirm Upload</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Uploading a new file will clear the old prediction. Are you sure you want to proceed?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">
                Cancel
              </Button>
              <Button onClick={handleConfirmUpload} color="primary" autoFocus>
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog open={openInfoDialog} onClose={handleCloseInfoDialog}>
            <DialogTitle style={{ textAlign: 'center' }}>Information</DialogTitle>
            <DialogContent>
              <DialogContentText>
                <Typography variant="h6">Introduction</Typography>
                Information about the file upload process and requirements And Table
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6">File Upload</Typography>
                <Divider sx={{ my: 2 }} />
                <ul>
                  <li>The file should be in Excel (.xls, .xlsx) or CSV (.csv) format.</li>
                  <li>Ensure the file contains the necessary headers and data format.</li>
                  <li>File size should not exceed the allowed limit.</li>
                </ul>
                Please refer to the file example to understand the format of the file.<br />
                <br />
                <Typography variant="h6">Table - Data Source</Typography>
                <Typography variant="body2">
                  The data displayed in this table is sourced from our internal database, which is regularly updated to reflect the latest information.
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6">Data Format Input</Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body2">
                  <strong>Department:</strong> The department to which the student belongs.<br />
                  <strong>Sex:</strong> The gender of the student.<br />
                  <strong>Mode:</strong> The mode of study (e.g., full-time, part-time).<br />
                  <strong>Att-S1 to Att-S8:</strong> Attendance percentages for each semester.<br />
                  <strong>Schollarship:</strong> The scholarship amount awarded to the student.<br />
                  <strong>No-Re-exam:</strong> The number of subjects the student has had to re-exam.<br />
                  <strong>GPA S1 to GPA S8:</strong> The GPA for each semester.<br />
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6">Prediction</Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body2">
                  <strong>Department:</strong> The department to which the student belongs.<br />
                  <strong>Sex:</strong> The gender of the student.<br />
                  <strong>Mode:</strong> The mode of study (e.g., full-time, part-time).<br />
                  <strong>Att-S1 to Att-S8:</strong> Attendance percentages for each semester.<br />
                  <strong>Att_Average:</strong> The average attendance percentage across all semesters.<br />
                  <strong>Schollarship:</strong> The scholarship amount awarded to the student.<br />
                  <strong>No-Re-exam:</strong> The number of subjects the student has had to re-exam.<br />
                  <strong>GPA S1 to GPA S8:</strong> The GPA for each semester.<br />
                  <strong>CGPA:</strong> The cumulative GPA across all semesters.<br />
                  <strong>Prediction:</strong> The predicted performance or outcome for the student based on the provided data.
                </Typography>
              </DialogContentText>

            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseInfoDialog} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Grid>
    </Grid>
  );
};

export default FileUpload;
