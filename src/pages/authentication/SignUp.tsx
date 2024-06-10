import { ReactElement, Suspense, useState } from 'react';
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import signupBanner from 'assets/authentication-banners/signup.png';
import IconifyIcon from 'components/base/IconifyIcon';
import logo from 'assets/logo/Just_logo2.png';
import Image from 'components/base/Image';

const SignUp = (): ReactElement => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  return (
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
          <Button variant="contained" fullWidth>
            Sign up
          </Button>
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
      <Suspense
        fallback={
          <Skeleton variant="rectangular" height={1} width={1} sx={{ bgcolor: 'primary.main' }} />
        }
      >
        {/* <Image
          alt="Signup banner"
          src={signupBanner}
          sx={{
            width: 0.5,
            display: { xs: 'none', md: 'block' },
          }}
        /> */}
      </Suspense>
    </Stack>
  );
};

export default SignUp;
