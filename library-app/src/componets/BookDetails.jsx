import React, { useState } from 'react'
import { Backdrop, Box, Button, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material"
import axios from "axios"
import Alerts from "./Alerts";

const BookDetails = (props) => {
    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState({})

  return (
    <Box component={"div"} >
        <Dialog 
            open={props.open}
            onClose={props.onclose}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            fullWidth={true}
            maxWidth="md"
        >
            <Box>
            <DialogTitle textAlign={'center'} sx={{ fontWeight:'bold',fontFamily:'Pumpkind' }} > {props.book.title} </DialogTitle>
            <DialogContent style={{ display:'flex', flexDirection:'row-reverse',flex:5 }} >
                <Box sx={{paddingTop:0, paddingBottom:2, flex: 1.5}} >
                    <CardMedia sx={{border:'.5px solid black', borderRadius:'10px'}} component='img' height={"100%"}  image={props.IMG}  />
                </Box>
               
                <Box sx={{ flex:3.5 }} >
                <DialogContentText sx={{fontFamily: "'Roboto Mono', monospace", marginTop:'5vh', color:'black', fontWeight:'600', fontSize:'20px'}} >
                    <Box className='sep-div' >
                        <Typography className='heads' sx={{ fontSize:'25px' }} >Description</Typography>
                        {props.book.description}
                    </Box>
                    <Box className='sep-div' >
                        <span className='heads'>Author : </span>{props.book.author}
                    </Box>
                    <Box className='sep-div' >
                        <span className='heads' >Publication Year : </span>{props.book.publicationYear}
                    </Box>
                    <Box className='sep-div' >
                        <span className='heads' >ISBN NO : </span>{props.book.isbnNo}
                    </Box>
                </DialogContentText>                
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onclose} >Cancel</Button>
                <Button disabled={ !props.book.avialable } onClick={ () => {
                     axios.post("http://localhost:9876/rent_book", { bookId:props.book._id, userId:props.user._id } )
                     .then((res) => {
                        console.log(res)
                        setAlertContent({
                            sev:'success',
                            text:'Succesfully Rented...',
                            onclose:() => setAlert(false)
                        })
                        setAlert(true)
                     }) 
                     .catch((err) => {
                        console.log(err);
                     })                  
                     props.onclose();
                    }
                } 
                    >Rent</Button>
            </DialogActions>
            </Box>
        </Dialog>
        <Backdrop open={alert} >
            <Alerts {...alertContent} />
        </Backdrop>
    </Box>
  )
}

export default BookDetails