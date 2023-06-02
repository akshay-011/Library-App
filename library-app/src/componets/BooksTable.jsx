import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Box, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import BlockIcon from '@mui/icons-material/Block';

const BooksTable = () => {
    const [books, setBooks] = useState([]);
    useEffect(() => {
        axios.post("http://localhost:9876/get_books")
        .then((res) => {
            setBooks(res.data);
        })
    },[])
  return (
    <div style={{
        display:'flex',
        flex:'100%',
        height:'100vh',
        alignItems:'center',
        backgroundColor:'#e9ebf0',
        width:'100vw'
    }} >
        <Box sx={{
            display:'flex',
            marginLeft:2
        }} >
        <TableContainer  >
            <Table stickyHeader >
                <TableHead sx={{
                    backgroundColor:'gray',
                }} >
                    <TableRow>
                        <TableCell>
                            Full Name
                        </TableCell>

                        <TableCell>
                            username
                        </TableCell>
                        <TableCell>
                            Age
                        </TableCell>
                        <TableCell>
                            Email
                        </TableCell>
                        <TableCell>
                            Rented Book
                        </TableCell>
                        <TableCell>
                            Options
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody sx={{
                    backgroundColor:'white',
                }} >
                    {
                        books.map((book, index) => {
                            return(
                                <TableRow key={index} >
                                    <TableCell>
                                        { book.name }
                                    </TableCell>
                                    <TableCell>
                                        { book.username }
                                    </TableCell>
                                    <TableCell>
                                        { book.age }
                                    </TableCell>
                                    <TableCell>
                                        { book.email }
                                    </TableCell>
                                    <TableCell>
                                        { book.rentedBook.rented ? book.rentedBook.userId : "none" }
                                    </TableCell>
                                    <TableCell>
                                        <IconButton>
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
    </div>
  )
}

export default BooksTable