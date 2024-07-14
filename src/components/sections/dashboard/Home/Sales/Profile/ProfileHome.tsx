import React, { useEffect, useState } from 'react';
import { Container, Grid, Avatar, Typography, TextField, Button, Box } from '@mui/material';
import { styled } from '@mui/system';
import { useGetUserByIDQuery, useUpdateUserMutation } from 'store/api/authApi'; // Adjust the import path as per your project structure
import { toast } from 'react-toastify'; // Assuming you have toast notifications set up

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

const ProfileHome: React.FC = () => {
  const userId = localStorage.getItem('user_data'); // Assuming 'user_data' contains the user ID
  const { data: userData, isLoading, isError } = useGetUserByIDQuery(userId);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [image, setImage] = useState<string>(''); // Initialize with an empty string or initial profile image URL
  const [imageFile, setImageFile] = useState<File | null>(null); // To store the selected file
  const [updateUser] = useUpdateUserMutation();

  useEffect(() => {
    if (userData && userData.user_data) {
      const { name, email, status, image } = userData.user_data;
      setName(name || '');
      setEmail(email || '');
      setStatus(status || '');
      setImage(image || '');
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
      formData.append('status', status);
      if (imageFile) {
        formData.append('image', imageFile);
      }
  
      console.log('FormData:', Array.from(formData.entries()));
  
      const response = await updateUser({ userId, formData }).unwrap();
      if (response) {
        toast.success('Profile updated successfully!');
      }
      console.log(response);
    } catch (error) {
      toast.error('Failed to update profile. Please try again.');
      console.error('Update error:', error);
    }
  };
  

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching user data</div>;

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
            <Button variant="contained" color="primary" component="span" style={{ marginTop: '1rem' }}>
              Upload Image
            </Button>
          </label>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography variant="h4">Edit Profile</Typography>
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
              InputProps={{
                readOnly: true, // Assuming email is not editable
              }}
            />
          </FieldContainer>
          <FieldContainer>
            <TextField
              label="Status"
              variant="outlined"
              fullWidth
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
          </FieldContainer>
          <FieldContainer>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
          </FieldContainer>
        </Grid>
      </Grid>
    </Root>
  );
};

export default ProfileHome;
