import { useState } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import Lobby from './components/Lobby';
import Chat from './components/Chat';


const ChatMain = () => {
  const [connection, setConnection] = useState();
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  const joinRoom = async (user, room) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("http://localhost:5122/chathub", {
          accessTokenFactory: () => localStorage.getItem("token")
      })
        .configureLogging(LogLevel.Information)
        .build();

      connection.on("ReceiveMessage", (user, message) => {
        setMessages(messages => [...messages, { user, message }]);
      });

      connection.on("UsersInRoom", (users) => {
        setUsers(users);
      });

      connection.onclose(e => {
        setConnection();
        setMessages([]);
        setUsers([]);
      });

      await connection.start();
      await connection.invoke("JoinRoom", { user, room });
      setConnection(connection);
    } catch (e) {
      console.log(e);
    }
  }

  const sendMessage = async (message) => {
    try {
      await connection.invoke("SendMessage", message);
    } catch (e) {
      console.log(e);
    }
  }

  const closeConnection = async () => {
    try {
      await connection.stop();
    } catch (e) {
      console.log(e);
    }
  }

  return <div className='app'>
    <h2>MyChat</h2>
    <hr className='line' />
    {!connection
      ? <Lobby joinRoom={joinRoom} />
      : <Chat sendMessage={sendMessage} messages={messages} users={users} closeConnection={closeConnection} />}
  </div>
}

export default ChatMain;

// import React from 'react'
// import { Avatar, Grid } from "@mui/material";
// import Divider, { dividerClasses } from '@mui/material/Divider';
// import Chat from './Chat';

// import Header from '../header/Header';
// import Channels from './Channels';
// export default function ChatMain() {
//   const currentUser = {
//     "firstName": "cat",
//     "lastName": "will",
//     "fullName": "cat will",
//     "balance": 0,
//     "enabled": true,
//     "id": "0ae34dfd-2af4-41d4-9d1b-8c115a253d95l",
//     "email": "",
//     "image": "",
//     "phoneNumber": ""
//   } 

//   const chatData = [
//     {name:"him",
//       id:1,
//       chat : [
//         {content:"Hello",createdBy:{
//           "firstName": "cat",
//           "lastName": "will",
//           "fullName": "cat will",
//           "balance": 0,
//           "enabled": true,
//           "id": "0ae34dfd-2af4-41d4-9d1b-8c115a253d95",
//           "email": "",
//           "image": "",
//           "phoneNumber": ""
//         } },
//         {content:"Hello", createdBy:{
//           "firstName": "cat",
//           "lastName": "will",
//           "fullName": "cat will",
//           "balance": 0,
//           "enabled": true,
//           "id": "0ae34dfd-2af4-41d4-9d1b-8c115a253d95l",
//           "email": "",
//           "image": "",
//           "phoneNumber": ""
//         } },
//         {content:"how are you", createdBy:{
//           "firstName": "cat",
//           "lastName": "will",
//           "fullName": "cat will",
//           "balance": 0,
//           "enabled": true,
//           "id": "0ae34dfd-2af4-41d4-9d1b-8c115a253d95",
//           "email": "",
//           "image": "",
//           "phoneNumber": ""
//         } }

//       ]
//     }
//   ]

//   return (
//     <div style={{marginTop:100, padding:50}} >
//       <Header />
//       <Grid container spacing={2}>
//   <Grid item xs={4}>
//    <Channels/>
  
//   </Grid>
//   <Grid item xs={8}>
//  <Chat/>
//   </Grid>
// </Grid>
    
    
        
 
//     </div>
//   )
// }
