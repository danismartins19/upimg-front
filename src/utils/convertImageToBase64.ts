export const convertImageToBase64 = (file : FileList) => {
    var reader = new FileReader();
    if(file[0]){
      reader.readAsDataURL(file[0])
    }

    reader.onloadend = () =>{
      return reader.result
    }
}