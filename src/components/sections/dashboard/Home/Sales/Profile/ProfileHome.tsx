import React, { useEffect, useState } from 'react';
import { Container, Grid, Avatar, Typography, TextField, Button, Box, CircularProgress, Snackbar, Alert } from '@mui/material';
import { styled } from '@mui/system';
import { useGetUserByIDQuery, useUpdateUserMutation } from 'store/api/authApi'; // Adjust the import path as per your project structure
import { toast, Toaster } from 'react-hot-toast';
import ContentLoader from 'react-content-loader';

// Styles
const Root = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(15),
  height: theme.spacing(15),
  margin: '0 auto',
}));

const FieldContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const Shimmer = () => (
  <ContentLoader
    speed={2}
    width={400}
    height={500}
    viewBox="0 0 400 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="200" cy="100" r="70" />
    <rect x="50" y="200" rx="5" ry="5" width="300" height="25" />
    <rect x="50" y="250" rx="5" ry="5" width="300" height="25" />
    <rect x="50" y="300" rx="5" ry="5" width="300" height="25" />
    <rect x="50" y="350" rx="5" ry="5" width="300" height="25" />
    <rect x="50" y="400" rx="5" ry="5" width="300" height="25" />
  </ContentLoader>
);

const ProfileHome: React.FC = () => {
  const userId = localStorage.getItem('user_data'); // Assuming 'user_data' contains the user ID
  const { data: userData, isLoading: isLoadingUser, isError: isErrorUser } = useGetUserByIDQuery(userId);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>(''); // For password change
  const [image, setImage] = useState<string>(''); // Initialize with an empty string or initial profile image URL
  const [imageFile, setImageFile] = useState<File | null>(null); // To store the selected file
  const [updateUser, { isLoading: isUpdating, isError: isErrorUpdate }] = useUpdateUserMutation();

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');


  useEffect(() => {
    if (userData && userData.user_data) {
      const { name, email, image } = userData.user_data;
      setName(name);
      setEmail(email);
      setImage(image);
    }
  }, [userData]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string); // Display the image immediately
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      if (!userId) {
        throw new Error('User ID is missing');
      }

      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      if (password) {
        formData.append('password', password); // Append password if changed
      }
      if (imageFile) {
        formData.append('image', imageFile);
      }

      console.log('FormData:', Array.from(formData.entries()));

      const response = await updateUser({ userId, formData }).unwrap();
      if (response) {
        toast.success(response.message || 'Profile updated successfully!');
      } else {
        toast.error('Failed to update profile. Please try again.');
      }
      console.log(response);
    } catch (error) {
      toast.error('Failed to update profile. Please try again.');
      console.error('Update error:', error);
    }
  };

  const handleSnackbarOpen = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  if (isLoadingUser) return <Shimmer />;
  if (isErrorUser) return <div>Error fetching user data</div>;

  return (
    <Root>
      <Grid container spacing={3} alignItems="center" justifyContent="center">
        <Grid item xs={12} sm={4}>
          <StyledAvatar alt={name} src={image} />
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="profile-image-upload"
            type="file"
            onChange={handleImageChange}
          />
          <label htmlFor="profile-image-upload">
            <Button variant="contained" color="primary" component="span" fullWidth style={{ marginTop: '1rem' }}>
              Upload Image
            </Button>
          </label>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography variant="h4" align="center">Profile</Typography>
          <FieldContainer>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FieldContainer>
          <FieldContainer>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onClick={() => handleSnackbarOpen('Changing Email')}
            />
          </FieldContainer>
          <FieldContainer>
            <TextField
              label="New Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FieldContainer>
          <FieldContainer>
            <Button variant="contained" color="primary" onClick={handleSave} disabled={isUpdating}>
              {isUpdating ? <CircularProgress size={24} /> : 'Save'}
            </Button>
          </FieldContainer>
          {isErrorUpdate && <Typography color="error">Failed to update profile. Please try again.</Typography>}
        </Grid>
      </Grid>
      <Toaster
        position="top-center" // Change position as needed
        reverseOrder={false}
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        action={
          <Button color="inherit" onClick={handleSnackbarClose}>
            Close
          </Button>
        }
      >
        <Alert onClose={handleSnackbarClose} severity="warning" sx={{ width: '100%', color: 'black' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Root>
  );
};

export default ProfileHome;
