import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui";

const AddWorkspacePopUp = ({ onHandleModal }) => {
  const [formData, setFormData] = useState({
    workName: "",
    workspaceDescription: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    // You can perform additional actions here, like making an API call, etc.
    onHandleModal(); // Close the modal after form submission.
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <div className="flex flex-col gap-5 my-5">
        <h1 className="text-3xl font-bold ml-5 text-black">Add a workspace</h1>
        <p className="text-[14px] ml-5">
          Fill the details below to add a new workspace
        </p>
      </div>
      <div className="flex flex-col gap-5 my-5">
        <h1 className="text-1xl font-bold ml-5 text-black">
          Workspace details
        </h1>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col mx-5">
        <label htmlFor="workName" className="text-sm text-gray-500">
          Name of workspace
        </label>
        <input
          type="text"
          name="workName"
          id="workName"
          className="border p-2 my-3 rounded-[.3rem]"
          value={formData.workName}
          onChange={handleChange}
        />

        <label htmlFor="workspaceDescription" className="text-sm text-gray-500">
          Workspace description
        </label>
        <textarea
          name="workspaceDescription"
          id="workspaceDescription"
          placeholder="Location"
          maxLength={500}
          className="border p-2 my-3 rounded-[.3rem] h-[100px]"
          value={formData.workspaceDescription}
          onChange={handleChange}
        ></textarea>
        <div className="flex justify-center">
          <Button
            classNameStyle="flex gap-x-1 items-center text-center justify-center mt-10 hover:text-sirp-primary text-white text-[14px] hover:bg-sirp-primaryLess2 mb-5"
            size="lg"
            background="bg-sirp-primary"
            type="submit" // Set the type attribute to "submit" to trigger the form submission on button click
            value={
              <div className="flex gap-3 text-[1rem] items-center justify-center py-5">
                <label>Continue</label>
              </div>
            }
          />
        </div>
      </form>
    </div>
  );
};

export default AddWorkspacePopUp;
