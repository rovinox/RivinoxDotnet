import { Box } from '@mui/material';
import React, {useState, useEffect} from 'react'
import CommentAction from './CommentAction';
import { dummyState } from './dummyState';

function CommentHeaderActions(props) {
  const [state,setState] = useState(dummyState);
  const {currentUser} = state;
  const {user,onDelete,onEdit,onReply, reply,edit} = props;
  return (
    <Box className="header-right" sx={{ml: {laptop: 3, mobile: 0}, display: 'flex', alignItems: 'center'}}>
      {(user === currentUser) ? 
        <>
          <CommentAction type='delete' onClick={onDelete}/> 
          <CommentAction type='edit' sx={{ml: 3}} onClick={onEdit} edit={edit}/>
        </> 
        :
        <CommentAction type='reply' onClick={onReply} reply={reply}/>
      }
    </Box>
  )
}

export default CommentHeaderActions