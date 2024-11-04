import { TextField } from '@mui/material';
import React from 'react'


function InputField(props) {
  const {handleChange,type,r,defaultValue,sx} = props;
  return (
    <TextField 
      // ref={inputField}
      placeholder={type==='reply' ? "Add a reply..." : ((type==='edit') ? "Edit comment..." : "Add a comment...")}
      onChange={handleChange}
      defaultValue={defaultValue}
      minRows={3}
      fullWidth
      multiline
      autoFocus={type==='reply'}
        inputProps={{
          ref: r,
          'aria-label': 'markdown input',
        }}
    />
  )
}

export default InputField