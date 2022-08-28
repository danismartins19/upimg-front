import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { Link } from "react-router-dom";
import { api } from "../api/api";
import { fileTypes } from "../utils/fileTypesAccepted";
import { GenerateUrl } from "../utils/generateUrl";

function Home() {

  const [base64String, setBase64String] = useState<any>(null);
  const [linkToViewImage, setLinkToViewImage] = useState<any>(null);
  const [idImg, setIdImg] = useState<any>(null)


  const handleDropFiles = (file: FileList) => {
    var reader = new FileReader();
    if(file[0]){
      reader.readAsDataURL(file[0])
    }    

    reader.onloadend = () => {
      setBase64String(reader.result)
    }
  }

  const sendImage = () => {

    api.post('/', {
      "img": base64String
    })
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        setIdImg(res.id)
        setLinkToViewImage(GenerateUrl(res.id))
      })
      .catch((err) => {
        alert("Ocorreu algum erro" + err)
      })

  }

  const copiarLink = () => {
    navigator.clipboard.writeText(linkToViewImage)
  }

  return (
    <div className="flex gap-10 flex-col items-center w-full h-screen pt-20 bg-stone-200">

      <div className="flex w-full h-32 mb-10 items-center justify-center bg-[#234285] px-4">
          <p className="text-white text-xl italic text-center"> Envie suas fotos e compartilhe ela com seus amigos!</p>
      </div>

      <FileUploader
        multiple={true}
        handleChange={handleDropFiles}
        name="file"
        label="Selecione ou arraste a imagem aqui"
        hoverTitle="Solte aqui"
        types={fileTypes}
      />

      {base64String != null &&
        <>
          <button onClick={sendImage} className="w-40 h-26 p-3 rounded-md text-center bg-[#234285]/80">
            <p className="text-slate-50">Enviar imagem</p>
          </button>
        </>
      }


      {
        linkToViewImage !=null &&

        <div className="flex">
          <button title="Copiar" onClick={copiarLink} className="flex rounded-l-lg w-16 h-14 bg-[#234285]/80 items-center justify-center"><i className="bi bi-clipboard text-xl text-white"></i></button>
          <div className="hidden w-auto md:flex  h-14 px-4 items-center justify-center flex bg-[#234285]/80 text-white"> {linkToViewImage} </div>
          <Link to={`/view/${idImg}`}><button title="Visualizar imagem" className="flex rounded-r-lg w-16 h-14 bg-[#234285]/80 items-center justify-center"><i className="bi bi-box-arrow-up-right text-xl text-white" ></i></button></Link>
        </div>
      }




    </div>
  );
}

export default Home;
