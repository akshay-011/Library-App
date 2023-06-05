import {  Box } from '@mui/material';
import Login from './componets/Login';
import SignUp from "./componets/SignUp";
import {   Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import "./App.css"
import Home from './componets/Home';
import { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from './componets/NavBar';
import HomePage from './componets/HomePage';
import Profile from './componets/Profile';
import AdminHome from "./componets/AdminHome";
import AdminBookAdd from './componets/AdminBookAdd';
import AdminUsers from './componets/AdminUsers';
import AdminBooks from './componets/AdminBooks';

axios.defaults.withCredentials = true;

function Signout(props) {
  axios.post("http://localhost:9876/logout")
  .then((res) => {
    props.destroy();
    props.nav("/login");
  })
  .catch((err) => {
    console.log("signout err ", err);
    props.nav("/login")
  })
  return ( <div>Succes</div> )
}

function App() {
  document.title = "ShelfMaster" 
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const [admin, setAdmin] = useState(false);


  useEffect(() => {
      if(location.pathname === "/signup" || location.pathname === "/login" || location.pathname === "/signout" || location.pathname === "/admin" || location.pathname === "/admin/users" || location.pathname === "/admin/books" || location.pathname === "/admin/addBook" ){
        return ;
      }
      axios.post("http://localhost:9876/user")
        .then((res) => {
          if(res.status === 200){
            setUser(res.data);
          }
          else{
            navigate("/login")
          }
        })
        .catch((err) => {
          console.log("this err ", err);
          navigate("/login")
      })
  },[admin, navigate])
  return (
    <Box className="App" sx={{ display:'flex', flexDirection:'row', flex:5}} >
      
      <NavBar user={user} admin={admin} setAdmin={setAdmin} />
      
      <Routes>
        <Route path='/signout' element={<Signout 
        destroy={() => {
          setUser({});
          setAdmin(false)
        }} nav={navigate} />} />

        <Route path='/signup' element={ <SignUp nav={navigate} /> } />
        <Route path='/login'  element={< Login admin={admin} setAdmin={setAdmin} nav={navigate} />} />
        <Route path='collections'  element={<Home user={user} nav={navigate} />} />
        <Route path='/' element={<HomePage user={user} nav={navigate} />} />
        <Route path='/profile' element={<Profile user={user} />} />
        <Route path="/admin" element={ <AdminHome setAdmins={setAdmin} nav={navigate} /> } />
        <Route path='/admin/addBook' element={ <AdminBookAdd /> } />
        <Route path="/admin/users" element={ <AdminUsers /> } />
        <Route path='/admin/books' element={ <AdminBooks /> } />
      </Routes>
    </Box>
  );
}

export default App;
