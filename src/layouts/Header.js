import { AppBar, Toolbar, IconButton,Typography, Box,Button,Link  } from '@mui/material';
import Logo from '../components/logo';

export default function Header() {
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
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                    <Link href="/login" underline="always">
                        <Button sx={{ color: '#fff' }}>
                            Login
                        </Button>
                    </Link>
                <Button sx={{ color: '#fff' }}>
                    Sign up
                </Button>
          </Box>
        </Toolbar>
      </AppBar>
    )
}