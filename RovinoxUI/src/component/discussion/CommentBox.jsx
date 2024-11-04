import { Avatar, Box,Button,Typography,Divider } from '@mui/material';
import React, {useEffect, useState} from 'react'
import theme from '../discussion/theme';
import { dummyState } from './dummyState';
import CommentHeader from './CommentHeader';
import CommentHeaderActions from './CommentHeaderActions';
import CommentInputBox from './CommentInputBox';
import DeleteDialog from './DeleteDialog';
import EditField from './EditField';
import InputField from './InputField';
import ScoreButton from './ScoreButton';


function CommentBox(props) {
  const [state,setState] = useState(dummyState);
  const {users,currentUser, comments} = state;

  const {id, content, createdOn, score,user,currentUserObj, createdBy,repliers, replyingTo, replyingToId, selected,setSelected,windowW, type, selectedType,setSelectedType, postId} = props;
  console.log('CommentBox: ', props);
  const [editText,setEditText] = useState(content);
  const [totalVotes,setTotalVotes] = useState(score);
  const [dialogOpen,setDialogOpen] = useState(false);
  const [currUserVote,setCurrUserVote] = useState(0);

  function handleConfirmDelete() {
    let updatedComments = state.comments;
    
    let indices = findIndex(id);
    if (indices.c !== -1 && indices.r === -1) {
      updatedComments[indices.c] = {...updatedComments[indices.c], content: "\0"}
    } else if (indices.r !== -1 && indices.c !== -1) {
      updatedComments[indices.c].repliers[indices.r] = {...updatedComments[indices.c].repliers[indices.r], content: "\0"}
    }

    setState(prev => {return {
      ...prev,
      comments: updatedComments
    }})
    setDialogOpen(false)
  }

  function handleUpvote() {
    let i = users.findIndex(user => user.username === currentUser);
    let updatedUserList = users;
    if (updatedUserList[i].upvoted.includes(id)) return;
    else if (updatedUserList[i].downvoted.includes(id)) {
      updatedUserList[i].downvoted = updatedUserList[i].downvoted.filter(foundId => foundId !== id);
    } else {
      updatedUserList[i].upvoted.push(id);
    }

    setState(prev => {
      return {
        ...prev,
        users: updatedUserList
      }
    })
    updateVotes(updatedUserList);
    console.log("upvoting");
  }
  function handleDownvote() {
    let i = users.findIndex(user => user.username === currentUser);
    let updatedUserList = users;
    if (updatedUserList[i].downvoted.includes(id)) return;
    else if (updatedUserList[i].upvoted.includes(id)) {
      updatedUserList[i].upvoted = updatedUserList[i].upvoted.filter(foundId => foundId !== id);
    } else {
      updatedUserList[i].downvoted.push(id);
    }

    setState(prev => {
      return {
        ...prev,
        users: updatedUserList
      }
    })
    updateVotes(updatedUserList);
    console.log("downvoting");
  }
  function handleEdit(){
    setSelected(-id);
  }
  function handleReply(){
    setSelected(id);
    setSelectedType(type);
  }

  function handleEditTextChange(e) {
    setEditText(e.target.value);
  }
  function findIndex(id){
    let indices = {
      c: -1,
      r: -1
    }
    state.comments.forEach((comment,index) => {
      if (comment.id === id) { 
        indices.c = index;
        return; 
      }

      indices.r = comment.repliers.findIndex((r) => r.id === id);
      if (indices.r !== -1) {
        indices.c = index;
        return;
      }
    })
    return indices;
  }
  function handleEditSubmit() { //on submitting edit text change
    let updatedComments = state.comments;
    
    let indices = findIndex(id);
    if (indices.c !== -1 && indices.r === -1) {
      updatedComments[indices.c] = {...updatedComments[indices.c], content: editText}
    } else if (indices.r !== -1 && indices.c !== -1) {
      updatedComments[indices.c].repliers[indices.r] = {...updatedComments[indices.c].repliers[indices.r], content: editText}
    }

    setState(prev => {return {
      ...prev,
      comments: updatedComments
    }})
    setSelected(0);
  }
  function handleDelete() { //on pressing delete button
    setDialogOpen(true);
  }

  useEffect(()=> {
    updateVotes(users);
  },[]);

  useEffect(()=> {
    updateCurrUserVote();
  },[currentUser]);

  function updateVotes(userList) {
    let votes = 0;
    userList.forEach(user => {
      if (user.upvoted.includes(id)){
        votes++;
      } else if (user.downvoted.includes(id)){
        votes--;
      }
    });
    setTotalVotes(votes + score);

    //check if current user has upvoted/downvoted this comment
    updateCurrUserVote();

  }
  function updateCurrUserVote() {
    let i = users.findIndex(user => user.username === currentUser);
    if (users[i].upvoted.includes(id)) setCurrUserVote(1);
    else if (users[i].downvoted.includes(id)) setCurrUserVote(-1);
    else setCurrUserVote(0)
  }
console.log({selected , id , selectedType , type});
  return (
    <>
      <Box 
        sx={{
          display: 'flex', 
          width: '100%', 
          minHeight: '150px',
         bgcolor: theme.palette.clr100,
          borderRadius: "4px",
          p: 3,
        }}
      >
        {content !== "\0" && (windowW > 1024) && <ScoreButton score={totalVotes} onPlus={handleUpvote} onMinus={handleDownvote} upvoted={currUserVote === 1} downvoted={currUserVote === -1}/>}
        <Box sx={{flexGrow: 1, ml: {laptop: 3, mobile: 0} }}>
          <CommentHeader  currentUserObj={currentUserObj} createdBy={createdBy} user={user} createdOn={createdOn} onDelete={handleDelete} onEdit={handleEdit} onReply={handleReply} reply={selected === id} edit={selected === -id} deleted={content === "\0"} windowW={windowW}/>
          {content !== "\0" ? 
            (selected === -id) ? 
              <EditField defaultValue={content} onChange={handleEditTextChange} onSubmit={handleEditSubmit}/>
              : 
              <Typography variant='body' sx={{flexGrow: 1,
              '& > span': {...theme.typography.primaryAction} 
               }} component='p'>
                {replyingToId && <span>{'@' + replyingTo?.fullName + ' '}</span>}
                {content.split('\n').map((line,i) => {return (<React.Fragment key={i}>
                  {line}
                  <br/>
                  </React.Fragment>)})}
              </Typography>
            :
            <Typography variant='deleted'>This comment has been deleted.</Typography>
          }
          {(windowW <= 1024) && (content !== "\0") &&
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2}}>
              <ScoreButton score={totalVotes} onPlus={handleUpvote} onMinus={handleDownvote} upvoted={currUserVote === 1} downvoted={currUserVote === -1} direction='row'/>
              <CommentHeaderActions currentUserObj={currentUserObj} createdBy={createdBy} user={user} onDelete={handleDelete} onEdit={handleEdit} onReply={handleReply} reply={selected === id} edit={selected === -id}/>
            </Box>
          }
        </Box>
      </Box>
      {(selected === id && selectedType === type ) && <CommentInputBox postId={postId} type={type} createdBy={createdBy} replyingTo={replyingTo} insertAt={findIndex(id).c} setSelected={setSelected} selected={selected} windowW={windowW}/>}
      {repliers && repliers.length > 0 && 
        <Box sx={{display: 'flex', width: '100%'}}>
          <Divider 
            orientation='vertical' 
            sx={{
              ml: {laptop: 5.5, mobile: 0}, 
              mr:{laptop: 5.5, mobile: 2}, 
              borderRightWidth: '2px', 
             borderColor: theme.palette.clr300
            }} 
            flexItem  
          />
          <Box sx={{'& > * + *': {mt: 2}, width: '100%'}}>
            {repliers.map(reply => {
              return (
                <CommentBox  key={reply.id} {...reply}  selected={selected} setSelected={setSelected} windowW={windowW}  selectedType={selectedType}
                setSelectedType={setSelectedType} />
              )
            }) }
          </Box>
        </Box>
      }
      <DeleteDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} handleConfirmDelete={handleConfirmDelete} windowW={windowW}/>
    </>
  )
}

export default CommentBox