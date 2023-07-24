import Image from "next/image";
import { useRef, useState } from "react";
import ImagesPreview from "./ImagesPreview";

function AttachmentPopups({ showAttachment, setShowAttachment }) {
  const [selectedImages, setSelectedImages] = useState([]);
  const docRef = useRef(null);
  const imgRef = useRef(null);

  const handleImageChange = (event) => {
    const files = event.target.files;
    const imagePreviews = [];
    // Loop through each selected file to read its data using FileReader
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      // When the FileReader loads the image data, add it to the imagePreviews array
      reader.onload = () => {
        imagePreviews.push(reader.result);
        // If all images have been processed, you can handle the image previews here
        if (imagePreviews.length === files.length) {
          // For example, you can display the previews or process them further
          setSelectedImages(imagePreviews);
        }
      };

      // Read the current file as a data URL
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (indexToRemove) => {
    setSelectedImages((prevSelectedImages) =>
      prevSelectedImages.filter((_, index) => index !== indexToRemove),
    );
  };

  const closePreview = (event) => {
    event.preventDefault();
    setSelectedImages([]);
    setShowAttachment(false);
  };

  const uploadPreview = () => {
    // upload all previewd images
    setShowAttachment(false);
  };

  if (!showAttachment) {
    return null;
  }

  return (
    <>
      <div className="grid gap-y-3 bg-transparent absolute -mt-[7rem]">
        <Image
          src={require("../../../assets/icons/chat.doc-upload.svg")}
          alt="upload-doc"
          className="drop-shadow-lg hover:cursor-pointer"
          height={45}
          width={45}
          onClick={() => docRef?.current?.click()}
        />
        <Image
          src={require("../../../assets/icons/chat.image-upload.svg")}
          alt="upload-image"
          className="ml-1 drop-shadow-lg hover:cursor-pointer"
          height={40}
          width={40}
          onClick={() => imgRef?.current?.click()}
        />
        <input
          type="file"
          className="hidden"
          ref={docRef}
          accept=".pdf, .docx, .txt, application/msword"
          multiple
        />
        <input
          type="file"
          className="hidden"
          ref={imgRef}
          accept="image/*"
          multiple
          onChange={handleImageChange}
        />
      </div>
      <ImagesPreview
        selectedImages={selectedImages}
        removeImage={removeImage}
        closePreview={closePreview}
        uploadPreview={uploadPreview}
      />
    </>
  );
}

export default AttachmentPopups;
