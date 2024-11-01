import React, { useEffect,useState } from 'react'
import {Box,Avatar,Typography} from '@mui/material';
import theme from '../discussion/theme';
import CommentAction from './CommentAction';
import RelativeTime from '@yaireo/relative-time'
//import selectAvatar from 'utils/resolveAvatarPath';
import CommentHeaderActions from './CommentHeaderActions';
import { dummyState } from './dummyState';


function CommentHeader(props) {
  const [state,setState] = useState(dummyState);
  const {users,currentUser} = state;
  const {user,createdAt ,onDelete,onEdit,onReply, reply,edit, deleted,windowW} = props;
  const [date,setDate] = useState('');

  const relativeTime = new RelativeTime();
  useEffect(()=> {
    setDate(relativeTime.from(new Date(createdAt)))
    const interval = setInterval(()=> {
      setDate(relativeTime.from(new Date(createdAt)))
    },5000)
    return () => clearInterval(interval)
  },[createdAt])

  return (
    <>
      <Box sx={{display: 'flex', height: 32, alignItems: 'center', justifyContent: 'space-between', mb: '20px'}}>
        <Box className="header-left" sx={{flexGrow: 1, display: 'flex', alignItems: 'center'}}>
          <Avatar 
            alt="avatar"
            src=''
            sx={{ width: 32, height: 32 }}   
          />
          <Typography variant="username" sx={{ml:2}}>{user}</Typography>
          {(user === currentUser) && <Typography variant="you" sx={{ml:1, height: 18
          ,bgcolor: theme.palette.primary.main
         ,py:'2px',px:'6px', lineHeight:1, borderRadius: '3px'}}>you</Typography>}
          <Typography variant="body" sx={{ml:2}}>{date}</Typography>
        </Box>
        
        {!deleted
       && (windowW > theme.breakpoints.values.laptop)
         &&
          <CommentHeaderActions user={user} onDelete={onDelete} onEdit={onEdit} onReply={onReply} reply={reply} edit={edit}/>
        }
        

      </Box>
    </>
  )
}

export default CommentHeader