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
    <div className="flex gap-10 flex-col items-center w-full h-screen pt-20 bg-stone-200">

      <div className="flex w-full h-32 mb-10 items-center justify-center bg-[#234285]">
      
      </div>

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
          <button onClick={sendImage} className="w-40 h-26 p-3 rounded-md text-center bg-[#234285]/80">
            <p className="text-slate-50">Enviar imagem</p>
          </button>
        </>
      }

      
        
          <div className="flex">
              <button className="flex rounded-l-lg w-16 h-14 bg-[#234285]/80"></button>
              <div className="w-auto h-14 px-4"></div>
              <button className="flex rounded-r-lg w-16 h-14 bg-[#234285]/80 items-center justify-center"><i className="bi bi-box-arrow-up-right text-xl text-white" ></i></button>
          </div>
      

      

  </div>
  );
}

export default Home;
