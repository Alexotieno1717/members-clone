import React from 'react'
import { MembersEntity } from '../../../types/firms';
import { ColumnDef } from '@tanstack/react-table';
import Table from '../../components/Table'
import Export from '../../components/Export';

interface FirmsProps {
    firms?: MembersEntity;
    error?: { message: string };
  }

function Firms({firms, error}: FirmsProps) {

      if (error) {
        return <div className="text-center text-red-500 pt-32 text-2xl">Error loading data: {error.message}</div>;
      }

      // Assiging firms to data variable
      const data = firms;

      // eslint-disable-next-line react-hooks/rules-of-hooks
  const columns = React.useMemo<ColumnDef<MembersEntity>[]>(
    () => [
      {
        header: 'PSRA data',
        footer: (props) => props.column.id,
        columns: [
          {
            id: 'id', // Unique ID for the column
            header: 'No',
            cell:(props)=>{

              return props?.table?.getSortedRowModel()?.flatRows?.indexOf(props?.row)+1;
             }
          },
          {
            accessorKey: 'name',
            header: 'name',
            cell: (info) => info.getValue(),
            footer: (props) => props.column.id,
          },
          {
            header: 'registration number',
            accessorKey: 'registration_number',
            cell: (info) => info.getValue(),
            footer: (props) => props.column.id,
          },
        ],
      },
    ],
    [],
  );

  return (
    <main className="min-h-screen">
    <div className="flex justify-between p-6">
      <div>
        <h1 className='text-xl font-bold'>Firms Members Lists</h1>
      </div>
      <Export
        data={data}
        label="Firms"
        // disabled={data?data.length < 1 ? true : false}
      />
    </div>

    <Table columns={columns} data={data} />
  </main>
  )
}

export default Firms


export async function getServerSideProps() {
    try{
        // Fetch data from API
      const response = await fetch('http://165.22.46.7/psra/members/firms.php');
  
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }
      
      const data = await response.json();

      return {
        props: {
          firms: data.members || null,
        },
      };
    }catch (error) {
      console.error('Error fetching data:', error);
    
      return {
        props: {
          error: {
            message: 'An error occurred while fetching data.',
          },
        },
      };
    }
  }