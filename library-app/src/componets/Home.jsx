import { Backdrop, Box, Card, CardActions, CardHeader, CardMedia, CircularProgress, Grid, IconButton, Typography, } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { pink } from '@mui/material/colors';
import BookDetails from './BookDetails';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
axios.defaults.withCredentials = true;

const images = [
  "https://ychef.files.bbci.co.uk/976x549/p03gg1lc.jpg",

]
function randomNumber(array) {
  return Math.floor(Math.random() * array.length);

}

const Home = (props) => {
    const [bookData, setBookData] = useState([]);
    const [book, setBook] = useState({});
    const [bookOpen, setBookOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [likedBooks, setLikedBooks] = useState([]);
    const [liked, setLiked] = useState(0);

    useEffect(() => {

      axios.post("http://localhost:9876/user")
        .then((res) => {
          setLikedBooks(res.data.likedBooks)
        })
        .catch((err) => {
          console.log("get user " , err);
        })

      axios.get("http://localhost:9876/get_books")
      .then((res) => {
        if(res.status === 200){
          setBookData(res.data);
          setLoading(false);
        }
        else{
          console.log("get_books err ", res);
          props.nav("/login");
        }
      })
      .catch((err) => {
        console.log("get books = ", err)
        props.nav("/login")
      })
    }, [props.nav])  

    useEffect(() => {
      axios.put("http://localhost:9876/like_book", {id:props.user._id,likes:likedBooks})
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log("like book error ", err)
        })
    },[liked, props.nav])      

  return (
    <section>
    <main className='page' style={{ 
      width:'100%',
      height:'100%'
     }} ></main>

    <Box component={'div'} sx={{ 
      display:'flex',
      flex:4,
      justifyContent:'center',
      flexDirection:'column',
      alignItems:'center',
      marginTop:'4%',
      marginLeft:'2%',
      marginBottom:'5%'
       }} >
      <Typography variant='h2' sx={{ marginBottom:'3vh', fontWeight:'bolder', fontFamily:"'Slabo 27px', serif" }} >Book Collections</Typography>
      <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 2, sm: 10, md: 15 }}  >
      {
        bookData.map((book,index) => {
          let no = randomNumber(images);
          return (
            <Grid item xs={2} sm={2} md={5} key={index} >
            <Card  
            sx={{ width:'30vw',
            height:'40vh',
            display:'flex',
            flexDirection:'column',
            borderRadius:3 ,
            backgroundColor:"rgba(255,255,255,0.9)",
            position:'static',
            opacity:0.9,
              }}
             className='book-card' 
             >
                <Box sx={{
                  display:'flex',
                  height:'100%',
                  justifyContent:'center',
                  alignItems:'center',
                  marginTop:'5%',
                  flexDirection:'column'
                }} 
              onClick={() => {
              setBook(book);
              setBookOpen(true)
             }}
                >
                  <Typography  sx={{
                    fontFamily:"'Kaushan Script', cursive",
                    fontSize:'1.9rem',
                    fontWeight:'bolder',
                    fontStyle:'italic',
                  }} >
                    { book.title }
                  </Typography>
                  <span style={{ fontFamily:"'Lora', serif" }} >{ book.author }</span>
                </Box>
                <CardActions disableSpacing sx={{ justifyContent:'start', height:'50%', alignItems:'end', marginBottom:3 }} >
                  <IconButton onClick={() => {
                    setLikedBooks((likes) => [...likes, book._id]);
                    setLiked(liked+1);
                  }} >
                    { likedBooks.indexOf(book._id) !==-1 ? <FavoriteIcon fontSize='medium' sx={{ color:pink[500] }} /> : <FavoriteBorderIcon fontSize='medium' /> }
                  </IconButton>
                </CardActions>
            </Card>
            </Grid>
          )
        })
      }
      <Backdrop
       sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 7 }}
      open={bookOpen}
    >
        <BookDetails 
          open={bookOpen}
            book={book}
             onclose={
                () => setBookOpen(false)
              } 
            IMG={images[0]} user={props.user} />
      </Backdrop>
      </Grid>
      <Backdrop
        open={loading}
      >
        {
        loading ?
        <CircularProgress />
        :
        null
        
        }
      </Backdrop>
    </Box>
    </section>
  )
}

export default Home