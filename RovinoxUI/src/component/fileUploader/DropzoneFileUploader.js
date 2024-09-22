import React, {useState} from 'react'
import { DropzoneArea } from "mui-file-dropzone";

 const DropzoneFileUploader = () => {
  const [file, setFile] = useState([])

  const handleFile = () =>{

  }
  return (
    <div style={{marginTop:30}}><DropzoneArea  acceptedFiles={['image/*']} filesLimit={1} onChange={handleFile} /></div>
  )
}
export default DropzoneFileUploader;