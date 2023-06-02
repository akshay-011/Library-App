import React from 'react'
import img from "../assets/book2.jpeg"
import {  Box, Divider, Grid, Typography } from '@mui/material'

const Profile = ({ user }) => {
  return (
    <main className='profile-page' style={{
      width: '100vw',
      height:'100vh',
      backgroundImage:`url(${img})`,
      display:'flex',
      alignItems:'center',
      backgroundColor:'rgba(0,0,0,0.5)',
      justifyContent:'end'
    }} 
    >
        <Box sx={{
          width:'40vw',
          height:'70vh',
          marginTop:'8vh',
          backgroundColor:'rgba(255, 255, 255, 0.6)',
          marginRight:'10vw',
          display:'flex',
          justifyContent:'center',

        }} >
          <div style={{
            display:'flex',
            flexDirection:'column',
            width:'100%',
            alignItems:'center'
          }} >
                <Typography 
                  style={{
                    fontSize:'2.5vw',
                    fontFamily: "'Lora', serif",
                    marginBottom:'3vh'
                }}
                >
                I Am  <span style={{ fontStyle:'italic' }} >{user.username}</span>
                </Typography>
                <Divider  />
                <section>
                    <Typography style={{ fontFamily: "'Lora', serif", fontSize:'21px', margin:10 }} >
                      Email :<span style={{ fontStyle:'italic' }} > { user.email }</span>
                    </Typography>
                    <Divider />
                    <Typography style={{ fontFamily: "'Lora', serif", fontSize:'21px', margin:10 }} >
                      Age : <span style={{ fontStyle:'italic' }} >  { user.age } </span>
                    </Typography>
                    <Divider />
                    <Typography style={{ fontFamily: "'Lora', serif", fontSize:'21px', margin:10 }} >
                      Phone : <span style={{ fontStyle:'italic' }} >  { user.contactInfo } </span>
                    </Typography>
                    <Divider />
                    <Typography style={{ fontFamily: "'Lora', serif", fontSize:'21px', margin:10 }} >
                      Place : <span style={{ fontStyle:'italic' }} >  { user.place }</span>
                    </Typography>
                    <Divider />
                    <Typography style={{ fontFamily: "'Lora', serif", fontSize:'21px', margin:10 }} >
                      Rented : <span style={{ fontStyle:'italic' }} >  { user.rentedBook.rented ? "Yes" : "No" }</span>
                    </Typography>
                    <Divider />
                </section>
          </div>
          
        </Box>
    </main>
  )
}

export default Profile