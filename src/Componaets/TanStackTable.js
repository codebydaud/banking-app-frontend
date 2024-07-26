import React, { useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";

const TanStackTable = ({ data }) => {
  const columnHelper = createColumnHelper();
  const navigate = useNavigate();

  const columns = [
    columnHelper.accessor("accountNumber", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Account Number",
    }),
    columnHelper.accessor("balance", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Balance",
    }),
    columnHelper.accessor("id", {
      // Assuming 'id' is a unique identifier for rows
      cell: (info) => {
        const accountNumber = info.row.original.accountNumber; // Accessing accountNumber directly
        console.log("Account Number:", accountNumber); // Debugging statement

        return (
          <div>
            <button
              onClick={() => {
                console.log(
                  "Navigating to:",
                  `/admin/profile/${accountNumber}`
                ); // Debugging statement
                navigate(`/admin/profile/${accountNumber}`);
              }}
              className="text-blue-500 hover:underline"
            >
              View
            </button>
            <button className="text-blue-500 hover:underline ml-2">Edit</button>
            <button className="text-red-500 hover:underline ml-2">
              Delete
            </button>
          </div>
        );
      },
      header: "Actions",
    }),
    // Add more columns as needed
  ];

  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="pt-4 min-h-screen bg-gray-900">
      <div className="p-2 max-w-5xl mx-auto text-white fill-gray-400">
        <table className="border border-gray-700 w-full text-left">
          <thead className="bg-indigo-600">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="capitalize px-3.5 py-2">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row, i) => (
                <tr
                  key={row.id}
                  className={`${i % 2 === 0 ? "bg-gray-900" : "bg-gray-800"}`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-3.5 py-2">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr className="text-center h-32">
                <td colSpan={columns.length}>No Record Found!</td>
              </tr>
            )}
          </tbody>
        </table>
        {/* Pagination */}
        <div className="flex items-center justify-end mt-2 gap-2">
          <button
            onClick={() => {
              table.previousPage();
            }}
            disabled={!table.getCanPreviousPage()}
            className="p-1 border border-gray-300 px-2 disabled:opacity-30"
          >
            {"<"}
          </button>
          <button
            onClick={() => {
              table.nextPage();
            }}
            disabled={!table.getCanNextPage()}
            className="p-1 border border-gray-300 px-2 disabled:opacity-30"
          >
            {">"}
          </button>
          <span className="flex items-center gap-1">
            <div>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </strong>
          </span>
          <span className="flex items-center gap-1">
            | Go to page:
            <input
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="border p-1 rounded w-16 bg-transparent"
            />
          </span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
            className="p-2 bg-transparent"
          >
            {[10, 20, 30, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default TanStackTable;
