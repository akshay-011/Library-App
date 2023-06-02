import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Link } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Typography from '@mui/material/Typography';
import { Backdrop, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, InputAdornment, List, ListItem } from '@mui/material';
import { useState } from 'react';
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress';
import Alerts from "./Alerts";


const Terms = (props) => {
  return (
    <Dialog
      open={props.open}
       onClose={props.onclose}
    >
    <DialogTitle>Terms & Conditions</DialogTitle>
    <DialogContent>
        <DialogContentText dividers='true' >
            <List>
              <ListItem>Membership is open to individuals who meet the library's criteria and agree to abide by its policies.</ListItem>
              <ListItem>You must provide accurate and up-to-date personal information during the registration process.</ListItem>
              <ListItem> Members may borrow library materials in accordance with borrowing rules and limits</ListItem>
              <ListItem> Materials must be returned by the specified due date, and overdue fines may apply for late returns</ListItem>
              <ListItem>Lost or damaged materials must be reported promptly, and the member may be responsible for replacement costs</ListItem>
          </List>
        </DialogContentText>
    </DialogContent>
    <DialogActions>
          <Button onClick= {props.onclose} >Disagree</Button>
          <Button onClick={props.agree} autoFocus>
            Agree
          </Button>
      </DialogActions>
    </Dialog>

  )
}

export default function SignUp(props) {
  const [open, setOpen] = useState(false);
  const [terms, setTerms] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [submited, setSubmited] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertContent, setAlertContent] = useState({});

  const [userDetails, setUserDetails] = useState({
    name:'',
    username:'',
    age:'',
    place:'',
    email:'',
    password:'',
    education:'',
    contactInfo:''
  })
  
  const inputHandler = (e) => {
    const {name, value} = e.target;
    setUserDetails((userDetails) => ({...userDetails, [name]:value}))
    
  }
  const signup = () => {
    axios.post("http://localhost:9876/signup",userDetails)
    .then((res) => {
      setAlertContent({
          sev:"success",
          text:"Succesfully Signup Up \n Enter your details and login",
          onclose:() => {
            setShowAlert(false);
            props.nav("/login");
          }
        })
        setShowAlert(true);
        setSubmited(false);

    })
    .catch((err) => {
      if(err.response.status === 422 ){
        setAlertContent({
          sev:"error",
          text:"please fill all the fields",
          onclose:() => {
            setShowAlert(false);
          }
        })
        setShowAlert(true);
        setSubmited(false);
      }
      else if(err.response.status === 400 ){
        setAlertContent({
          sev:"warning",
          text:"Please all the fields",
          onclose:() => {
            setShowAlert(false);
          }
        })
        setShowAlert(true);
        setSubmited(false);
      }
      else if(err.response.status === 408 ){
        setAlertContent({
          sev:"warning",
          text:"Username already exists",
          onclose:() => {
            setShowAlert(false);
          }
        })
        setShowAlert(true);
        setSubmited(false);
      }
      else{
        setAlertContent({
          sev:"error",
          text:"The Server Does'nt responding.",
          onclose:() => {
            setShowAlert(false);
          }
        })
        setShowAlert(true);
        setSubmited(false);
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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent:'center',
            width:'25vw',
            boxShadow:' rgba(0,0,0,0.7) 15px 10px 10px 10px',
            padding:4,
            borderRadius: '1vw',
            height:'fit-content',
            marginTop:'19vh',
            backgroundColor:'#e8f1fa', 
            opacity:'0.9',
            border:'1px solid white'

          }}
        >
          <div style={{ textAlign:'center', width:'fit-content',  alignItems:'center', justifyContent:'center' }} >
          <Typography variant="h5" style={{ color:'#333333', fontFamily:'Romatika',fontSize:'30px'  }} >
            ShelfMaster
          </Typography>
          <Box component="form" sx={{ mt:1, opacity:'0.7' }}>
            <Grid container spacing={1.5}>
              <Grid item xs={5} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  label="Full Name"
                  onChange={inputHandler}
                  value={userDetails.name}
                  size="small"
                  InputProps={{
                    style:{ 
                      color:'black',
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="username"
                  name="username"
                  onChange={inputHandler}
                  value={userDetails.username}
                  size="small"
                  InputProps={{
                    style:{ 
                      color:'black',
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="place"
                  required
                  fullWidth
                  label="Place"
                  onChange={inputHandler}
                  value={userDetails.place}
                  size="small"
                  InputProps={{
                    style:{ 
                      color:'black',
                    }
                  }}
                  
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Age"
                  name="age"
                  type='number'
                  onChange={inputHandler}
                  value={userDetails.age}
                  size="small"
                  InputProps={{
                    style:{ 
                      color:'black',
                    }
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="education"
                  label="Education"
                  onChange={inputHandler}
                  value={userDetails.education}
                  size="small"
                  InputProps={{
                    style:{ 
                      color:'black',
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Contact"
                  name="contactInfo"
                  onChange={inputHandler}
                  value={userDetails.contactInfo}
                  size="small"
                  InputProps={{
                    style:{ 
                      color:'black',

                    }
                  }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  type='email'
                  name="email"
                  required
                  fullWidth
                  label="Email"
                  onChange={inputHandler}
                  value={userDetails.email}
                  size="small"
                  InputProps={{
                    style:{ 
                      color:'black',
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type= { showPassword ? "text" :'password' } 
                  onChange={inputHandler}
                  value={userDetails.password}
                  InputProps={
                    {
                      endAdornment:(
                        <InputAdornment position='end' >
                          <IconButton onClick={() => setShowPassword(!showPassword)} >
                            { showPassword ? <VisibilityIcon /> : <VisibilityOffIcon /> }
                          </IconButton>
                        </InputAdornment>
                      ),
                      style:{ 
                        color:'black',
                      }
                    }
                  }
                  size="small"
                />
                <Grid style={{ textAlign:"center" }} >
                <Button 
                variant="filled"
                sx={{ mt: 1, color:'blue' }}
                onClick={ () => { setOpen(true)}} 
                >
                   Terms & Condition 
                </Button>
                </Grid>
              </Grid>
            </Grid>
            <Button
              
              variant="contained"
              sx={{ mt: 1, mb: 2 }}
              disabled={terms}
              onClick={() => {
                setSubmited(true);
                signup();
              }
              }
            >
              { submited ? <CircularProgress sx={{ color:"white" }} size={23} /> : "SignUp"}
            </Button>
      
            <Grid container justifyContent="center">
              <Grid item>
                <Typography variant='overline' >
                Already have an account ?  <Link style={{ textDecoration:"none", color:"blue" }} to={"/login"} > Sign in</Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </div>
        <Backdrop>
          <Terms open={open} onclose={() => setOpen(false)} agree={() => {
        setTerms(false);
        setOpen(false)
        }
        } />
        </Backdrop>
        <Backdrop open={showAlert} >
          <Alerts {...alertContent} />
        </Backdrop>
        </Box>
      </div>
  );
}