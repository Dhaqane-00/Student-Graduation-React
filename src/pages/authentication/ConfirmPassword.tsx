import { ReactElement, useState, useEffect } from 'react';
import { Button, FormControl, IconButton, InputAdornment, InputLabel, Link, Stack, TextField, Typography } from '@mui/material';
import { toast, Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useLocation } from 'react-router-dom';
import IconifyIcon from 'components/base/IconifyIcon';
import { useResetPasswordMutation } from 'store/api/authApi'; // Adjust the import path as needed
import paths from 'routes/paths'; // Import paths for navigation

const ConfirmPassword = (): ReactElement => {
  const navigate = useNavigate();
  const location = useLocation();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const query = new URLSearchParams(location.search);
  const token = query.get('token');
  console.log(token);

  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    console.log(password)

    try {
      await resetPassword({ token, password }).unwrap(); // Use unwrap() to get the fulfilled or rejected value
      toast.success("Password reset successful");
      navigate(paths.login); // Navigate to login page after successful reset
    } catch (error) {
      toast.error("Error resetting password");
    }
  };

  useEffect(() => {
    if (!token) {
      toast.error("Invalid or missing token");
      navigate(paths.login);
    }
  }, [token, navigate]);

  return (
    <Stack direction="row" bgcolor="background.paper" boxShadow={(theme) => theme.shadows[3]} borderRadius={10} height={525} width={{ md: 380 }}>
      <Stack width={{ md: 0.5 }} m={2.5} gap={5}>
        <Stack alignItems="center" gap={3.75} width={330} mx="auto">
          <Typography variant="h3">Reset Password</Typography>
          <FormControl variant="standard" fullWidth>
            <InputLabel shrink htmlFor="password">
              Password
            </InputLabel>
            <TextField
              variant="filled"
              placeholder="Enter your password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      edge="end"
                      sx={{ color: 'text.secondary' }}
                    >
                      <IconifyIcon icon="ic:baseline-visibility" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
          <FormControl variant="standard" fullWidth>
            <InputLabel shrink htmlFor="confirmPassword">
              Confirm Password
            </InputLabel>
            <TextField
              variant="filled"
              placeholder="Confirm your password"
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      edge="end"
                      sx={{ color: 'text.secondary' }}
                    >
                      <IconifyIcon icon="ic:baseline-visibility" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
          <Button variant="contained" fullWidth onClick={handleResetPassword} disabled={isLoading}>
            {isLoading ? 'Resetting Password...' : 'Reset Password'}
          </Button>
          <Typography variant="body2" color="text.secondary">
            Back to{' '}
            <Link
              href={paths.login}
              underline="hover"
              fontSize={(theme) => theme.typography.body1.fontSize}
            >
              Log in
            </Link>
          </Typography>
        </Stack>
      </Stack>
      <Toaster position="top-right"  />
    </Stack>
  );
};

export default ConfirmPassword;
