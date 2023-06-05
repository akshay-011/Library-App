import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Box, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Backdrop } from '@mui/material';
import BlockIcon from '@mui/icons-material/Block';
import Alerts from './Alerts';
import { useNavigate } from 'react-router-dom';
import bg from "../assets/adminbg.jpg"
import DeleteIcon from '@mui/icons-material/Delete';

const AdminUsers = () => {
    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState({});
    const [users, setUsers] = useState([]);

    const nav = useNavigate();

    useEffect(() => {
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
    },[nav, alert]);

  return (
    <div style={{
        background:`url(${bg})`,
        width:'100vw',
        height:'100vh',
        backgroundRepeat:'no-repeat',
        backgroundSize:'cover',
        display:'flex',

      }} >
        <Box sx={{
            display:'flex',
            marginLeft: '10vw',
            width:'80vw',
            border:'1px solid lightblue',
            borderRadius:'15px',
            backgroundColor:'rgba(10,40,60,0.9)',
            height:'fit-content',
            marginTop:'5%',
        }} >
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow sx={{ backgroundColor:'rgba(10,100,150,1)' }} >
                        <TableCell sx={{fontWeight:'bolder',  color:'white', fontSize:'20px'}} >
                            Full Name
                        </TableCell>

                        <TableCell sx={{fontWeight:'bolder',  color:'white', fontSize:'20px'}} >
                            username
                        </TableCell>
                        <TableCell sx={{fontWeight:'bolder',  color:'white', fontSize:'20px'}} >
                            Age
                        </TableCell>
                        <TableCell sx={{fontWeight:'bolder',  color:'white', fontSize:'20px'}} >
                            Email
                        </TableCell>
                        <TableCell sx={{fontWeight:'bolder',  color:'white', fontSize:'20px'}} >
                            Rented Book
                        </TableCell>
                        <TableCell sx={{fontWeight:'bolder',  color:'white', fontSize:'20px'}} >
                            Options
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody >
                    {
                        users.map((user, index) => {
                            return(
                                <TableRow key={index} className='row' >
                                    <TableCell sx={{ color:'white', fontSize:'15px', fontWeight:'bold' }} >
                                        { user.name }
                                    </TableCell>
                                    <TableCell sx={{ color:'white', fontSize:'15px', fontWeight:'bold' }} >
                                        { user.username }
                                    </TableCell>
                                    <TableCell sx={{ color:'white', fontSize:'15px', fontWeight:'bold' }} >
                                        { user.age }
                                    </TableCell>
                                    <TableCell sx={{ color:'white', fontSize:'15px', fontWeight:'bold' }} >
                                        { user.email }
                                    </TableCell>
                                    <TableCell sx={{ color:'white', fontSize:'15px', fontWeight:'bold' }} >
                                        { user.rentedBook.rented ? user.rentedBook.bookId : "none" }
                                    </TableCell>
                                    <TableCell>
                                        <IconButton onClick={
                                          () => {
                                            axios.post("http://localhost:9876/block_user", { id: user._id })
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
                                            <BlockIcon color='warning' />
                                        </IconButton>
                                        <IconButton onClick={() => {
                                            axios.post("http://localhost:9876/delete_user", { id: user._id })
                                            .then((res) => {
                                                console.log("res = ", res)
                                                setAlertContent({
                                                    onclose:() => {
                                                        setAlert(false)
                                                    },
                                                    sev:'success',
                                                    text:'User Deleted'
                                                })
                                                setAlert(true);
                                            })
                                            .catch((err) => {
                                                console.log('err = ', err);
                                            })
                                        }} >
                                            <DeleteIcon color='error' />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
        <Backdrop open={alert} >
              <Alerts { ...alertContent } />
        </Backdrop>
        </Box>
    </div>
  )
}

export default AdminUsers