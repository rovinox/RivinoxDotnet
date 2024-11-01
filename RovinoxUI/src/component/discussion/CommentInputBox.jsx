import { Avatar, Box, Button, TextField } from '@mui/material'
import React, { useEffect, useState, useRef } from 'react'
import theme from '../discussion/theme';
import { dummyState } from './dummyState';
import InputField from './InputField'
//import selectAvatar from 'utils/resolveAvatarPath'

function CommentInputBox(props) {
  const [state,setState] = useState(dummyState);
  const {users,currentUser, newId,comments} = state;
  const {type, replyingTo,insertAt,setSelected,windowW} = props;
  const [text,setText] = useState("");
  const inputField = useRef(null);

  function handleSubmit(){
    if (text.trim().length === 0) return;
    if (type === 'comment') {
      const newComment = {
        id : newId,
        content: text,
        createdAt: new Date().toString(),
        score: 0,
        user: currentUser,
        replies: []
      }
      setState(prev=> {return {...prev, newId: newId+1, comments: [...prev.comments, newComment]}})
      inputField.current.value = '';
      return;
    } else if (type === 'reply') {
      const updatedComments = state.comments;
      const newReply = {
        id : newId,
        content: text,
        createdAt: new Date().toString(),
        score: 0,
        user: currentUser,
        replyingTo: replyingTo
      }
      updatedComments[insertAt].replies.push(newReply);
      setState(prev=> {return {...prev, newId: newId+1, comments: updatedComments}})
      setSelected(0);
    }
    
  }
  function handleTextChange(e) {
    setText(e.target.value);
  }

  return (
    <>
      <Box 
        id={type==='reply' ? 'replyBox' : ''} 
        sx={{
          display: {laptop: 'flex', mobile: 'block'},
          width: '100%', 
          minHeight: '150px',
         bgcolor: theme.palette.clr100,
          borderRadius: "4px",
          p: 3,
        }}
      >
        {(windowW <= 1024) && 
        <>
          <Box sx={{display: 'flex', width: '100%', }}>
            <InputField handleChange={handleTextChange} type={type} r={inputField}/>
          </Box>
          <Box sx={{display: 'flex', width: '100%', mt: 2, justifyContent: 'space-between', alignItems: 'center'}}>
            <Avatar alt="avatar" src='' sx={{mr:2, width: 32, height: 32}}/>
            <Button 
              variant='contained' 
              size='large' 
              onClick={handleSubmit}
              sx={{
                width: 104, height: 48, ml:  2, borderRadius: '8px',
                 '&:hover': {
                   bgcolor: theme.palette.primary.main, boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)'}, 
                 '&:active': {bgcolor: theme.palette.primary.light}
              }}
            >
              {type==='reply' ? 'Reply' : 'Send'}
            </Button>
          </Box>
        </>
        }
        {
          
        }
        {(windowW > 1024) && 
        <>
          <Avatar alt="avatar" src='' sx={{mr:2}}/>
          {/* <Avatar alt="avatar" src={selectAvatar(currentUser)} sx={{mr:2}}/> */}
          <InputField handleChange={handleTextChange} type={type} r={inputField}/>
          <Button 
            variant='contained' 
            size='large' 
            onClick={handleSubmit}
            sx={{
              width: 104, height: 48, ml:  2, borderRadius: '8px',
               '&:hover': {bgcolor: theme.palette.primary.main, boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)'}, 
              '&:active': {bgcolor: theme.palette.primary.light}
            }}
          >
            {type==='reply' ? 'Reply' : 'Send'}
          </Button>
        </>
        }
        
      </Box>
    </>
  )
}

export default CommentInputBox