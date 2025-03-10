import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import InviteCollaborators from "./InviteCollaborators";
import { useDispatch, useSelector } from "react-redux";
import { AddNewChat } from "@/redux/reducers/chat/chatReducer";
import chatEmpty from "../../../public/icons/chat.empty.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import SocketService from "../../socket/chat.socket";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { toast } from "react-toastify";
import socketio from "@/utils/socket";
import { userInfo } from "os";
import CollabService from "@/services/collaborator.service";
import { useEffect } from "react";
import { setSingleDoc } from "@/redux/reducers/documents/documentReducer";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function CollabModal({ users, setShowCollabModal }) {
  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch();
  const router = useRouter();
  const { pathname } = router;
  const { allWorkspaceByUser } = useSelector((state: any) => state?.chats);
  const { singleDoc } = useSelector((state: any) => state?.docs);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const [collaborators, setCollaborators] = React.useState([]);

  useEffect(() => {
    setCollaborators(singleDoc?.collaborators);
  }, [singleDoc]);

  const removeCollaborator = async (event, userId) => {
    event.stopPropagation();
    if (pathname.includes("/documents/")) {
      console.log("REM: ", userId);
      // const useSocket = SocketService;
      const socketService = new SocketService();
      await socketService.leaveDocument({
        docId: singleDoc._id,
        collabId: userId,
      });

      await socketio.once("collab-removed", (res) => {
        console.log(res, "load");
        let data = JSON.parse(res);
        console.log("collab-removed", data.data);
        const socketService = new SocketService();
        socketService.getDoc({ id: data._id });
        dispatch(setSingleDoc(data.data));
      });

      // toast("Collaborator Removed", {
      //   position: "bottom-right",
      //   autoClose: 2000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "light",
      // });
    }
    if (pathname.includes("/chats")) {
      try {
        await CollabService.deleteCollab(userId);
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
      } catch (error) {
        console.log(error);
      }
    }
  };

  const { userInfo, userAccessToken, refreshToken } = useSelector(
    (state: any) => state?.auth,
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Add Collaborators" {...a11yProps(0)} />
          <Tab label="View Collaborators" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <InviteCollaborators setShowCollabModal={setShowCollabModal} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {collaborators && collaborators?.length > 0 ? (
          <ul className="h-[50vh] overflow-y-auto">
            {collaborators?.map((el) => (
              <li
                className="flex items-center gap-x-4 hover:cursor-pointer hover:bg-slate-100 rounded-md mb-1 px-3 py-2.5 bg-sirp-primaryLess2 border-x-sirp-grey"
                key={el?.uuid}
              >
                {/* <div className=""> */}
                <div className="flex items-center justify-between w-full">
                  <div className="flex gap-x-5 items-center relative">
                    <div
                      className={`absolute md:ml-9 ml-[1.75rem] mt-[0.07rem] z-10 h-[12px] w-[12px] rounded-full  ${
                        el?.onlineStatus == 1
                          ? "bg-sirp-online"
                          : "bg-yellow-300"
                      }`}
                    ></div>
                    <div
                      className={`rounded-full p-[2.5px] ${
                        el?.onlineStatus == 1
                          ? "bg-sirp-offline"
                          : "bg-gradient-to-r from-red-300 to-yellow-200 "
                      }`}
                    >
                      <img
                        src={el?.image || "/images/logo.png"}
                        alt={"user"}
                        className="rounded-full border-[2px] border-white md:h-[43px] h-[30px] md:w-[43px] w-[30px]"
                      />{" "}
                      {/* eslint-disable-next-line */}
                    </div>
                    <div className="tex-gray-400">
                      {/* </div> */}
                      <p className="text-[14px] font-bolder text-black capitalize">
                        {`${el?.name || el?.id}`.toLowerCase()}
                      </p>
                      {el?.email && (
                        <span className="capitalize">
                          {el.email && `${el?.email}`.toLowerCase()}
                        </span>
                      )}
                    </div>
                  </div>
                  <RemoveCircleIcon
                    style={{ color: "#f72f35" }}
                    onClick={(e) => removeCollaborator(e, el?.id)}
                  />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="grid gap-y-10 mt-[2rem] md:mt-[5rem]">
            <div className="mx-auto">
              <Image src={chatEmpty} alt="empty-chats" />
            </div>
            <div className="grid gap-y-5 text-center">
              <div className="md:w-[20%] w-[80%] mx-auto grid gap-y-2">
                <h3 className="text-[17px] font-semibold">
                  No Collaborator to show
                </h3>
              </div>
            </div>
          </div>
        )}
      </CustomTabPanel>
    </Box>
  );
}
