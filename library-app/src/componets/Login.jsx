import { Box, Button, InputAdornment, TextField, Typography,IconButton, Backdrop } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from "axios"
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Alerts from "./Alerts";
import LinearProgress from '@mui/material/LinearProgress';
axios.defaults.withCredentials = true;

const Login = (props) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertContent, setAlertContent] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [submited, setSubmited] = useState(false);
  const [details, setDetails] = useState({
    username:'',
    password:''
  });

  const inputHandler = (e) => {
    setDetails((details) => ({...details, [e.target.name]:e.target.value}))
  }

  const login = () => {
    setSubmited(true);
    axios.post("http://localhost:9876/login", details)
    .then((res) => {
      if(res.status === 222){
        props.setAdmin(true)
        return props.nav("/admin");

      }
      if(res.status === 200){
        setSubmited(false);
        props.nav("/");
      }
      else{
        props.nav("/signout");
      }
    })
    .catch((error) => {
      try{
        if(error.response.status === 401 || error ){
          setAlertContent({
            sev:"error",
            text:"inavlid password",
            onclose:() => {
              setShowAlert(false);
            }
          })
          setShowAlert(true);
          setSubmited(false);
        }
    }
    catch(err){
        console.log(" catch error = ", err)
        setAlertContent({
          sev:"error",
          text:"Username not found! Or You Have been Blocked by the user ",
          onclose:() => {
            setShowAlert(false);;
          }
        })
        setSubmited(false);
        setShowAlert(true);
      }
    })
  }

  return (
    <div className='login-page' style={{ 
      display:'flex',
      flex:"100%", 
      justifyContent:'center',
      height:'100vh',    
    }} >
      <Box sx={{
        display:'flex',
      flex:1, 
      justifyContent:'center',
      height:'100vh',
      }} >
        <Box sx={{ 
          display:'flex',
          alignItems:'center',
          flexDirection:'column',
          justifyContent:'center',
          marginTop:'10%', 
          padding:5, 
          borderRadius:3,
          boxShadow:' rgba(0,0,0,0.7) 15px 10px 10px 5px', 
          backgroundColor:'#e8f1fa', 
          height:'fit-content',
          marginRight:'1rem',
          border:'1px solid white',
          backdropFilter:'blur(1px)',
          opacity:0.9
      
      }}  >
          
        <Typography variant='h5' style={{ margin:'5vh', fontFamily:'Romatika', fontSize:'30px' }} >ShelfMaster</Typography>
          <section style={{ display:'flex', alignItems:'center', flexDirection:"column", width:"80%" }} >
            < TextField label="username" name="username" onChange={inputHandler} value={details.username} style={{ margin:'2vh', }} size='small'
              InputProps={{
                    style:{ 
                      color:'black',
                    }
                  }}
            />
            < TextField label="Password" name="password" onChange={inputHandler} value={details.password} style={{ margin:'2vh', }} size='small'
              InputProps={{
                endAdornment:(
                  <InputAdornment position='end' >
                    <IconButton onClick={() => setShowPassword(!showPassword)} >
                          { showPassword ? <VisibilityIcon /> : <VisibilityOffIcon /> }
                      </IconButton>
                  </InputAdornment>
                ),
                style:{ 
                  color:'black'
                }
              }}
              type={showPassword ? 'text' : 'password'}
                  sx={{
                    '& .MuiInputBase-root.Mui-focused': {
                    }
                  }}
            />
            <Button style={{ margin:10 }} variant='contained' onClick={login} >Login</Button>
          </section>
        <Typography variant='overline' style={{ margin:'5vh' }} >
          Dont't have a account ? <Link to="/signup" style={{ textDecoration:"none", color:'blue' }} > Sign Up</Link>
        </Typography>
        </Box>

        <Backdrop open={showAlert} >
          <Alerts {...alertContent} />
        </Backdrop  >
        <Backdrop open={submited} > 
              <Box sx={{ width: '80%' }}>
                <LinearProgress />
              </Box>
        </Backdrop>
      </Box>
    </div>
  )
}

export default Login