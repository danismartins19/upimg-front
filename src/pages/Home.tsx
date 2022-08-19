import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { api } from "../api/api";
import { convertImageToBase64 } from "../utils/convertImageToBase64";
import { fileTypes } from "../utils/fileTypesAccepted";
import { GenerateUrl } from "../utils/generateUrl";

function Home() {

  const [base64string, setBase64string] = useState<any>("");
  const [linkToViewImage, setLinkToViewImage] = useState<any>(null);


  const handleDropFiles = (file : FileList) =>{
      setBase64string(convertImageToBase64(file))
  }

  const sendImage = () =>{

    api.post('/', {
      "img" : base64string
    })
    .then((res)=>{
      return res.data;
    })
    .then((res)=>{
      setLinkToViewImage(GenerateUrl(res.id))
    })
    .catch((err)=>{
      console.log(err)
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

      { base64string != "" && 
        <>
          <button onClick={sendImage}>Enviar imagem</button>
        </>
      }

      {
        linkToViewImage != null && 
          <>
              <h4>{linkToViewImage}</h4>
          </>
      }

    </>
  );
}

export default Home;
