import React, { useEffect, useState } from 'react'
import {  IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import bg from "../assets/adminbg.jpg"

import DeleteIcon from '@mui/icons-material/Delete';

const AdminBooks = () => {
    const nav = useNavigate();
    const [books, setBooks] = useState([]);
    const [d, setD] = useState(true)
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
          console.log('err = ', err);
            nav("/login")
        }) 
    }, [d])

  return (
    <div style={{
      display:'flex',
      flex:'100vw'
    }} >
    <div style={{
        background:`url(${bg})`,
        width:'100%',
        height:'100%',
        backgroundRepeat:'no-repeat',
        backgroundSize:'cover',
        position:'fixed',
        zIndex:-1,        
      }} >
        </div>
        <section style={{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        border:'2px solid lightblue',
        marginBottom:'5%',
        backgroundColor:'rgba(10,40,60,0.9)',
        borderRadius:10,
        marginTop:'5%',
        textAlign:'center',
        width:'90vw',
        marginLeft:'5vw',
      }} >
          <TableContainer >
            <Table>
              <TableHead sx={{ backgroundColor:'rgba(10,100,150,1)' }} >
                <TableRow>
                  <TableCell sx={{fontWeight:'bolder',  color:'white', fontSize:'20px'}} >
                    Book Title
                  </TableCell>
                  <TableCell sx={{ fontWeight:'bolder',  color:'white', fontSize:'20px' }} >
                    Author
                  </TableCell>
                  <TableCell sx={{ fontWeight:'bolder',  color:'white', fontSize:'20px' }} >
                    Description
                  </TableCell>
                  <TableCell sx={{ fontWeight:'bolder',  color:'white', fontSize:'20px' }} >
                    Publication Year
                  </TableCell>
                  <TableCell sx={{ fontWeight:'bolder',  color:'white', fontSize:'20px' }} >
                    Genre
                  </TableCell  >
                  <TableCell sx={{ fontWeight:'bolder',  color:'white', fontSize:'20px' }} >
                    ISBN No
                  </TableCell>
                  <TableCell sx={{ fontWeight:'bolder', color:'white', fontSize:'20px' }} >
                    Avialable
                  </TableCell>
                  <TableCell sx={{ fontWeight:'bolder', color:'white', fontSize:'20px' }} >
                    Options
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                  {
                    books.map((book, index) => {
                      return(
                        <TableRow key={index} className='row' >  
                          <TableCell sx={{ color:'white', fontSize:'15px', fontWeight:'bold' }} >
                            { book.title }
                          </TableCell>
                          <TableCell sx={{ color:'white', fontSize:'15px', fontWeight:'bold' }} >
                            { book.author }
                          </TableCell  >
                          <TableCell sx={{ color:'white', fontSize:'15px', fontWeight:'bold' }} >
                            { book.description }
                          </TableCell>
                          <TableCell sx={{ color:'white', fontSize:'15px', fontWeight:'bold' }} >
                            { book.publicationYear }
                          </TableCell>
                          <TableCell sx={{ color:'white', fontSize:'15px', fontWeight:'bold' }} >
                            { book.genre }
                          </TableCell>
                          <TableCell sx={{ color:'white', fontSize:'15px', fontWeight:'bold' }} >
                            { book.isbnNo }
                          </TableCell>
                          <TableCell sx={{ color:'white', fontSize:'15px', fontWeight:'bold' }} >
                            { book.avialable ? 'Yes' : 'No' }
                          </TableCell>
                          <TableCell sx={{ color:'white', fontSize:'15px', fontWeight:'bold' }} >
                            <IconButton size='small' sx={{
                              fontSize:'15px',
                              fontWeight:'bold',
                              color:'white',
                              textTransform:'none'
                            }} 
                              onClick={() => {
                                axios.post("http://localhost:9876/delete_book", {id:book._id})
                                .then((res) => {
                                  setD(!d);
                                })
                                .catch((err) => {
                                  console.log(err);
                                })
                              }}
                            >
                             <DeleteIcon color="error" /> 
                            </IconButton>
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
  )
}

export default AdminBooks