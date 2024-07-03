/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  //   Table,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';
import Filter from './Filter';

interface ITableProps {
  columns: any;
  data: any;
}

export default function Table({ data, columns }: ITableProps) {
  const table = useReactTable({
    data,
    columns,
    // Pipeline
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    //
    debugTable: true,
  });

  if (!data || data.length === 0) {
    return <div className="p-8">No data Found</div>;
  }

  return (
    <div className="p-4">
      <div className="relative shadow-md sm:rounded-lg overflow-x-auto">
        <table id="react-table" className="w-full min-w-max table-auto text-left shadow-lg rounded-lg">
          <thead className="text-lg bg-gray-100 uppercase">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      colSpan={header.colSpan}
                    >
                      {header.isPlaceholder ? null : (
                        <div>
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {header.column.getCanFilter() ? (
                            <div>
                              <Filter column={header.column} table={table} />
                            </div>
                          ) : null}
                        </div>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => {
              return (
                <tr key={row.id} className="even:bg-blue-gray-50/50">
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id} className="px-1 py-4 whitespace-nowrap pl-2">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      <div className="h-2 pt-6" />
      <div className="flex gap-2 justify-between">
        <div className="flex pt-2 gap-4">
          <span className="flex items-center gap-1">
            <div>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </strong>
          </span>

          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
            className='border border-input h-10 px-4 py-2 justify-center whitespace-nowrap rounded-md text-md font-medium shadow-sm'
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>

        <div className="pt-3 flex gap-2">
          <button
            className="border border-input h-10 px-4 py-2 justify-center whitespace-nowrap rounded-md text-sm font-medium shadow-sm hover:bg-gray-100 transition-all ease-linear duration-200"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {'Start'}
          </button>
          <button
            className="border border-input h-10 px-4 py-2 justify-center whitespace-nowrap rounded-md text-sm font-medium shadow-sm hover:bg-gray-100 transition-all ease-linear duration-200"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {'Previous'}
          </button>
          <button
            className="border border-input h-10 px-4 py-2 justify-center whitespace-nowrap rounded-md text-sm font-medium shadow-sm hover:bg-gray-100 transition-all ease-linear duration-200"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {'Next'}
          </button>
          <button
            className="border border-input h-10 px-4 py-2 justify-center whitespace-nowrap rounded-md text-sm font-medium shadow-sm hover:bg-gray-100 transition-all ease-linear duration-200"
            // className="border rounded p-1 hover:bg-black hover:text-white transition-all ease-linear duration-200"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {'End'}
          </button>
        </div>


        {/* <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="border p-1 rounded w-16"
          />
        </span> */}
        
      </div>
      {/* <div className="pt-10">{table.getRowModel().rows.length} Rows</div>
      <pre>{JSON.stringify(table.getState().pagination, null, 2)}</pre> */}
    </div>
  );
}
