import React, { useEffect, useState } from 'react'
import bg from "../assets/adminbg.jpg"
import CardShow from './CardShow'
import user from "../assets/users.png"
import book from "../assets/books.png"
import axios from 'axios'
import { Typography } from '@mui/material'

const AdminHome = () => {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:9876/get_books")
        .then((res) => {
          if(res.status === 200){
                setBooks(res.data);
            }
        })
        .catch((err) => {
          console.log('err = ', err);
        }) 
        axios.get("http://localhost:9876/get_users")
        .then((res) => {
          if(res.status === 200){
                setUsers(res.data);
            }
        })
        .catch((err) => {
          console.log('err = ', err);
        })
  }, [])
  return (
    <div style={{
      background:`url(${bg})`,
      width:'100vw',
      height:'100vh',
      backgroundRepeat:'no-repeat',
      backgroundSize:'cover',
      
    }} >
        <div style={{
          display:'flex',
          marginTop:'5%',
          justifyContent:'center',
        }} >
        <CardShow img={user} label="Users" value={users.length} />
        <CardShow img={book} label="Books" value={books.length} />
      </div>
        <Typography variant='h4' style={{
          display:'flex',
          alignItems:'center',
          justifyContent:'center',
          margin:'5rem',
          color:'white',
          fontWeight:'bolder',
          fontSize:'5vw'
        }} > Welcome  <b style={{ marginLeft:'1rem', fontStyle:'italic' }} > ADMIN</b> </Typography>
    </div>
  )
}

export default AdminHome