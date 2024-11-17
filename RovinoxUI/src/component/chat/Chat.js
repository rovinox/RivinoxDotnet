import React from 'react'
import { ChatBox, ReceiverMessage, SenderMessage } from "mui-chat-box"
import { Avatar } from "@mui/material";

export default function Chat() {
  return (
    <div>  <ChatBox>
    <ReceiverMessage avatar={<Avatar>KS</Avatar>}>
      Hello how are you?
    </ReceiverMessage>
    <SenderMessage avatar={<Avatar>NA</Avatar>}>
      I'm good thanks you?
    </SenderMessage>
    <ReceiverMessage avatar={<Avatar>KS</Avatar>}>
      I'm good too!
    </ReceiverMessage>
  </ChatBox></div>
  )
}
