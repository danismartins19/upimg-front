import React, { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";

function Home() {
  let base64string : any = "";
  const [file,setFile] = useState<any>(null);
  const fileTypes = ["JPG", "PNG"];
  const handleDropFiles = (file : File) =>{
    setFile(file)
  }

  useEffect(()=>{
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      base64string = reader.result;
    }

    console.log(base64string);
    
  },[file])


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
      <p>{file ? `${file[0].name} adicionado!` : "Nenhum arquivo adicionado!"}</p>
    </>
  );
}

export default Home;
