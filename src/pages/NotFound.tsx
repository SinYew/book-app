import React from 'react'
import { Link } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


const NotFound = () => {

  return (
    <Box sx={{ bgcolor: '#cfe8fc', height: '100vh', display: "flex", justifyContent: "center", alignItems: "center", flexDirection: 'column' }}>
      <Typography sx={{ mb:6 }} component="h1" variant="h3" color="common.grey"
      >
        404 - Page Not Found
      </Typography>
      <Button variant="contained" component={Link} to="/">
        Home Page
      </Button>
    </Box>
  )
}

export default NotFound
