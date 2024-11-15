import { IconButton, Stack, Typography } from '@mui/material';
import React from 'react'
import {ReactComponent as PlusIcon} from './images/icon-plus.svg'
import {ReactComponent as MinusIcon} from './images/icon-minus.svg'

function ScoreButton(props) {
  const {score,onPlus,onMinus, loading, direction} = props;
  return (
    <>
      <Stack 
        sx={{
          height: (direction === 'row') ? '40px' : '100px', 
          width: (direction === 'row') ? '100px': '40px',
          borderRadius: '4px',
          alignItems: 'center',
          bgcolor:"#191A3A",
          justifyContent: 'space-between',
        }}
        direction={direction}
      >
        <IconButton 
          sx={{
            m:0, p:1.5, 
            height: 36, width: 36,
            borderRadius: 0, 
            // '& path': {
            //   fill: upvoted ? theme.palette.primary.main : 'default'
            // },
            // '&:hover': {bgcolor: 'transparent'},
            // '&:active path': 
            // {fill: theme.palette.primary.main}
          }}
          disableRipple
          disabled={loading}
          onClick={onPlus}
        >
          <PlusIcon/>
        </IconButton>
        <Typography color="primary" variant="scoreText">{score}</Typography>
        <IconButton 
          sx={{
            m:0, p:1.5, 
            height: 36, width: 36,
            borderRadius: 0, 
            // '& path': {
            //   fill: downvoted ? theme.palette.primary.main : 'default',

            // },
            // '&:hover': {bgcolor: 'transparent'},
            // '&:active path': {
            //   fill: downvoted ? theme.palette.primary.main : 'default',
             
            // }
          }}
          disableRipple
          disabled={loading}
          onClick={onMinus}
        >
          <MinusIcon/>
        </IconButton>
      </Stack>
    </>
  )
}

export default ScoreButton