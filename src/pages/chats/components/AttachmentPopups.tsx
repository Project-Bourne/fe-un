import Image from "next/image";
import { useRef, useState } from "react";
import ImagesPreview from "./ImagesPreview";
// import docUpload from "../../../../public/icons/chat.doc-upload.svg";
// import imageUpload from "../../../../public/icons/chat.image-upload.svg";
import SocketService from "../../../socket/chat.socket";
import { useSelector } from "react-redux";
import DocumentsPreview from "./DocumentsPreview";
import {
  setReload,
  setSelectedChat,
  updateChat,
} from "@/redux/reducers/chat/chatReducer";
import { useRouter } from "next/router";

const imageUpload = require("../../../../public/icons/chat.image-upload.svg");
const docUpload = require("../../../../public/icons/chat.doc-upload.svg");

function AttachmentPopups({ showAttachment, setShowAttachment }) {
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedImgFiles, setSelectedImgFiles] = useState([]);
  const docRef = useRef(null);
  const imgRef = useRef(null);
  const { activeChat } = useSelector((state: any) => state.chats);
  const { userInfo, userAccessToken, refreshToken } = useSelector(
    (state: any) => state?.auth,
  );
  const handleImageChange = (event) => {
    const files = event.target.files;
    const imagePreviews = [];
    const imgFile = [];
    // Loop through each selected file to read its data using FileReader
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      imgFile.push(file);
      if (imgFile.length === files.length) {
        // For example, you can display the previews or process them further
        setSelectedImgFiles(imgFile);
      }
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

  const onDone = () => {
    const router = useRouter();

    router.reload();
  };

  const removeFile = (indexToRemove) => {
    setSelectedFiles((prevSelectedFiles) =>
      prevSelectedFiles.filter((_, index) => index !== indexToRemove),
    );
  };

  const uploadFiles = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const user_name = userInfo.firstName + userInfo.lastName;
    const promises = selectedFiles.map(async (file) => {
      formData.append("files", file);
      formData.append("userId", userInfo.uuid);
      formData.append("userName", user_name);
      console.log(file, "file");
      try {
        const res = await fetch(
          // "http://192.81.213.226:81/89/api/v1/uploads",
          `http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_IRP_API_PORT}/${process.env.NEXT_PUBLIC_FILE_UPLOAD_API_ROUTE}/api/v1/uploads`,
          {
            method: "POST",
            body: formData,
          },
        );

        const response = await res.json();
        if (response) {
          console.log(response, response);
          // Handle the response, e.g., sending messages via Socket
          const newObj = {
            text: `${file?.name}, ${file.size}, ${file.type}, ${response.data[0].uri}, ${response.data[0].text}`,
            uri: response.data[0].uri,
          };
          setSelectedFiles([]);
          // const useSocket = SocketService;
          const socketService = new SocketService();
          if (activeChat?.spaceName) {
            await socketService.sendMessageSpace({
              spaceId: activeChat.uuid,
              data: newObj.text,
              doc: true,
              img: false,
            });
            onDone();
          } else {
            await socketService.sendMessage({
              uuid: activeChat.uuid,
              data: newObj.text,
              doc: true,
              img: false,
            });
            onDone();
          }
        }
      } catch (error) {
        console.error(error);
      }
    });

    await Promise.all(promises);
    setShowAttachment(false);
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

  const handleDocumentChange = (event) => {
    const files = event.target.files;
    const documentPreviews = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Add the selected document to the documentPreviews array
      documentPreviews.push(file);

      // If all documents have been processed, you can handle the document previews here
      if (documentPreviews.length === files.length) {
        // For example, you can display the previews or process them further
        setSelectedFiles(documentPreviews);
      }
    }
  };

  const uploadPreview = async (e) => {
    e.preventDefault();
    console.log("Files: ", selectedImgFiles);
    const user_name = userInfo.firstName + userInfo.lastName;
    const formData = new FormData();
    formData.append("userId", userInfo.uuid);
    formData.append("userName", user_name);
    const promises = selectedImgFiles.map(async (el) => {
      formData.append("files", el);
      try {
        const res = await fetch(
          // "http://192.81.213.226:81/89/api/v1/uploads",
          `http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_IRP_API_PORT}/${process.env.NEXT_PUBLIC_FILE_UPLOAD_API_ROUTE}/api/v1/uploads`,
          {
            method: "POST",
            body: formData,
          },
        );
        const response = await res.json();
        console.log(response, "pictures");
        if (response) {
          console.log(response, "pictures");
          const newObj = {
            text: `${el?.name}, ${el?.size}, ${el?.type}, ${response?.data[0]?.uri}`,
            uri: response.data[0].uri,
          };
          setSelectedImgFiles([]);
          // const useSocket = SocketService;
          const socketService = new SocketService();
          if (activeChat?.spaceName) {
            await socketService.sendMessageSpace({
              spaceId: activeChat.uuid,
              data: newObj.text,
              doc: false,
              img: true,
            });
            onDone();
          } else {
            await socketService.sendMessage({
              uuid: activeChat.uuid,
              data: newObj.text,
              doc: false,
              img: true,
            });
            onDone();
          }
        }
      } catch (error) {
        console.error(error);
      }
    });

    await Promise.all(promises);
    setShowAttachment(false);
  };

  if (!showAttachment) {
    return null;
  }

  return (
    <>
      <div className="grid gap-y-3 bg-transparent absolute -mt-[7rem]">
        <Image
          src={docUpload}
          alt="upload-doc"
          className="drop-shadow-lg hover:cursor-pointer"
          height={45}
          width={45}
          onClick={() => docRef?.current?.click()}
        />
        <Image
          src={imageUpload}
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
          accept=".pdf, .docx"
          multiple
          onChange={handleDocumentChange}
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
      <DocumentsPreview
        selectedFiles={selectedFiles}
        removeFile={removeFile}
        closePreview={closePreview}
        uploadPreview={uploadFiles}
      />
    </>
  );
}

export default AttachmentPopups;
