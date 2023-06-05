import React from 'react'
import { AppBar, Avatar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { Link } from 'react-router-dom';
import logo from "../assets/book.png"
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PeopleIcon from '@mui/icons-material/People';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';

import "./component.css";



const NavBar = (props) => {
  return (
    <Box sx={{ display:'flex', margin:0, position:'sticky',flex:.2, zIndex:1 }} >
        <AppBar sx={{ backgroundColor:'rgb(41, 41, 41)', margin:0 }} >
          {
            props.admin === true ? 
            <Toolbar sx={{ textAlign:'center', display:'flex' }} >
              <div style={{
                width:'60%',
                display:'flex',
                justifyContent:'center'
              }} >
                <Link to={'/admin'} style={{ marginRight:'2vw', textDecoration:'none', color:'white' }}  >
                  <Typography variant='h6' sx={{ fontWeight:'bolder' }} >Admin</Typography>
                </Link>
              </div>
              <div style={{
                display:'flex',
                flexDirection:'row',
                flexWrap:'wrap',
              }} >
                <Link to={'/admin/users'} style={{ marginRight:'2vw' }}  > 
                    <Button  disableRipple sx={{ color:'white' }} >
                      <PeopleIcon />
                      <Typography style={{ textTransform:'none', fontWeight:'bold', fontSize:'1.1em',marginLeft:'0.5rem' }} >Users</Typography>
                    </Button>
                  </Link>
                  <Link to={'/admin/books'} style={{ marginRight:'2vw' }} > 
                    <Button   disableRipple sx={{ color:'white' }} >
                      <LibraryBooksIcon />
                      <Typography style={{  textTransform:'none', fontWeight:'bold', fontSize:'1.1em',marginLeft:'0.5rem' }} >Books</Typography>
                    </Button>
                  </Link>
                  <Link to={'/admin/addBook'} style={{ marginRight:'2vw' }} > 
                    <Button disableRipple sx={{ color:'white' }} >
                      <BookmarkAddIcon />
                      <Typography style={{ textTransform:'none', fontWeight:'bold', fontSize:'1.1em',marginLeft:'0.5rem' }} >Add Book</Typography>
                    </Button>
                  </Link>
                <Link to={'/signout'} style={{ marginRight:'2vw' }} > 
                    <Button  disableRipple sx={{ color:'white' }} >
                      <LogoutIcon />
                      <Typography style={{ textTransform:'none', fontWeight:'bold', fontSize:'1.1em',marginLeft:'0.5rem' }} >Log out</Typography>
                    </Button>
                  </Link>
              </div>
            </Toolbar>
            :
            <Toolbar sx={{ alignItems:'center', margin:0 }} >
              <Container sx={{ display:'flex', justifyContent:'start', width:'fit-content', margin:0 }} >
                <Typography component={'div'} style={{ display:'flex', alignItems:'center'  }} >
                  <Avatar src={logo} />
                  <span style={{ marginLeft:'0.5vw', fontSize:'1.2em', fontWeight:'bold', marginTop:'5%' }} >ShelfMaster</span>
                </Typography>
              </Container>
                <Box sx={{ display:'flex', justifyContent:'start',flex:1  }} >
                  <Link to={'/'} > 
                    <Button disableRipple sx={{ color:'white' }} >
                      <HomeRoundedIcon />
                      <Typography style={{ marginLeft:'0.5vw', marginRight:'2vw', textTransform:'none', fontWeight:'bold', fontSize:'1.1em' }} >Home</Typography>
                    </Button>
                  </Link>
                  <Link to={'/collections'} > 
                    <Button   disableRipple sx={{ color:'white' }} >
                      <TravelExploreIcon />
                      <Typography style={{ marginLeft:'0.5vw', marginRight:'2vw', textTransform:'none', fontWeight:'bold', fontSize:'1.1em'}} >Collections</Typography>
                    </Button>
                  </Link>
                </Box>
                <Box    sx={{ justifyContent:'end', display:'flex' }} >
                  {
                    props.user._id !== undefined ?
                    <Link to={'/profile'} > 
                    <Button disableRipple sx={{ color:'white' }} >
                      <AccountCircleIcon />
                      <Typography style={{ marginLeft:'0.5vw', marginRight:'2vw', textTransform:'none', fontWeight:'bold', fontSize:'1.1em'}} > { props.user.username } </Typography>
                    </Button>
                  </Link>
                  :
                    <Link to={'/login'} > 
                    <Button disableRipple sx={{ color:'white' }} >
                      <LoginIcon />
                      <Typography style={{ marginLeft:'0.5vw', marginRight:'2vw', textTransform:'none', fontWeight:'bold', fontSize:'1.1em'}} >Login/Sign Up</Typography>
                    </Button>
                  </Link>
                  
                  }
                  {
                    props.user._id !== undefined ? 
                    <Link to={'/signout'} > 
                    <Button   disableRipple sx={{ color:'white' }} >
                      <LogoutIcon />
                      <Typography style={{ marginLeft:'0.5vw', marginRight:'2vw', textTransform:'none', fontWeight:'bold', fontSize:'1.1em'}} >Log out</Typography>
                    </Button>
                  </Link>
                  :
                  null
                }
                </Box>
            </Toolbar>
          }
        </AppBar>
    </Box>
  )
}

export default NavBar