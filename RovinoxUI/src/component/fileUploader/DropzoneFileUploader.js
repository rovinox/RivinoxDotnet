import React from 'react'
import { DropzoneArea } from "mui-file-dropzone";

 const DropzoneFileUploader = ({acceptedFilesArray,onChange }) => {
  
  return (
    <div style={{marginTop:30}}><DropzoneArea  acceptedFiles={acceptedFilesArray} filesLimit={1} onChange={onChange} /></div>
  )
}
export default DropzoneFileUploader;