import React from 'react';
import AllCOmments from './AllCOmments'
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';

export default function CommentLanding() {

  return (
      <ThemeProvider theme={theme}>
        <CssBaseline/>
      <AllCOmments  />     
      </ThemeProvider>
 

  )
}
