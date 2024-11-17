import React from 'react'
import { Avatar, Grid } from "@mui/material";
import Divider, { dividerClasses } from '@mui/material/Divider';
import Chat from './Chat';

import Header from '../header/Header';
import Channels from './Channels';
export default function ChatMain() {
  const currentUser = {
    "firstName": "cat",
    "lastName": "will",
    "fullName": "cat will",
    "balance": 0,
    "enabled": true,
    "id": "0ae34dfd-2af4-41d4-9d1b-8c115a253d95l",
    "email": "",
    "image": "",
    "phoneNumber": ""
  } 

  const chatData = [
    {name:"him",
      id:1,
      chat : [
        {content:"Hello",createdBy:{
          "firstName": "cat",
          "lastName": "will",
          "fullName": "cat will",
          "balance": 0,
          "enabled": true,
          "id": "0ae34dfd-2af4-41d4-9d1b-8c115a253d95",
          "email": "",
          "image": "",
          "phoneNumber": ""
        } },
        {content:"Hello", createdBy:{
          "firstName": "cat",
          "lastName": "will",
          "fullName": "cat will",
          "balance": 0,
          "enabled": true,
          "id": "0ae34dfd-2af4-41d4-9d1b-8c115a253d95l",
          "email": "",
          "image": "",
          "phoneNumber": ""
        } },
        {content:"how are you", createdBy:{
          "firstName": "cat",
          "lastName": "will",
          "fullName": "cat will",
          "balance": 0,
          "enabled": true,
          "id": "0ae34dfd-2af4-41d4-9d1b-8c115a253d95",
          "email": "",
          "image": "",
          "phoneNumber": ""
        } }

      ]
    }
  ]

  return (
    <div style={{marginTop:100, padding:50}} >
      <Header />
      <Grid container spacing={2}>
  <Grid item xs={4}>
   <Channels/>
  
  </Grid>
  <Grid item xs={8}>
 <Chat/>
  </Grid>
</Grid>
    
    
        
 
    </div>
  )
}
