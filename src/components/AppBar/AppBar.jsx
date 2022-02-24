import React from 'react';
import { AppBar, Toolbar, Typography, Avatar, Tooltip, Box, IconButton, Button } from '@mui/material';
import { supabase } from "../../config/supabaseClient";
import { Link } from 'react-router-dom';


const Navbar = () => {    

    return (
        
        <div>
            
            <Box sx={{ flexGrow: 1 }}>
                {/* <AppBar position="static"  color='primary'> */}
                <AppBar position="fixed" color='primary'>

                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            {/* <MenuIcon /> */}

                        </IconButton>
                        <Typography variant='h6' component="div" sx={{ flexGrow: 1 }}>
                        <Link to="/">
                        Home
                        </Link>
                        </Typography>

                        <Button color="inherit" >
                            Git Hub
                            {/* <a style={{ textDecoration: "none", color: "white" }} href=''> Git Hub </a> */}
                        </Button>

                        <Button color="inherit" onClick={() => supabase.auth.signOut()}>                        
                        Salir
                    </Button>
                                              
                            <Button color="inherit" >
                                <Link to="/Perfiles">                                
                                Perfil
                                </Link>
                                </Button>
                        

                        <Tooltip title="Open settings">
                            <IconButton sx={{ p: 0 }}>
                                <Avatar alt="G" src="/static/images/avatar/2.jpg" />

                                {/* <ImgPerfiles            
                url={imgperfiles_url}
                size={150}
                onUpload={(url) => {
                    setImgperfiles_url(url);
                    updatePerfiles({  imgperfiles_url: url });
                }}
            /> */}
                            </IconButton>
                        </Tooltip>

                    </Toolbar>

                </AppBar>
            </Box>
           


        </div>
    );
}

export default Navbar