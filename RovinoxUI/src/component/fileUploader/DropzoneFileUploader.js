import React, {useState} from 'react'
import { DropzoneArea } from "mui-file-dropzone";

 const DropzoneFileUploader = () => {
  const [file, setFile] = useState([])

  const handleFile = () =>{

  }
  return (
    <div><DropzoneArea onChange={handleFile} /></div>
  )
}
export default DropzoneFileUploader;