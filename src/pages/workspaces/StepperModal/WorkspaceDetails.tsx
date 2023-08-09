import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui";
import { Stages } from "../components";
import CollabService from "@/services/collaborator.service";
import { useDispatch } from "react-redux";
import { setSpace } from "@/redux/reducers/workspaceReducer";

function WorkspaceDetails(props) {
  const service = new CollabService();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    workName: "",
    workspaceDescription: "",
  });
  const [isDisabled, setIsDisabled] = useState(true)

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (formData.workName.length > 0 && formData.workspaceDescription.length > 0) {
      setIsDisabled(false);
    }
  };
  const { stages, index, setIndex } = props;

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      dispatch(setSpace(formData));
      setIndex(index + 1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-5 my-5">
        <h1 className="text-1xl font-bold ml-5 text-black">
          <Stages steps={stages} step={index} />
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
          required
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
          required
          maxLength={500}
          className="border p-2 my-3 rounded-[.3rem] h-[100px]"
          value={formData.workspaceDescription}
          onChange={handleChange}
        ></textarea>
        <label
          htmlFor="submitButton"
          className="text-sm flex justify-center text-gray-500"
        >
          <Button
            classNameStyle="flex gap-x-1 items-center text-center justify-center mt-10 hover:text-sirp-primary text-white text-[14px] hover:bg-sirp-primaryLess2 mb-5"
            size="lg"
            disabled={isDisabled}
            background="bg-sirp-primary"
            type="submit"
            value={
              <div className="flex gap-3 text-[1rem] items-center justify-center py-5">
                Continue
              </div>
            }
          />
        </label>
      </form>
    </div>
  );
}

export default WorkspaceDetails;
