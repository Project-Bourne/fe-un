import React, { useState } from "react";
import Image from "next/image";
import FileUploadSection from "./fileUpload";
import { Button } from "@/components/ui";
import { useRouter } from "next/router";
import UploadfromCollab from "./UploadfromCollab";
import Stages from "../components/Stepper";

const AddConten = (props) => {
  const { stages, index, setIndex } = props;
  const [formData, setFormData] = useState("");
  const [file, setFile] = useState(null);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showReader, setShowReader] = useState(false);
  const [showCollabUpload, setShowCollabUpload] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setFormData(value);
    console.log("Form Data:", value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the form from submitting via default behavior
    setFormData("");
    console.log("Form submitted:", formData); // Do whatever you want with the form data here
  };

  const handleDeleteFile = () => {
    setFile(null);
    setIsFileUploaded(false);
  };

  const handleFileUpload = (e) => {
    e.preventDefault();
    const selectedFile = e.target.files[0]; // Get the first file from the array
    const formData = new FormData();
    formData.append("file", selectedFile);
    console.log(formData, "formdata");
    setFile(selectedFile);
    if (selectedFile) {
      setIsFileUploaded(true);
    }
  };
  const goBack = () => {
    setIndex(index - 1);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    setFile(droppedFile);
    if (droppedFile) {
      setIsFileUploaded(true);
    }
  };

  const handleClearInput = () => {
    setFormData("");
  };

  const uploadFromCollabDocument = () => {
    console.log("upload from collab document");
    setShowCollabUpload(true);
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center pb-3">
        <h1 className="text-3xl font-bold ml-5 text-black">Add Document</h1>
        <p className="text-[14px] ml-5">
          Fill the details below to add a new workspace
        </p>
      </div>
      <Stages steps={stages} step={index} />
      <div className="m-5">
        {isFileUploaded && !showReader ? (
          <FileUploadSection
            file={file}
            handleDeleteFile={handleDeleteFile}
            isLoading={isLoading}
          />
        ) : showCollabUpload ? (
          <UploadfromCollab /> // This is the component that will be rendered when the user clicks the "Select from collab documents" button
        ) : (
          <>
            <div
              className="flex my-5 mx-5 cursor-pointer gap-2"
              // onClick={uploadFromCollabDocument}
              onClick={goBack}
            >
              <Image
                src={require("../../../../public/icons/arrow-narrow-left-blue.svg")}
                alt="upload image"
                width={20}
                height={20}
                priority
              />
              <span className="text-sirp-primary text-sm">Back</span>
              {/* <span className="text-sirp-primary text-sm">
                Select from collab documents
              </span> */}
            </div>

            <form onSubmit={handleSubmit}>
              <div className="flex align-middle w-full border-2 rounded-full border-[#E5E7EB]-500  border-dotted">
                <span className="flex align-middle justify-center mx-3">
                  <Image
                    src={require("../../../../public/icons/link.svg")}
                    alt="upload image"
                    width={20}
                    height={20}
                    priority
                  />
                </span>
                <input
                  placeholder="Copy and paste link here"
                  className="py-5 w-[95%] bg-sirp-secondary2 outline-none focus:ring-0"
                  value={formData}
                  onChange={handleChange}
                />
                <span className="flex align-middle justify-center mx-3">
                  <Image
                    className="flex align-middle justify-center font-light text-[#A1ADB5] cursor-pointer"
                    src={require("../../../../public/icons/x.svg")}
                    alt="upload image"
                    width={20}
                    height={20}
                    onClick={handleClearInput}
                  />
                </span>
              </div>
            </form>
            {/* the is the handle drag and drop section */}
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className="h-[30vh] mt-5 flex align-middle w-full justify-center border rounded-[30px] border-[#E5E7EB]"
            >
              <div className="flex flex-col align-middle justify-center">
                <span className="flex align-middle justify-center mx-3">
                  <Image
                    className="flex align-middle justify-center"
                    src={require("../../../../public/icons/cloud.svg")}
                    alt="upload image"
                    width={25}
                    height={25}
                    priority
                  />
                </span>
                <span className="font-normal text-[#383E42]">
                  <input
                    id="file-upload"
                    type="file"
                    accept=".txt,.rtf,.doc,.pdf,.jpeg,"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                  <label
                    className="text-blue-400 cursor-pointer"
                    htmlFor="file-upload"
                  >
                    Upload a file
                  </label>{" "}
                  or drag and drop
                </span>
                <span className="font-light  text-[#383E42]">
                  TXT, RFT, DOC, PDF up to 5MB
                </span>
              </div>
            </div>

            {/* this are the two button  */}
            <div className="flex items-center gap-5 justify-center mt-[2.2rem] md:w-[40rem] w-full">
              <Button
                classNameStyle="flex gap-x-1 items-center text-center justify-center mt-2 hover:text-sirp-primary text-white text-sm hover:bg-sirp-primaryLess2 mb-1"
                size="lg"
                background="bg-sirp-primary"
                type="submit"
                value={
                  <div className="flex gap-3 text-[1rem] items-center justify-center py-5">
                    Create workspace
                  </div>
                }
              // disabled
              />
              {/* <Button
                classNameStyle="flex border iteam-center justify-center text-center border-sirp-primary gap-x-1 items-center mt-2 mb-1 cursor-pointer rounded-[1rem]"
                size="sm"
                background="bg-white"
                value={
                  <div className="flex gap-3 text-[1rem] text-sirp-primary items-center justify-center py-4">
                    Skip
                  </div>
                }
              /> */}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AddConten;
