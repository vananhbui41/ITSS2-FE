import { Link, Container, Typography, Divider, Stack, Button } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { styled } from '@mui/material/styles';
import Header from '../../layouts/Header';
import HomepageComponent from '../../components/Homepage';

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 980,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

export default function HomePage() {
    return (
        <>
            <Helmet>
                <title> Homepage | Lavie </title>
            </Helmet>
            <Header />
            <Container >
                <StyledContent>
                    <HomepageComponent />
                </StyledContent>
            </Container>
        </>
    )
} 
