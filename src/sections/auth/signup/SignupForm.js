import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Stack, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { ToastContainer, toast } from 'react-toastify';
// components
import Iconify from '../../../components/iconify';
import Spinner from '../../../components/Spinner';
import { signup } from '../../../api/auth';
// ----------------------------------------------------------------------

export default function SignupForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)

    
  const handleClick = async () => {
    setLoading(true)
    const res = await signup({ username, email, password, confirmPassword })
    if (res.success) {
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
        <div>
          <Stack spacing={3}>
            <TextField name="email" label="Email address" value={email} onChange={(e) => setEmail(e.target.value.trim())} />
            <TextField name="username" label="Username" value={username} onChange={(e) => setUsername(e.target.value.trim())}/>
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
            <TextField
              name="confirmPassword"
              label="Confirm password"
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value.trim())}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                      <Iconify icon={showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />     
          </Stack>

          <LoadingButton fullWidth size="large" variant="contained" onClick={handleClick} sx={{ my: 2 }}>
            Signup
          </LoadingButton>
        </div>
      )}
    </>
  );
}
