import { Box } from '@mui/material'
import React from 'react'


function Footer() {
  return (
    <>
      <Box sx={{fontSize: '11px', textAlign: 'center'}}>
        Challenge by <a style={{color: 'hsl(228, 45%, 44%)'}} href="https://www.frontendmentor.io?ref=challenge" target="_blank" rel="noreferrer">Frontend Mentor</a>. 
        Coded by <a style={{color: 'hsl(228, 45%, 44%)'}} href="https://nekopudding.github.io/portfolio/" target="_blank" rel="noreferrer">Dean Yang</a>.
      </Box>
    </>
  )
}

export default Footer