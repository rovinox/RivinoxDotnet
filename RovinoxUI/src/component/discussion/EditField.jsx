import { Button, Stack } from '@mui/material'
import React from 'react'
import InputField from './InputField'


function EditField(props) {
  const {defaultValue, onChange,onSubmit} = props
  
  return (
    <>
      <Stack sx={{alignItems: 'end'}}>
        <InputField defaultValue={defaultValue} handleChange={onChange} type='edit' sx={{width: '100%'}}/>
        <Button 
            variant='contained' 
            size='large' 
            onClick={onSubmit}
            sx={{
              width: 104, height: 48, mt:  2, borderRadius: '8px'

            }}
          >
            Update
          </Button>
      </Stack>
      
    </>
  )
}

export default EditField