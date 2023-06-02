import React from 'react'
import img from "../assets/wooden2.jpg"
import { Box, Typography } from '@mui/material'
import { Link } from "react-router-dom"
const LandingPage = () => {
  return (
    <div style={{
        width:'100vw',
        height:'100vh',
        padding:0,
        margin:0,
    }} 
    className='image-container'
    >
        <div style={{ 
        width:'100%', 
        height:'100%',
        background:`url(${img})`,
        backgroundRepeat:'no-repeat',
        backgroundPosition:'center',
        backgroundSize:'cover'
         }} >
            <Box sx={{
            backgroundColor:'rgba(0,0,0,0.5)',
            width:'100%',
            height:'100%',
            display:'flex',
            alignItems:'center',
            }} >
              <section style={{
                display:'flex',
                flexDirection:"column",
                paddingLeft:'2%',
                width:'100%',
                height:'100%',
                justifyContent:'center',
                alignItems:'flex-end'
                
              }} >
                <Typography
                className='img-head'
                variant='h2'
                color={"Background"}

                  style={{
                    fontWeight:'bold',
                    marginRight:'5%'
                  }}
                >
                  Welcome To <span className='img-main-head' >ShelfMaster</span>
                </Typography>
                <div
                  style={{
                    margin:15,
                  }}
                >

                <Typography 
                  className='text-img'
                  color={"Background"}
                  style={{
                    animationName:'slideout',
                    animationDelay:'2.1s',
                    animationDuration:'2s',
                    animationFillMode:'both'
                  }}
                >This site is Library Management Unit </Typography>

                <Typography 
                  color={"Background"}
                  className='text-img'
                  style={{
                    animationName:'slideout',
                    animationDelay:'2.3s',
                    animationDuration:'2s',
                    animationFillMode:'both'
                  }}
                >This site is build using <b> REACT </b> & <b> Material UI </b></Typography>

                <Typography 
                  color={"Background"}
                  className='text-img'
                  style={{
                    animationName:'slideout',
                    animationDelay:'2.5s',
                    animationDuration:'2s',
                    animationFillMode:'both'
                  }}
                >This project build by <b>Akshay Kumar, 
                  Anjal saju,
                  Aswin sabu,
                  Edwin,
                  Chandik
                  </b>
                  </Typography>
                  </div>
                  </section>
                  <br />
            </Box>
         </div>
    </div>
  )
}

export default LandingPage