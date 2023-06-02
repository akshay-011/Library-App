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

axios.defaults.withCredentials = true;

function Signout(props) {
  axios.post("http://localhost:9876/logout")
  .then((res) => {
    props.nav("/login");
    props.destroy();
  })
  .catch((err) => {
    console.log("signout err ", err);
    props.nav("/login")
  })
  return ( <div>Succes</div> )
}

function App() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const [admin, setAdmin] = useState(false);


  useEffect(() => {
      if(location.pathname === "/signup" || location.pathname === "/login" || location.pathname === "/signout" || location.pathname === "/admin" ){
        return ;
      }
      console.log("path came ", location.pathname)
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
  },[navigate, admin])
  return (
    <Box className="App" sx={{ display:'flex', flexDirection:'row', flex:1}} >
      
      <NavBar user={user} admin={admin} setAdmin={setAdmin} />
      
      <Routes>
        <Route path='/signout' element={<Signout 
        destroy={() => {
          setUser({});
        }} nav={navigate} />} />

        <Route path='/signup' element={ <SignUp nav={navigate} /> } />
        <Route path='/login'  element={< Login admin={admin} setAdmin={setAdmin} nav={navigate} />} />
        <Route path='collections'  element={<Home user={user} nav={navigate} />} />
        <Route path='/' element={<HomePage user={user} nav={navigate} />} />
        <Route path='/profile' element={<Profile user={user} />} />
        <Route path="/admin" element={ <AdminHome setAdmins={setAdmin} nav={navigate} /> } />
      </Routes>
    </Box>
  );
}

export default App;
