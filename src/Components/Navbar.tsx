import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Logo from '../assets/icons/infinite128.png';

const Navbar = () => {
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box
                        component="img"
                        sx={{height: 25}}
                        alt="Youtube looper logo"
                        src={Logo}
                    />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            ml: 2,
                            display: {xs: 'flex', md: 'none'},
                            flexGrow: 1,
                            fontWeight: 500,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Youtube Looper
                    </Typography>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Navbar;