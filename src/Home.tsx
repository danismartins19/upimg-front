import React, { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import api from 'axios';

function Home() {
  let base64string : any = "";
  const fileTypes = ["JPG", "PNG"];
  const [fileName, setFileName] = useState<string>("");

  const handleDropFiles = (file : any) =>{
    var reader = new FileReader();
    if(file[0]){
      reader.readAsDataURL(file[0])
      setFileName(file[0].name)
    }

    reader.onloadend = () =>{
      base64string = reader.result;
    }
  }

  const sendImage = () =>{
    let jsonstr = JSON.stringify(base64string);
    api.post(`${import.meta.env.VITE_BASE_URL}/`, { 
        jsonstr
      }      
    )
    .then((res)=>{
      alert(res)
    })
    .catch((err) =>{
      alert(err)
    })

  }

  return (
    <>
     <FileUploader
        multiple={true}
        handleChange={handleDropFiles}
        name="file"
        label="Selecione ou arraste a imagem aqui"
        hoverTitle="Solte aqui"
        types={fileTypes}
      />

      { fileName != "" && 

        <>
          <h4>{fileName}</h4>
          <br />
          <button onClick={sendImage}>Enviar imagem</button>
        </>


      }

    </>
  );
}

export default Home;
