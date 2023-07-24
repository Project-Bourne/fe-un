import { CustomTable } from "../components";
import { TableHeaderData } from "../utils/constants";

function UsersList({ tableData, usertype }) {
  return (
    <CustomTable
      tableHeaderData={TableHeaderData}
      tableBodyData={tableData}
      rowsPerPage={10}
      usertype={usertype}
    />
  );
}

export { UsersList };
