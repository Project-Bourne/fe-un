import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui";
import SocketService from "../../../socket/chat.socket";
import { useDispatch, useSelector } from "react-redux";
import socketio from "@/utils/socket";
import { setSingleDoc } from "@/redux/reducers/documents/documentReducer";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
function CreateDocument() {
  const [formData, setFormData] = useState({
    name: "",
  });
  const router = useRouter();
  const dispatch = useDispatch();
  const { userInfo, userAccessToken, refreshToken } = useSelector(
    (state: any) => state?.auth,
  );
  const [isDisabled, setIsDisabled] = useState(true);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (formData.name.length > 0) {
      setIsDisabled(false);
    }
  };
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      console.log("clicked1");
      const useSocket = SocketService;
      let docData = {
        name: formData?.name,
        author: {
          id: userInfo?.uuid,
          name: userInfo?.email,
        },
      };
      await useSocket.createDoc(docData);
      console.log("clicked2");
      socketio.on("load-doc", (res) => {
        console.log(res, "load");
        let data = JSON.parse(res);
        console.log("load-doc", data.data);
        dispatch(setSingleDoc(data.data));
        toast("Document Created", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        // router.push(`documents/${data?.data?._id}`);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center pb-3">
        <h1 className="text-3xl font-bold ml-5 text-black">Add a Document</h1>
        <p className="text-[14px] ml-5">
          Fill the details below to add a new Document
        </p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col mx-5">
        <label htmlFor="workName" className="text-sm text-gray-500">
          Name of Document
        </label>
        <input
          type="text"
          name="name"
          id="name"
          required
          className="border p-2 my-3 rounded-[.3rem]"
          value={formData.name}
          onChange={handleChange}
        />
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
                Add Document
              </div>
            }
          />
        </label>
      </form>
    </div>
  );
}

export default CreateDocument;
