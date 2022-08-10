import React, { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";

function Home() {
  let base64string : any = "";
  const fileTypes = ["JPG", "PNG"];

  const handleDropFiles = (file : any) =>{
    var reader = new FileReader();
    if(file[0]){
      reader.readAsDataURL(file[0])
    }

    reader.onloadend = () =>{
      base64string = reader.result;
      console.log(base64string)
    }
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
    </>
  );
}

export default Home;
