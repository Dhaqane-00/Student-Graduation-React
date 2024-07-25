import { ReactElement, useState } from 'react';
import { Button, FormControl, IconButton, InputAdornment, InputLabel, Link, Stack, TextField, Typography } from '@mui/material';
import { toast, Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import IconifyIcon from 'components/base/IconifyIcon';
import { useForgotPasswordMutation } from 'store/api/authApi'; // Adjust the import path as needed

const ResetPassword = (): ReactElement => {
  const [email, setEmail] = useState('');
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation(); // Use the useForgotPasswordMutation hook

  const handleResetPassword = async () => {
    try {
      // Call the forgotPassword mutation
      const response = await forgotPassword({ email });
      if (response.error) {
        toast.error('Error sending reset password email');
      } else {
        toast.success('Reset password email sent successfully to ' + email + '  Check your inbox.');
        
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      toast.error('Error sending reset password email');
    }
  };

  return (
    <Stack direction="row" bgcolor="background.paper" boxShadow={(theme) => theme.shadows[3]} borderRadius={10} height={525} width={{ md: 380 }}>
      <Stack width={{ md: 0.5 }} m={2.5} gap={5}>
        <Stack alignItems="center" gap={3.75} width={330} mx="auto">
          <Typography variant="h3">Reset Password</Typography>
          <FormControl variant="standard" fullWidth>
            <InputLabel shrink htmlFor="email">
              Email
            </InputLabel>
            <TextField
              variant="filled"
              placeholder="Enter your email"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="clear email"
                      onClick={() => setEmail('')}
                      edge="end"
                      sx={{ color: 'text.secondary' }}
                    >
                      <IconifyIcon icon="ic:baseline-clear" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
          <Button variant="contained" fullWidth onClick={handleResetPassword} disabled={isLoading}>
            {isLoading ? 'Sending Email...' : 'Send'}
          </Button>
          <Typography variant="body2" color="text.secondary">
            Back to{' '}
            <Link
              href="/authentication/login"
              underline="hover"
              fontSize={(theme) => theme.typography.body1.fontSize}
            >
              Log in
            </Link>
          </Typography>
        </Stack>
      </Stack>
      <Toaster position="top-center"  />
    </Stack>
  );
};

export default ResetPassword;
