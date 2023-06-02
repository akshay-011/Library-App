import React from 'react'
import Alert from '@mui/material/Alert';

const Alerts = (props) => {
  return (
    <div>
        <Alert sx={{  width:'24vw' }} onClose={props.onclose} severity={props.sev} >{ props.text }</Alert>
    </div>
  )
}

export default Alerts