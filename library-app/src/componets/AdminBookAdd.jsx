import React, { useState } from 'react'
import axios from "axios"
import { TextField,Box,  Typography, InputLabel, Button, Backdrop } from '@mui/material';
import Alerts from './Alerts';
import bg from "../assets/adminbg.jpg"


const AdminBookAdd = () => {

    const [alert, setAlert] = useState(false);
    const [bookData, setBookData] = useState({
        title:'',
        author:'',
        description:'',
        publicationYear:'',
        genre:'',
        isbnNo:'',
    }) 
    const inputHandler = (e) => {
    setBookData((data) => ({ ...data, [e.target.name]:e.target.value }))
  }

  const [alertContent, setAlertContent] = useState({});
  const bookAdd = () => {
    bookData.genre = bookData.genre.split(",");

    axios.post("http://localhost:9876/add_book", bookData)
    .then((res) => {
      if(res.status === 200){
        setAlertContent({
          onclose:() => setAlert(false),
          sev:'success',
          text:'Book added succesfully'
        })
        setAlert(true);
      }
      else{
        setAlertContent({
          onclose:() => setAlert(false),
          sev:'error',
          text:'Book not added '
        })
        setAlert(true);
      }
    })
  }
  return (
    <div style={{
        background:`url(${bg})`,
        width:'100vw',
        height:'100vh',
        backgroundRepeat:'no-repeat',
        backgroundSize:'cover',
        display:'flex',
        alignItems:'center',
        justifyContent:'center'

      }} >
        <Box sx={{
          marginTop:'5%',
          display:'flex',
          flexDirection:'column',
          marginLeft:'1%',
          border:'1px solid black',
          padding:1,
          borderRadius:'1vh',
          backgroundColor:'rgba(10,100,150,1)',
          width:'40vw'
        }} >
          <Typography variant='h5' sx={{ 
            textAlign:'center',
            color:'white',
            fontWeight:'bolder',
            margin:1
        
        }} >Add Book</Typography>
          <section style={{
            marginLeft:'10%'
          }} >
          <div >

          <TextField  className='input'  label="Book Name" name="title" value={bookData.title} onChange={inputHandler} 
            sx={{
              marginRight:2.5,
              marginBottom:1.5
            }}
            InputLabelProps={{ className: 'input_label' }}
            inputProps={{ className:'input-text' }}
          />

          <TextField className='input' InputLabelProps={{ className: 'input_label' }} inputProps={{ className:'input-text' }} label="Author" name="author" value={bookData.author} onChange={inputHandler}  />
          </div>
          <div >

          <InputLabel sx={{ 
            color:'white'
           }} >Year of Publication</InputLabel>
          <TextField className='input' InputLabelProps={{ className: 'input_label' }} inputProps={{ className:'input-text' }}  name="publicationYear" value={bookData.publicationYear} onChange={inputHandler} type='date' sx={{ marginBottom:1.5 }} />
          </div>
          <div >
          <TextField className='input' InputLabelProps={{ className: 'input_label' }} inputProps={{ className:'input-text' }} label={`Genres seperated by comas `}  name="genre" value={bookData.genre} onChange={inputHandler} sx={{
            marginRight:2.5,
            marginBottom:1.5
          }} />
          
          <TextField className='input' InputLabelProps={{ className: 'input_label' }} inputProps={{ className:'input-text' }} label="ISBN Number"  name="isbnNo" value={bookData.isbnNo} onChange={inputHandler} />

          <TextField className='input' InputLabelProps={{ className: 'input_label' }} inputProps={{ className:'input-text' }} multiline rows={2.5}  label="Description" name="description" value={bookData.description} onChange={inputHandler} sx={{
              marginBottom:1.5,
              width:'65%'
            }} />

          <Typography sx={{ textAlign:'center' }} >
          <Button className='btn' sx={{
            color:'black',
            textTransform:'none',
            fontSize:'20px',
            backgroundColor:'lightblue',
            boxSizing:'inherit',
            height:'20px'
          }} onClick={bookAdd} >Add</Button>
          </Typography>

            <Backdrop open={alert} >
              <Alerts { ...alertContent } />
            </Backdrop>

          </div>
          </section>
        </Box>
    </div>
  )
}

export default AdminBookAdd