import { Box,Stack } from '@mui/material';
import React, {useState, useEffect} from 'react'
import CommentBox from './CommentBox';
import CommentInputBox from './CommentInputBox';
import { dummyState } from './dummyState';

function Main(props) {
  const [state,setState] = useState(dummyState);
  const {comments} = state;
  const {windowW} = props

  const [selected,setSelected] = useState(0); //0 for none, -id for edit, id for reply
  const [reorderedComments,setReorderedComments] = useState(comments);

  useEffect(()=> {
    ['click','keydown'].forEach(event => 
      window.addEventListener(event, (e)=> {
        if(e.target.id === 'root' || e.code === "Escape") {
          setSelected(0);
        }
      })
    )
  },[])

  // useEffect(()=> {
  //   updateOrder(comments);
  // },[])
  // function updateOrder(list){
  //   console.log('reordering comments')
  //   let reorderedList = [];
  //   let temp = list;

  //   while(temp.length > 0) {
  //     let maxIndex = getMaxScoreIndex(temp);
  //     // console.log(temp[maxIndex])

  //     reorderedList.push(temp[maxIndex])
  //     temp.splice(maxIndex,1);
  //   }
  //   console.log(reorderedList);
  //   setReorderedComments(reorderedList)
  // }

  // function getMaxScoreIndex(list) {
  //   let maxIndex = 0;
  //   let maxScore = 0;
  //   for (let i = 0; i < list.length; i++){
  //     if (maxScore < list[i].score) {
  //       maxIndex = i;
  //       maxScore = list[i].score;
  //     }
  //   }
  //   return maxIndex;
  // }

  return (
    <>
      <Stack 
        sx={{
          my: 6,
          width: {laptop: "730px", mobile: "100%"},
          p: {laptop: 0, mobile: 2},
          mx: 'auto',
          alignItems: 'center',
          // border: '1px solid red',
          '& > * + *': {
            mt: 2
          }
        }}
      >
        {reorderedComments.map((c)=> 
          <CommentBox 
            key={c.id} 
            selected={selected}
            setSelected={setSelected}
            windowW={windowW}
            {...c}
          />
        )}
        <CommentInputBox type='comment' windowW={windowW}/>
      </Stack>

    </>
  )
}

export default Main