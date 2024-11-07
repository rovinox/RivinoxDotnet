import React from 'react'
import {Box,Typography} from '@mui/material';
import {ReactComponent as ReplyIcon} from "./images/icon-reply.svg"
import {ReactComponent as DeleteIcon} from "./images/icon-delete.svg"
import {ReactComponent as EditIcon} from "./images/icon-edit.svg"


function CommentAction(props) {
  const {type,sx,onClick,reply,edit} = props;

  return (
    <>
      {(type === "reply") && 
        <Box 
          sx={{
            userSelect: 'none',
            
          }}
          onClick={onClick}
        >
          <ReplyIcon/>
          <Typography variant='primaryAction' sx={{ml: 1}}>Reply</Typography>
        </Box>
      }
      {(type === "edit") && 
        <Box 
          sx={{
            userSelect: 'none',
            
          }}
          onClick={onClick}
        >
          <EditIcon/>
          <Typography variant='primaryAction' sx={{ml: 1}}>Edit</Typography>
        </Box>
      }
      {(type === "delete") && 
        <Box 
          sx={{
            userSelect: 'none',
            
          }}
          onClick={onClick}
        >
          <DeleteIcon/>
          <Typography variant='secondaryAction' sx={{ml: 1}}>Delete</Typography>
        </Box>
      }
    </>
  )
}

export default CommentAction