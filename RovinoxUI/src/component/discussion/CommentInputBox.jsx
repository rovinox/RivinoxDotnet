import { Avatar, Box, Button, TextField } from '@mui/material'
import React, { useEffect, useState, useRef } from 'react'
import theme from '../discussion/theme';
import { dummyState } from './dummyState';
import InputField from './InputField'
import { apiService } from '../../api/axios';
import {  useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPost } from '../../duck/discussionSlice';

function CommentInputBox(props) {
  const dispatch = useDispatch();
  
  const [state,setState] = useState(dummyState);
  const { curriculumId } = useParams();
  const {users,currentUser, newId,comments} = state;
  const {type,insertAt,setSelected,windowW, selected, createdBy, postId} = props;
  const [text,setText] = useState("");
  const inputField = useRef(null);

  const  handleSubmit = async() =>{
    if (text.trim().length === 0) return;
    let payload = {}
    let apiUrl = ""
    if (type === 'comment') {
      const postPayload  = {
        content: text,
        curriculumId,
      } 
      apiUrl ="http://localhost:5122/api/post"
       payload = postPayload
    } else if (type === 'reply') {
      const replayPayload  = {
        content: text,
        postId,
        replyingToId:createdBy.id

      } 
      apiUrl ="http://localhost:5122/api/replier"
       payload = replayPayload
    
    }
    
    try {
       
        const result = await apiService.post(apiUrl, payload);
        console.log(result);
        if (result?.data) {
          dispatch(getPost(curriculumId))
        }
      } catch (err) {
        console.log(err);
      }
      inputField.current.value = '';
      setSelected(0);
    
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