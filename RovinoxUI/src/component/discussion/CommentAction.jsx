import React from 'react'
import {Box,Typography} from '@mui/material';
import {ReactComponent as ReplyIcon} from "./images/icon-reply.svg"
import {ReactComponent as DeleteIcon} from "./images/icon-delete.svg"
import {ReactComponent as EditIcon} from "./images/icon-edit.svg"
import theme from '../discussion/theme';


function CommentAction(props) {
  const {type,sx,onClick,reply,edit} = props;
const primaryLight = theme.palette.primary.light;
const secondaryLight = theme.palette.secondary.light;
  return (
    <>
      {(type === "reply") && 
        <Box 
          sx={{
            userSelect: 'none',
            ...(reply && {
              '& *':{
                color: primaryLight, 
                fill: primaryLight,
              }
            }),
            ...sx
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
            ...(edit && {
              '& *':{
                color: primaryLight, 
                fill: primaryLight
              },
            }),
            ...sx
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
            '&:active *': {
              color: secondaryLight, 
              fill: secondaryLight
            },
            ...sx
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