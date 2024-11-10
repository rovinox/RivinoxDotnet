import { Stack } from '@mui/material';
import React, {useState, useEffect} from 'react'
import CommentBox from './CommentBox';
import CommentInputBox from './CommentInputBox';
import {  useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPost, getVotes } from '../../duck/discussionSlice';
import Header from '../header/Header';


function Main() {
  const dispatch = useDispatch();

  const [windowW,setWindowW] = useState(window.innerWidth);


  const [selected,setSelected] = useState(0); //0 for none, -id for edit, id for reply
  const [selectedType,setSelectedType] = useState(""); 

  const { curriculumId } = useParams();
  const posts = useSelector(
    (state) => state.discussion.posts
  );
  const currentUserObj = useSelector((state) => state.account.user);
console.log(posts);
  useEffect(()=> {
    ['click','keydown'].forEach(event => 
      window.addEventListener(event, (e)=> {
        if(e.target.id === 'root' || e.code === "Escape") {
          setSelected(0);
        }
      })
    )
  },[])

  useEffect(() => {
    dispatch(getPost(curriculumId))
    dispatch(getVotes(curriculumId))
  }, [curriculumId, dispatch]);

  useEffect(() => {
    dispatch(getPost(curriculumId))
  }, [curriculumId, dispatch]);

  useEffect(()=>{
    window.addEventListener('resize', ()=>{
      setWindowW(window.innerWidth)
    })
  },[])

  return (
    <>
    <Header/>
      <Stack 
        sx={{
          my: 6,
          width:730,
          mx: 'auto',
          alignItems: 'center',        
          '& > * + *': {
            mt: 2
          }
        }}
      >
        {posts.map((c)=> 
          <CommentBox 
            key={c.id} 
            selected={selected}
            setSelected={setSelected}
            windowW={windowW}
            {...c}
            currentUserObj={currentUserObj}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
          />
        )}
        <CommentInputBox  windowW={windowW}/>
      </Stack>

    </>
  )
}

export default Main