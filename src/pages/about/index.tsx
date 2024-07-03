import React, { useEffect, useState } from 'react';
import { PulseLoader } from 'react-spinners';
import { MembersEntity } from '../../../types';

export default function About() {
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [members, setMembers] = useState<MembersEntity[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [totalFilteredRecords, setTotalFilteredRecords] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>(''); 
  const recordsPerPage = 200;

  useEffect(() => {
    const fetchMembers = async () => {
      setIsLoading(true);

      try {
        let apiUrl = 'api/members';

        const queryParams = new URLSearchParams();
        if (searchValue !== '') {
          queryParams.append('security_firm_name', searchValue);
        }
        queryParams.append('page', currentPage.toString());
        apiUrl += `?${queryParams}`;

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        setMembers(data.members);
        setTotalRecords(data.total_records);
        setTotalFilteredRecords(data.filtered_records);
        setTotalPages(Math.ceil(data.filtered_records / recordsPerPage));
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMembers();
  }, [currentPage, searchValue]);

  const handleFilter = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim(); // Trim the input value
    setSearchValue(value); // Update searchValue state
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  if (error) {
    return <div>Something went wrong! Please try again.</div>;
  }

  return (
    <div className="min-h-screen px-6 py-6">
      <div className="grid grid-cols-3 gap-8">
        <div className="border border-gray-200 p-6 rounded-xl"> 
            <h1 className='text-sm'>Total Number of Users :</h1>
            <p className='text-3xl font-semibold pt-2'>{totalRecords}</p>
        </div>
        <div className="border border-gray-200 p-6 rounded-xl">
            <h1 className='text-sm'>Total Filtered Records:</h1>
            <p className='text-3xl font-semibold pt-2'>{totalFilteredRecords}</p>
            </div>
        <div className="border border-gray-200 p-6 rounded-xl">Subtotal number of Users</div>
      </div>

      <div className="flex justify-end py-8 gap-4">
        <form onSubmit={e => e.preventDefault()} className="flex">
          <input
            type="text"
            name="search"
            className="border w-96 h-11 border-[#D0D5DD] py-2 px-2 rounded-md"
            placeholder="Search for firm or id"
            onChange={handleFilter}
          />
        </form>
        <button
          type="submit"
          className="flex items-center border border-input px-4 py-2 gap-2 whitespace-nowrap rounded-md text-sm font-medium shadow-sm hover:bg-gray-100"
          disabled={totalPages === 1 || members.length === 0}
          onClick={handleNextPage}
        >
          <img src="download-cloud-02.png" alt="Icon" />
          Export
        </button>
      </div>

      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="flex justify-center items-center h-screen ">
            <h1 className="p-4">Loading data</h1>
            <div>
              <PulseLoader />
            </div>
          </div>
        ) : (
          <table className="w-full min-w-max table-auto text-left shadow-lg rounded-md">
            <thead className="text-lg bg-gray-100 uppercase">
              <tr>
                <th className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">id number</th>
                <th className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">first name</th>
                <th className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">other name</th>
                <th className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">surname</th>
                <th className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">id serial no</th>
                <th className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">County</th>
                <th className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">security firm name</th>
                <th className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">tel no</th>
                <th className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registered on</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {members && members.map((member, index) => (
                <tr className="even:bg-blue-gray-50/50" key={index}>
                  <td className="px-1 py-4 whitespace-nowrap pl-2">{member.id_number}</td>
                  <td className="px-1 py-4 whitespace-nowrap pl-2">{member.first_name}</td>
                  <td className="px-1 py-4 whitespace-nowrap pl-2">{member.other_name}</td>
                  <td className="px-1 py-4 whitespace-nowrap pl-2">{member.surname}</td>
                  <td className="px-1 py-4 whitespace-nowrap pl-2">{member.id_serial_no}</td>
                  <td className="px-1 py-4 whitespace-nowrap pl-2">{member.County}</td>
                  <td className="px-1 py-4 whitespace-nowrap pl-2">{member.security_firm_name}</td>
                  <td className="px-1 py-4 whitespace-nowrap pl-2">{member.tel_no}</td>
                  <td className="px-1 py-4 whitespace-nowrap pl-2">{member.inserted_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="flex justify-between items-center mt-6">
        <div className="font-medium text-sm leading-5">Page {currentPage} of {totalPages}</div>
        <div className="flex space-x-2">
        <button
          onClick={handlePreviousPage}
          className="border border-input h-10 px-4 py-2 justify-center whitespace-nowrap rounded-md text-sm font-medium shadow-sm hover:bg-gray-100"
          // disabled={currentPage === 1 || isLoading} // Disable if on first page or data is loading
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          className="border border-input h-10 px-4 py-2 justify-center whitespace-nowrap rounded-md text-sm font-medium shadow-sm hover:bg-gray-100"
          // disabled={currentPage === totalPages || isLoading} // Disable if on last page or data is loading
        >
          Next
        </button>

        </div>
      </div>
    </div>
  );
}
