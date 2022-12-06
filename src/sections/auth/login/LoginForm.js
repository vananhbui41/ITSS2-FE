import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Stack, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { ToastContainer, toast } from 'react-toastify';
// components
import Iconify from '../../../components/iconify';
import Spinner from '../../../components/Spinner';
import { signIn } from '../../../api/auth';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true)
    const res = await signIn({ email, password })
    if (res.success) {
      toast.success('Login successfully !')
      navigate('/', { replace: true });
    } else {
      toast.error(res.message)
      setLoading(false)
    }
  };

  return (
    <>
      <ToastContainer />
      {loading ? <Spinner /> : (
        <>
          <Stack spacing={3}>
            <TextField name="email" label="Email address" name="email" label="Email address" value={email} onChange={(e) => setEmail(e.target.value.trim())} />
            <TextField
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value.trim())}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
          <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick} sx={{ my: 2 }}>
            Login
          </LoadingButton>
        </>
      )}
    </>
  );
}
