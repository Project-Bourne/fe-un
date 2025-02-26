import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { useTruncate } from "@/components/custom-hooks";
import SocketService from "../../../socket/chat.socket";
import { useSelector } from "react-redux";

function EditableText({ initialText }) {
  const [text, setText] = useState(initialText);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };
  const { userInfo, userAccessToken, refreshToken } = useSelector(
    (state: any) => state?.auth,
  );
  const { singleDoc } = useSelector((state: any) => state?.docs);
  const handleSaveClick = async () => {
    if (!singleDoc) return;
    let docData = {
      id: singleDoc?._id,
      name: text,
      author: {
        id: userInfo?.uuid,
        name: userInfo?.email,
      },
    };
    const socketService = new SocketService();
    await socketService.updateDoc(docData);
    setIsEditing(false);
  };

  return (
    <div className="flex items-center space-x-4">
      {isEditing ? (
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="border rounded p-2"
          />
          <button
            onClick={handleSaveClick}
            className="text-sirp-primary hover:text-[#4AC7ED] cursor-pointer"
          >
            <SaveIcon sx={{ fontSize: 24 }} /> {/* Save icon */}
          </button>
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <span className="text-3xl text-[#1D2022] font-bold capitalize">
            {useTruncate(singleDoc?.name, 20)}
          </span>
          <button
            onClick={handleEditClick}
            className="text-sirp-primary p-1 hover:text-[#1D2022] cursor-pointer"
          >
            <EditIcon sx={{ fontSize: 20 }} /> {/* Edit icon */}
          </button>
        </div>
      )}
    </div>
  );
}

export default EditableText;
