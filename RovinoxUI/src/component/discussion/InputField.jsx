import { TextField } from '@mui/material';
import React from 'react'
import theme from '../discussion/theme';

function InputField(props) {
  const {handleChange,type,r,defaultValue,sx} = props;
  return (
    <TextField 
      // ref={inputField}
      placeholder={type==='reply' ? "Add a reply..." : ((type==='edit') ? "Edit comment..." : "Add a comment...")}
      onChange={handleChange}
      defaultValue={defaultValue}
      minRows={3}
      // fullWidth
      multiline
      autoFocus={type==='reply'}
      sx={{
        flexGrow: 1,
        '& fieldset,&:hover fieldset': { border: 'none'},
        '& .MuiOutlinedInput-root': {
          p: 0,
          lineHeight: 1.5,
        },
        ...sx
      }}
      InputProps={{
          sx:{ 
            caretColor: theme.palette.clr400,
            '& textarea': {
              py: 2,
              px: 3,
             color: theme.palette.clr500,
              boxSizing: 'border-box',
              overflow: 'visible !important',
              borderRadius: '8px',
              border: '1px solid '+ theme.palette.clr300,
              '&:focus': {
                borderColor: theme.palette.primary.main
              },
            },
            '& textarea::placeholder': {
             ...theme.typography.body,
             color: theme.palette.clr400,
              opacity: 1
            }
          } 
        }} 
        inputProps={{
          ref: r,
          'aria-label': 'markdown input',
        }}
    />
  )
}

export default InputField