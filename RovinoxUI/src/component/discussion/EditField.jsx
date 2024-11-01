import { Button, Stack } from '@mui/material'
import React from 'react'
import InputField from './InputField'
import theme from '../discussion/theme';

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
              width: 104, height: 48, mt:  2, borderRadius: '8px', 
              '&:hover': {
                bgcolor: theme.palette.primary.main, boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)'}, 
              '&:active': {bgcolor: theme.palette.primary.light}
            }}
          >
            Update
          </Button>
      </Stack>
      
    </>
  )
}

export default EditField