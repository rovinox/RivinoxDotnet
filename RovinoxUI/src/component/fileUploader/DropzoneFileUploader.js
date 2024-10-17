import React from 'react'
import { DropzoneArea } from "mui-file-dropzone";
import { Typography } from '@mui/material';

 const DropzoneFileUploader = ({acceptedFilesArray,onChange }) => {
  
  return (
    <div style={{marginTop:30}}><DropzoneArea  acceptedFiles={acceptedFilesArray} filesLimit={1} onChange={onChange} />
    <p style={{textAlign: "center"}}>  Accepted Files:  {acceptedFilesArray.map(item =>item)} </p>
    </div>
  )
}
export default DropzoneFileUploader;