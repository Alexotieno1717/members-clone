/* eslint-disable @typescript-eslint/no-explicit-any */
import { CSVLink } from 'react-csv';

// jspdf
import jsPDF from 'jspdf';

// jspdf-auto table
import autoTable from 'jspdf-autotable';

// xlsx
import * as XLSX from 'xlsx';

import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { DocumentIcon } from '@heroicons/react/24/outline';

const Export = ({ data, label }: any) => {
  
  // function to export to pdf
  const exportPDF = () => {
    const doc = new jsPDF('landscape');

    //doc.autoTable({ html: "#react-table"})

    //doc.save(`${label}.pdf`)
    autoTable(doc, { html: '#react-table', tableWidth: 'wrap', horizontalPageBreak: true });
    doc.save(`${label}.pdf`);
  };

  // function to download Excel file
  const downloadExcel = (data: any) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, `${label}.xlsx`);
  };
  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className=" inline-flex w-full justify-center rounded-md bg-[#0A5F59] px-4 py-2 text-sm font-medium text-white hover:bg-[#0A5F59] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
            Export
            <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5 text-violet-200 hover:text-violet-100" aria-hidden="true" />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
      <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none z-50">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-[#0A5F59] text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <CSVLink data={data} filename={`${label}.csv`} className="flex gap-2 items-center">
                      <DocumentIcon className="w-6 h-6" />
                      Export to CSV
                    </CSVLink>
                  </button>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-[#0A5F59] text-white' : 'text-gray-900'
                    } group w-full rounded-md px-2 py-2 text-sm flex gap-2 items-center`}
                  >
                    <DocumentIcon className="w-6 h-6" />
                    <Link className="dropdown-item" href="#" onClick={() => downloadExcel(data)}>
                      <i className="bi bi-file-earmark-excel"></i> Export to Excel
                    </Link>
                  </button>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-[#0A5F59] text-white' : 'text-gray-900'
                    } group w-full rounded-md px-2 py-2 text-sm flex gap-2 items-center`}
                  >
                    <DocumentIcon className="w-6 h-6" />
                    <Link className="dropdown-item" href="#" onClick={() => exportPDF()}>
                      <i className="bi bi-file-earmark-excel"></i> Export to PDF
                    </Link>
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
};

export default Export;
