import React from 'react'
import {Box,Typography, Button} from '@mui/material';
import {ReactComponent as ReplyIcon} from "./images/icon-reply.svg"
import {ReactComponent as DeleteIcon} from "./images/icon-delete.svg"
import {ReactComponent as EditIcon} from "./images/icon-edit.svg"


function CommentAction(props) {
  const {type,onClick} = props;

  return (
    <>
      {(type === "reply") && 
        <Button 
          sx={{
            userSelect: 'none',
            
          }}
          onClick={onClick}
            startIcon={  <ReplyIcon/>}
        >
        
          <Typography variant='primaryAction' >Reply</Typography>
        </Button>
      }
      {(type === "edit") && 
        <Button
          sx={{
            userSelect: 'none',
            ml:2
            
          }}
          startIcon={ <EditIcon/>}
          onClick={onClick}
        >
          <Typography variant='primaryAction' >Edit</Typography>
        </Button>
      }
      {(type === "delete") && 
        <Button 
          sx={{
            userSelect: 'none',
            
          }}
          onClick={onClick}
          startIcon={ <DeleteIcon/>}
        >
         
          <Typography variant='secondaryAction' >Delete</Typography>
        </Button>
      }
    </>
  )
}

export default CommentAction