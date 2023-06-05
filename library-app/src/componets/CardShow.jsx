import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'

const CardShow = ({ img, value, label }) => {
  return (
    <Card sx={{
        width:'20rem',
        height:'20rem',
        backgroundColor:'rgba(10,40,60,0.9)',
        marginLeft:'5em'

    }} >
        <CardActionArea>
            <CardMedia sx={{
                backgroundColor:'rgba(10,100,150,1)'
            }} component={'img'} height={220} image={img} />
                <CardContent sx={{
                    textAlign:'center'
                }} >
                    <Typography gutterBottom component="div" sx={{
                        fontSize:'2rem',
                        color:'white',
                        fontWeight:'bolder'
                    }}>
                        {label}
                    </Typography>
                    <Typography gutterBottom component="div" sx={{
                        fontSize:'1.7rem',
                        color:'green',
                        fontWeight:'bolder'
                    }} >
                        {value}
                    </Typography>
                </CardContent>
        </CardActionArea>
    </Card>
  )
}

export default CardShow