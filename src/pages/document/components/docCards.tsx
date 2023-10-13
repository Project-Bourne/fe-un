import { CustomModal } from "../../../components/ui";
import AuthService from "@/services/auth.service";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import CollabService from "@/services/collaborator.service";
import DeleteModal from "@/components/ui/DeleteModal";
import { toast } from "react-toastify";

function DocCard({ docCardClick, data, isActive }: any) {
  const handleDocCardClick = (data) => {
    docCardClick(data);
  };
  const [showDeleteModal, setshowDeleteModal] = useState(false);
  // useEffect(() => {
  //   const fetchCollaborators = async () => {
  //     const docCollabPromises = data.collaborators.map(async (el) => {
  //       const user = await AuthService.getusersbyId(el.id);
  //       return user?.data;
  //     });

  //     const docCollaborators = await Promise.all(docCollabPromises);
  //     setUsers(docCollaborators);
  //     // console.log(docCollaborators, "docCollaborators");
  //   };
  //   fetchCollaborators();
  // }, []);

  const deleteDoc = async (e, id) => {
    e.stopPropagation();
    try {
      await CollabService.deleteDoc(id);
      toast("Deleted", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setshowDeleteModal(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = (e) => {
    e.stopPropagation();
    console.log("clicked");
    setshowDeleteModal(true);
  };

  return (
    <div
      onClick={() => handleDocCardClick(data._id)}
      className={
        isActive === data._id
          ? "bg-[#D1F1FA] border-[#4AC7ED] my-2 p-5 border-2 w-full cursor-pointer rounded-xl"
          : showDeleteModal
          ? "bg-[#D1F1FA] border-[#4AC7ED] my-2 p-5 border-2 w-full h-[300px] cursor-pointer rounded-xl"
          : "w-full cursor-pointer rounded-xl bg-[#F9F9F9] hover:bg-[#D1F1FA] h-[150px] hover:border-[#4AC7ED] my-2 p-5 border-2 border-grey-300"
      }
    >
      <div className="flex items-center align-middle justify-between">
        <span className="bg-white rounded-2xl border py-1 px-2 border-[#E8EAEC] text-[grey]">
          {data?.author?.name}
        </span>
        <DeleteIcon
          onClick={(e) => handleDelete(e)}
          style={{
            color: "#f72f35",
            background: "",
            padding: "5px",
            fontSize: "30px",
            borderRadius: "50%",
          }}
        />
      </div>
      <div className="w-full mt-2 text-[#322f2f]">{data.name}</div>
      {showDeleteModal && (
        <DeleteModal
          cancelblock={(e) => {
            e.stopPropagation();
            setshowDeleteModal(false);
          }}
          handleDelete={(e) => deleteDoc(e, data._id)}
          item={data}
        />
      )}
    </div>
  );
}

export default DocCard;
