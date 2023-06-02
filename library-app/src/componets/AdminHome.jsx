import React, { useEffect, useState } from 'react'
import axios from "axios"
import { TextField,Box, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Divider, Typography, InputLabel, Button, Backdrop } from '@mui/material';
import BlockIcon from '@mui/icons-material/Block';
import Alerts from './Alerts';
import DeleteIcon from '@mui/icons-material/Delete';


const AdminHome = ({ nav, setAdmins }) => {
  const [admin, setAdmin] = useState({});
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [alert, setAlert] = useState(false);

  // gettin user data
  useEffect(() => {
    axios.post("http://localhost:9876/user")
    .then((res) => {
      if(res.status === 222){
        setAdmin(res.data);
      }
      else{
        nav("/login");
      }
    })
    .catch((error) => {
      nav("/login");
    })
  }, [nav, alert])

    useEffect(() => {
        axios.get("http://localhost:9876/get_books")
        .then((res) => {
            if(res.status === 200){
                setBooks(res.data);
            }
            else{
                nav("/login")
            }
        })
        .catch((err) => {
            nav("/login")
        })
        // book data getting

        axios.get("http://localhost:9876/get_users")
        .then((res) => {
            if(res.status === 200){
                setUsers(res.data);
            }
            else{
                nav("/login")
            }
        })
        .catch((err) => {
            nav("/login")
        })
    },[nav, alert])

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
    <div  className='admin-page'
      style={{
        display:'flex',
        flexDirection:'column',
        width:'100%',
        marginTop:'4rem'
      }}
    >
        <div style={{
          display:'flex'
        }} >
        <Box sx={{
          display:'flex',
          marginLeft:2,
          width:'60%',
          border:'1px solid black',
          backgroundColor:'snow',
          borderRadius:'1vh'
        }} >
        <TableContainer>
          <Typography variant='h6' sx={{ marginLeft:'35%', fontWeight:'bold' }} >User Details</Typography>
            <Table sx={{ color:'snow' }} >
                <TableHead >
                    <TableRow>
                        <TableCell sx={{ fontWeight:'bold' }} >
                            Full Name
                        </TableCell>

                        <TableCell sx={{ fontWeight:'bold' }} >
                            username
                        </TableCell>
                        <TableCell sx={{ fontWeight:'bold' }} >
                            Age
                        </TableCell>
                        <TableCell sx={{ fontWeight:'bold' }} >
                            Email
                        </TableCell>
                        <TableCell sx={{ fontWeight:'bold' }} >
                            Rented Book
                        </TableCell>
                        <TableCell sx={{ fontWeight:'bold' }} >
                            Options
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody sx={{
                    backgroundColor:'white',
                }} >
                    {
                        users.map((user, index) => {
                            return(
                                <TableRow key={index} >
                                    <TableCell>
                                        { user.name }
                                    </TableCell>
                                    <TableCell>
                                        { user.username }
                                    </TableCell>
                                    <TableCell>
                                        { user.age }
                                    </TableCell>
                                    <TableCell>
                                        { user.email }
                                    </TableCell>
                                    <TableCell>
                                        { user.rentedBook.rented ? user.rentedBook.bookId : "none" }
                                    </TableCell>
                                    <TableCell>
                                        <IconButton onClick={
                                          () => {
                                            axios.post("http://localhost:9876/block_user", { id:user._id })
                                            .then((res) => {
                                              console.log("Blocked");
                                              setAlertContent({
                                                sev:'success',
                                                text:'User Blocked',
                                                onclose:() => setAlert(false)
                                              })
                                              setAlert(true);
                                            })
                                            .catch((err) => {
                                              console.log("Not Blocked")
                                            })
                                          }
                                        } >
                                            <BlockIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
        </Box>
        
        <Box sx={{
          display:'flex',
          flexDirection:'column',
          marginLeft:'1%',
          border:'1px solid black',
          padding:2,
          backgroundColor:'snow',
          borderRadius:'1vh'
        }} >
          <Typography variant='h5' sx={{ textAlign:'center' }} >Add Book</Typography>
          <div>

          <TextField   label="Book Name" name="title" value={bookData.title} onChange={inputHandler} 
            sx={{
              marginRight:2.5,
              marginBottom:1.5
            }}
          />

          <TextField label="Author" name="author" value={bookData.author} onChange={inputHandler}  />
          </div>
          <div >

          <TextField multiline rows={1.5} fullWidth label="Description" name="description" value={bookData.description} onChange={inputHandler} sx={{
              marginRight:2.5,
              marginBottom:1.5
            }} />
          <InputLabel>Year of Publication</InputLabel>
          <TextField  name="publicationYear" value={bookData.publicationYear} onChange={inputHandler} type='date' sx={{ marginBottom:1.5 }} />
          </div>
          <div >
          <TextField label={`Genres seperated by comas `}  name="genre" value={bookData.genre} onChange={inputHandler} sx={{
              marginRight:2.5,
              marginBottom:1.5
            }} />
          
          <TextField label="ISBN Number"  name="isbnNo" value={bookData.isbnNo} onChange={inputHandler} />

          <Typography sx={{ textAlign:'center' }} >
          <Button onClick={bookAdd} >Add Book</Button>
          </Typography>

            <Backdrop open={alert} >
              <Alerts { ...alertContent } />
            </Backdrop>

          </div>
          
        </Box>
    </div>
    <br /><br />
    <Divider />

    <div >
      <section style={{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        maxWidth:'80vw',
        border:'1px solid black',
        marginLeft:'1%',
        marginBottom:'5%',
        backgroundColor:'snow',
        borderRadius:10,
      }} >
          <TableContainer  >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight:'bolder', fontStyle:'italic' }} >
                    Book Title
                  </TableCell>
                  <TableCell sx={{ fontWeight:'bolder', fontStyle:'italic' }} >
                    Author
                  </TableCell>
                  <TableCell sx={{ fontWeight:'bolder', fontStyle:'italic' }} >
                    Description
                  </TableCell>
                  <TableCell sx={{ fontWeight:'bolder', fontStyle:'italic' }} >
                    Publication Year
                  </TableCell>
                  <TableCell sx={{ fontWeight:'bolder', fontStyle:'italic' }} >
                    Genre
                  </TableCell  >
                  <TableCell sx={{ fontWeight:'bolder', fontStyle:'italic' }} >
                    ISBN No
                  </TableCell>
                  <TableCell sx={{ fontWeight:'bolder', fontStyle:'italic' }} >
                    Avialable
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                  {
                    books.map((book, index) => {
                      return(
                        <TableRow>
                          <TableCell>
                            { book.title }
                          </TableCell>
                          <TableCell>
                            { book.author }
                          </TableCell>
                          <TableCell>
                            { book.description }
                          </TableCell>
                          <TableCell>
                            { book.publicationYear }
                          </TableCell>
                          <TableCell>
                            { book.genre }
                          </TableCell>
                          <TableCell>
                            { book.isbnNo }
                          </TableCell>
                          <TableCell>
                            { book.avialable ? 'Yes' : 'No' }
                          </TableCell>
                        </TableRow>
                      )
                    })
                  }
              </TableBody>
            </Table>
          </TableContainer>
        </section>
    </div>
    </div>
  )
}

export default AdminHome