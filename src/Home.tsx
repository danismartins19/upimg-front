import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { api } from "./api/api";
import { GenerateUrl } from "./utils/generateUrl";

function Home() {

  const [base64string, setBase64string] = useState<any>("");
  const [fileName, setFileName] = useState<string>("");
  const [linkToViewImage, setLinkToViewImage] = useState<any>(null);

  const fileTypes = ["JPG", "PNG"];

  const handleDropFiles = (file : any) =>{
    var reader = new FileReader();
    if(file[0]){
      reader.readAsDataURL(file[0])
      setFileName(file[0].name)
    }

    reader.onloadend = () =>{
      setBase64string(reader.result);
    }
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

      { fileName != "" && 
        <>
          <h4>{fileName}</h4>
          <br />
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
