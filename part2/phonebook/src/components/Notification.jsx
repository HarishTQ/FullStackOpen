import React from 'react'

const successStyle = {
    color: 'green',
    background: 'lightgrey',
    font_size: 20,
    border_style: 'solid',
    border_radius: 5,
    padding: 10,
    margin_bottom: 10
}
  
const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    font_size: 20,
    border_style: 'solid',
    border_radius: 5,
    padding: 10,
    margin_bottom: 10
}

const Notification = ({message}) => {
    if(message===''){return null;}
    if(message.type==="error"){
        return <div style={errorStyle}>{message.content}</div>
    }
    else{
        return <div style={successStyle}>{message.content}</div>
    }
}

export default Notification