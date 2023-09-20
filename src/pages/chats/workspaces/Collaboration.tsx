import React, { useEffect, useState } from "react";
import { Tab } from "../../../components/ui";
import UsersList from "../user";
import CollabService from "../../../services/collaborator.service";
import globalService from "../../../services";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import NotificationService from "../../../services/notification.service";
import {
  TabHeaderData,
  TableBodyData,
  TableBodyDataSup,
} from "@/utils/constants.workspace";

function Users() {
  const [userData, setUserData] = useState([]);
  const collabService = new CollabService();
  const userService = new globalService();
  const dispatch = useDispatch();
  const router = useRouter();
  const workSpaceId = router.query.id;

  useEffect(() => {
    const getUsers = () => {
      collabService
        .getWorspaceById("00cdaeff-7f7a-488c-8c3d-7ad5f94e421e")
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          // console.log(error)
          NotificationService.error({
            message: error?.error?.message,
          });
        });
    };
    getUsers();
  }, []);

  const TabBodyContents = [
    {
      id: 0,
      component: <UsersList tableData={TableBodyData} usertype={-1} />,
    },
    {
      id: 1,
      component: <UsersList tableData={userData} usertype={0} />,
    },
    {
      id: 2,
      component: <UsersList tableData={TableBodyData} usertype={1} />,
    },
    {
      id: 3,
      component: <UsersList tableData={[]} usertype={2} />,
    },
    {
      id: 4,
      component: <UsersList tableData={TableBodyData} usertype={3} />,
    },
    {
      id: 5,
      component: <UsersList tableData={TableBodyDataSup} usertype={4} />,
    },
  ];

  return (
    <>
      <div>
        <Tab
          tabHeaderContents={TabHeaderData}
          tabBodyContents={TabBodyContents}
        />
      </div>
    </>
  );
}

export default Users;
