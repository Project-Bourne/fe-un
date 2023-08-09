import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/base/TablePagination";
import { TableFooter } from "@mui/material";
import { useEffect, useState } from "react";
import Link from "next/link";

// set number of items to be displayed per page
const calculateRange = (data, rowsPerPage) => {
  const range = [];
  const num = Math.ceil(data.length / rowsPerPage);
  let i = 1;
  for (let i = 1; i <= num; i++) {
    range.push(i);
  }
  return range;
};

const sliceData = (data, page, rowsPerPage) => {
  return data.slice((page - 1) * rowsPerPage, page * rowsPerPage);
};

function CustomTable({
  tableHeaderData,
  tableBodyData,
  usertype,
}) {
  const [page, setPage] = useState(1);



  // handle paginate buttons
  const handlePaginate = (
    type: string,
  ) => {
    if (type === "next") {
      // handle 'next' table data
    }
    if (type === "back") {
      // handle 'previous' table data
    }
  };



  return (
    <TableContainer component={Paper} className="shadow-sm border-r-0">
      <Table sx={{ minWidth: 650 }}>
        <TableHead className="bg-gray-100">
          <TableRow>
            {tableHeaderData?.map((title: string, index: number) => (
              <TableCell
                key={index}
                align={`${!title[0] ? "right" : "left"}`}
                scope="col"
              >
                {title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        {tableBodyData.length > 0 ? (
          <>
            <TableBody>
              {tableBodyData?.map((item) => (
                <TableRow key={item.uuid} className="hover:bg-gray-50">
                  <TableCell className="text-xs capitalize hover:cursor-pointer hover:underline">
                    <Link href={`users/${item.uuid}`}>{item.firstName} {item.lastName}</Link>
                  </TableCell>
                  <TableCell className="text-xs capitalize">
                    {item.role}
                  </TableCell>
                  <TableCell className=" text-xs capitalize">
                    {item.country}
                  </TableCell>
                  <TableCell align="right">
                    <div className="flex gap-x-[0.2rem] items-center">
                      <div
                        className={`rounded-full w-2 h-2 ${
                          item.status === "active"
                            ? "bg-green-600"
                            : "bg-[#EF4444]"
                        }`}
                      ></div>
                      <p className="text-xs">{item.status}</p>
                    </div>
                  </TableCell>
                  {usertype >= 0 ? (
                    <TableCell>
                      <div className="flex gap-x-3 items-center">
                        <button className="bg-transparent text-xs p-0 text-[#9F9036]">
                          Chat
                        </button>
                        <button className="bg-transparent text-xs p-0 text-[#9F9036]">
                          Call
                        </button>
                        <button className="bg-transparent text-xs p-0 text-sirp-primary">
                          Email
                        </button>
                      </div>
                    </TableCell>
                  ) : (
                    <TableCell>
                      <div className="flex gap-x-3 items-center">
                        <button className="bg-transparent border-b-2 border text-xs p-0 text-[#9F9036]">
                          Chat
                        </button>
                        <button className="bg-transparent text-xs p-0 text-[#9F9036]">
                          Call
                        </button>
                        <button className="bg-transparent text-xs p-0 text-sirp-primary">
                          Email
                        </button>
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={5}>
                  <div className="flex justify-end px-[5rem]">
                    {page > 1 && (
                      <>
                        <button onClick={() => handlePaginate("back")}>
                          &lt;
                        </button>{" "}
                        &nbsp;&nbsp;
                      </>
                    )}
                    Page {page} of {tableBodyData.length} &nbsp;&nbsp;
                    {page !== tableBodyData.length && (
                      <>
                        <button onClick={() => handlePaginate("next")}>
                          &gt;
                        </button>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            </TableFooter>
          </>
        ) : (
          <TableBody>
            <TableRow>
              <TableCell colSpan={5} className="p-5">
                No data available
              </TableCell>
            </TableRow>
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
}

export default CustomTable;
