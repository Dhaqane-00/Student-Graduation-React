import { ReactElement, useState } from 'react';
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useSignupMutation } from 'store/api/authApi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import IconifyIcon from 'components/base/IconifyIcon';
import { useNavigate } from 'react-router-dom';
import logo from 'assets/logo/Just_logo2.png';
import Image from 'components/base/Image';

const SignUp = (): ReactElement => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [signupMutation, { isLoading, isError, isSuccess }] = useSignupMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await signupMutation(formData);
      if (response.error) {
        toast.error('Sign up failed. Please try again.');
      } else {
        toast.success('Sign up successful! Login to continue');
        setTimeout(() => {
          navigate('/authentication/login'); // Navigate to the login screen after delay
        }, 3000); // Adjust the delay time (in milliseconds) as needed
      }
    } catch (error) {
      toast.error('Sign up failed. Please try again.');
    }
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <form onSubmit={handleSubmit}>
      <ToastContainer />
      <Stack
        direction="row"
        bgcolor="background.paper"
        boxShadow={(theme) => theme.shadows[3]}
        borderRadius={10}
        height={600}
        width={{ md: 380 }}
        px={2}
      >
        <Stack width={{ md: 0.5 }} m={1} gap={5} paddingTop={2}>
          <Link href="/" width="fit-content">
            <Image src={logo} width={50.0} />
          </Link>
          <Stack alignItems="center" gap={2.5} width={330} mx="auto">
            <Typography variant="h3">Signup</Typography>
            <FormControl variant="standard" fullWidth>
              <InputLabel shrink htmlFor="name">
                Name
              </InputLabel>
              <TextField
                variant="filled"
                placeholder="Enter your full name"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" sx={{ width: 16, height: 16 }}>
                      <IconifyIcon icon="mdi:user" width={1} height={1} />
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
            <FormControl variant="standard" fullWidth>
              <InputLabel shrink htmlFor="email">
                Email
              </InputLabel>
              <OutlinedInput
                placeholder="Enter your email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end" sx={{ width: 16, height: 16 }}>
                    <IconifyIcon icon="ic:baseline-email" width={1} height={1} />
                  </InputAdornment>
                }
                sx={{
                  width: 1,
                  backgroundColor: 'action.focus',
                }}
              />
            </FormControl>
            <FormControl variant="standard" fullWidth>
              <InputLabel shrink htmlFor="password">
                Password
              </InputLabel>
              <TextField
                variant="filled"
                placeholder="********"
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                        sx={{
                          color: 'text.secondary',
                        }}
                      >
                        {showPassword ? (
                          <IconifyIcon icon="ic:baseline-key" />
                        ) : (
                          <IconifyIcon icon="ic:baseline-key-off" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
            <Button type="submit" variant="contained" fullWidth disabled={isLoading}>
              {isLoading ? 'Signing up...' : 'Sign up'}
            </Button>
            {isError && (
              <Typography variant="body2" color="error">
                Sign up failed. Please try again.
              </Typography>
            )}
            <Typography variant="body2" color="text.secondary">
              Already have an account ?{' '}
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
        {/* Suspense for the image loading */}
      </Stack>
    </form>
  );
};

export default SignUp;
