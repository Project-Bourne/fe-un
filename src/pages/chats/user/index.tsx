import { TableHeaderData } from "@/utils/constants.workspace";
import CustomTable from "../components/Table";

function UsersList({ tableData, usertype }) {
  return (
    <CustomTable
      tableHeaderData={TableHeaderData}
      tableBodyData={tableData}
      usertype={usertype}
    />
  );
}

export default UsersList;
