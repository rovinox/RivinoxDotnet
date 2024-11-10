import React, { useEffect,useState } from 'react'
import {Box,Avatar,Typography} from '@mui/material';
import CommentAction from './CommentAction';
import RelativeTime from '@yaireo/relative-time'
//import selectAvatar from 'utils/resolveAvatarPath';
import CommentHeaderActions from './CommentHeaderActions';
import { dummyState } from './dummyState';


function CommentHeader(props) {
  console.log('CommentHeader: ', props);
  const [state,setState] = useState(dummyState);
  const {users,currentUser} = state;
  const {user,createdBy, currentUserObj, createdOn ,onDelete,onEdit,onReply, reply,edit, deleted,windowW} = props;
  console.log('props: ', props);

  const [date,setDate] = useState('');

  const relativeTime = new RelativeTime();
  useEffect(()=> {
    setDate(relativeTime.from(new Date(createdOn)))
    const interval = setInterval(()=> {
      setDate(relativeTime.from(new Date(createdOn)))
    },5000)
    return () => clearInterval(interval)
  },[createdOn])

  return (
    <>
      <Box sx={{display: 'flex', height: 32, alignItems: 'center', justifyContent: 'space-between', mb: '20px'}}>
        <Box className="header-left" sx={{flexGrow: 1, display: 'flex', alignItems: 'center'}}>
          <Avatar 
            alt="avatar"
            src={createdBy?.image}
            sx={{ width: 32, height: 32 }}   
          />
          <Typography variant="username" sx={{ml:2}}>{createdBy?.fullName}</Typography>
          {(createdBy?.id === currentUserObj?.id) && <Typography variant="you" sx={{ml:1, height: 18
          
         ,py:'2px',px:'6px', lineHeight:1, borderRadius: '3px'}}>you</Typography>}
          <Typography variant="body" sx={{ml:2}}>{date}</Typography>
        </Box>
        
        {!deleted
       && (windowW > 1024)
         &&
          <CommentHeaderActions currentUserObj={currentUserObj} createdBy={createdBy} user={user} onDelete={onDelete} onEdit={onEdit} onReply={onReply} reply={reply} edit={edit}/>
        }
        

      </Box>
    </>
  )
}

export default CommentHeader