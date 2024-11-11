import { Box } from '@mui/material';
import React from 'react'
import CommentAction from './CommentAction';

function CommentHeaderActions(props) {
  const {onDelete,onEdit,onReply, reply,edit, createdBy, currentUserObj} = props;
  console.log('CommentHeaderActions',props);
  return (
    <Box className="header-right" sx={{ml: 3, display: 'flex', alignItems: 'center'}}>
      {(createdBy?.id === currentUserObj?.id) ? 
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