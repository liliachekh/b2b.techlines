import { useState } from 'react';
import style from "./photoUploader.module.scss"
import { UploadFile } from '../icons'
import Input from '../Input';
import { inputFields } from './inputFields';
import { baseUrl } from '../../utils/vars';
import { useUploadProductPhotoMutation } from '../../store/api/products.api';


export default function PhotoUploader({ isInAccount = false }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [uploadPhoto] = useUploadProductPhotoMutation();

  const handleFileChange = (event) => {
    const files = event.target.files;
  setSelectedFiles(Array.from(files))
  };

  const handleUpload = async (event) => {
    event.preventDefault()
    try {
      const formData = new FormData();
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append('photos', selectedFiles[i], selectedFiles[i].name);
      }
      // const response = await fetch(`${baseUrl}products/images`,
      //   {
      //     method: 'POST',
      //     body: formData,
      //     headers: {
      //       'path' : './static/images'
      //     },
      //   }
      // );
      const response = await uploadPhoto(formData);
      if (response.data) {
        setShowSuccessMessage(true);

        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000);
      } else {
        console.error('Error uploading image:', response.error.data.message);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div className={style.uploader}>
      <div className={style.uploader__container}>
        <input
          type="file" multiple
          onChange={handleFileChange}
          className={style.uploader__input}
          id='file' />
        <label
          htmlFor='file'
          className={style.uploader__label}>
          <UploadFile />
          <span className={style.uploader__text}>Choose file</span>
        </label>
        <button
          onClick={(event) => handleUpload(event)}
          disabled={!selectedFiles}
          className={`${style.uploader__btn} ${isInAccount && style.uploader__btn_inAccount}`}>
          Upload
        </button>
      </div>
      {selectedFiles.length > 0 && (
        <p className={style.uploader__fileName}>
          {selectedFiles.map(file => file.name).join(', ')}
        </p>
      )}
        <Input
        key={inputFields.name}
        {...inputFields}
        value={selectedFiles.map(file => `https://storage.techlines.es/images/${file.name}`)} />
      {showSuccessMessage && (
        <p className={`${style.uploader__successMessage} ${isInAccount && style.uploader__successMessage_inAccount}`}>
          Photo successfully uploaded!
        </p>)}
    </div>
  );
};
// export default function PhotoUploader({ isInAccount = false }) {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [fileName, setFileName] = useState(null);
//   const [imageUrl, setImageUrl] = useState([])
//   const [showSuccessMessage, setShowSuccessMessage] = useState(false);

//   const handleFileChange = (event) => {
//     setSelectedFile(event.target.files[0]);
//     setFileName(event.target.files[0].name);
//   };

//   const handleUpload = async (event) => {
//     event.preventDefault()
//     try {
//       const formData = new FormData();
//       // formData.append('file', selectedFile);
//       formData.append('photos', selectedFile);
//       // formData.append('upload_preset', 'images');
//       console.log(formData);

//       const response = await fetch('http://localhost:4000/api/products/images',
//         {
//           method: 'POST',
//           body: formData,
//           headers: {
//             'Content-Type': 'multipart/form-data; boundary=someBoundary',
//             // 'Content-Length': 'calculated when request is sent',
//             'path': './static/images',
//           },
//         }
//       );

//       const data = await response.json();
//       // setImageUrl(data.secure_url)
//       setImageUrl((prevUrls) => [...prevUrls, data.secure_url]);
//       setShowSuccessMessage(true);
//       console.log(data);
//       console.log(imageUrl);

//       setTimeout(() => {
//         setShowSuccessMessage(false);
//       }, 3000);
//     } catch (error) {
//       console.error('Error uploading image:', error);
//     }
//   };

//   return (
//     <div className={style.uploader}>
//       <div className={style.uploader__container}>
//         <input
//           type="file"
//           onChange={handleFileChange}
//           className={style.uploader__input}
//           id='file' />
//         <label
//           htmlFor='file'
//           className={style.uploader__label}>
//           <UploadFile />
//           <span className={style.uploader__text}>Choose file</span>
//         </label>
//         <button
//           onClick={(event) => handleUpload(event)}
//           disabled={!selectedFile}
//           className={`${style.uploader__btn} ${isInAccount && style.uploader__btn_inAccount}`}>
//           Upload
//         </button>
//       </div>
//       {fileName && <p className={style.uploader__fileName}>{fileName}</p>}
//       <Input
//         key={inputFields.name}
//         {...inputFields}
//         value={imageUrl} />
//       {showSuccessMessage && (
//         <p className={`${style.uploader__successMessage} ${isInAccount && style.uploader__successMessage_inAccount}`}>
//           Photo successfully uploaded!
//         </p>)}
//     </div>
//   );
// };