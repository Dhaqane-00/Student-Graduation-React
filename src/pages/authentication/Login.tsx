import { ReactElement, Suspense, useState } from 'react';
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from 'store/api/authApi'; // Import the useLoginMutation hook
import { toast, Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css'; // Import toastify CSS
import IconifyIcon from 'components/base/IconifyIcon';
import logo from 'assets/logo/Just_logo2.png';
import Image from 'components/base/Image';

const Login = (): ReactElement => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation(); // Use the login mutation

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await login({ email, password }).unwrap(); // Call the login mutation
      if (response) {
        const { token,user_data } = response;
        console.log(response);
        localStorage.setItem('token', token); // Store the token in local storage
        localStorage.setItem('user', JSON.stringify(user_data));
        localStorage.setItem('user_data', user_data.id);
        
        navigate('/home'); // Redirect to home page after successful login

        toast.success('Login successful!');
      }
    } catch (err) {
      toast.error('Invalid email or password'); // Handle login error
    }
  };

  return (
    <>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bgcolor="background.default"
        py={10}
      >
        <Stack
          direction="row"
          bgcolor="background.paper"
          boxShadow={(theme) => theme.shadows[3]}
          borderRadius={10}
          height={525}
          width={{ md: 380 }}
        >
          <Stack width={{ md: 0.5 }} m={2.5} gap={5}>
            <Link href="" width="fit-content">
              <Image src={logo} width={50.0} />
            </Link>
            <Stack component="form" onSubmit={handleSubmit} alignItems="center" gap={2.5} width={330} mx="auto">
              <Typography variant="h3">Login</Typography>
              <FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="email">
                  Email
                </InputLabel>
                <TextField
                  variant="filled"
                  placeholder="Enter your email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconifyIcon icon="ic:baseline-email" />
                      </InputAdornment>
                    ),
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
              <Typography
                variant="body1"
                sx={{
                  alignSelf: 'flex-end',
                }}
              >
                <Link href="/authentication/reset-password" underline="hover">
                  Forget password
                </Link>
              </Typography>
              <Button type="submit" variant="contained" fullWidth disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Log in'}
              </Button>
              <Typography variant="body2" color="text.secondary" style={{ visibility: 'hidden' }}>
                Don't have an account ?{' '}
                <Link
                  href="/authentication/sign-up"
                  underline="hover"
                  fontSize={(theme) => theme.typography.body1.fontSize}
                >
                  Sign up
                </Link>
              </Typography>
            </Stack>
          </Stack>
          <Suspense
            fallback={
              <Skeleton variant="rectangular" height={1} width={1} sx={{ bgcolor: 'primary.main' }} />
            }
          >
            {/* <Image
              alt="Login banner"
              src={loginBanner}
              sx={{
                width: 0.5,
                display: { xs: 'none', md: 'block' },
              }}
            /> */}
          </Suspense>
        </Stack>
      </Stack>
      <Toaster />
    </>
  );
};

export default Login;
