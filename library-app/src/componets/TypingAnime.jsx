import { Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

const TypingAnime = ({texts, time}) => {
    const [text, setText] = useState('');
    useEffect(() => {
        const txt = texts;
        let currIndex = 0;

        const interval = setInterval(() => {
            if(currIndex === txt.length){
                clearInterval(interval)
                currIndex = 0;
                return null;
            }
            else{
                setText(txt.slice(0, currIndex + 1));
                currIndex = currIndex + 1;
            }
        },time);
        return  () => {
            clearInterval(interval)
        }
    },[])
  return (
    <Typography 
    variant='h2' 
    color={"Background"} 
    style={{
        fontWeight:'bold',
        marginBottom:'15vh'
    }} >
        {text}
    </Typography>
    
  )
}

export default TypingAnime