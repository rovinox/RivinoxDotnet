import React, { useEffect, useState } from 'react';
import Day4 from '../../student/course/Day4'
import AllCOmments from '../discussion/AllCOmments'
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '../discussion/theme';

export default function CurriculumContent() {

  const [windowW,setWindowW] = useState(window.innerWidth);


  useEffect(()=>{
    window.addEventListener('resize', ()=>{
      setWindowW(window.innerWidth)
    })
  },[])
  return (

      <ThemeProvider theme={theme}>
        <CssBaseline/>
      <AllCOmments windowW={windowW} />     
      </ThemeProvider>

  )
}
