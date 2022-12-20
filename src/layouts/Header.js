
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, IconButton,Typography, Box,Button,Link ,Avatar } from '@mui/material';
import Logo from '../components/logo';

export default function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'))
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/', { replace: true });
  }
    return (
         <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <Logo
                sx={{
                    position: 'fixed',
                    top: { xs: 16, sm: 24, md: 40 },
                    left: { xs: 16, sm: 24, md: 40 },
                }}
            />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Lavie
          </Typography>
          {user ? (
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Button sx={{ color: '#fff' }}>
                <Avatar>{user.name.charAt(0)}</Avatar>
                </Button>
                <Button sx={{ color: '#fff' }} onClick={logout}>
                    Đăng Xuất
                </Button>
              </Box>
          ): (
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                  <Link href="/login" underline="always">
                      <Button sx={{ color: '#fff' }}>
                          Đăng Nhập
                      </Button>
                </Link>
                <Link href="/signUp" underline="always">
                    <Button sx={{ color: '#fff' }}>
                        Đăng Kí
                    </Button>
                </Link>
              </Box>
            )}
        </Toolbar>
      </AppBar>
    )
}