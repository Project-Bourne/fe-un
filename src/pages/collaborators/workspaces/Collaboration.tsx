import React, { useState } from "react";
import { Tab } from "@/components/ui";
import {
  TabHeaderData,
  TableBodyData,
  TableBodyDataSup,
} from "../utils/constants";
import { UsersList } from "../user";

export const TabBodyContents = [
  {
    id: 0,
    component: <UsersList tableData={TableBodyData} usertype={-1} />,
  },
  {
    id: 1,
    component: <UsersList tableData={TableBodyData} usertype={0} />,
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

function Users() {
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
