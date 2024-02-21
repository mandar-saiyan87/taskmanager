import React, { useState } from 'react'
import { Table, Whisper, IconButton, Popover, Dropdown } from 'rsuite';
import MoreIcon from '@rsuite/icons/legacy/More';
import { format } from 'date-fns'

const { Column, HeaderCell, Cell } = Table;

const DateCell = ({ rowData, dataKey, ...props }) => (
  <Cell {...props}>
    <p>{format(new Date(rowData.start_date), 'dd-MM-yyyy')}</p>
  </Cell>
);

const StatusCell = ({ rowData, dataKey, ...props }) => {
  return (
    <Cell {...props}>
      {rowData.status === 'todo' ? (<div className={`bg-[#7CB9E8] px-2 py-1 max-w-max text-white text-xs rounded-md`}>{rowData.status}</div>) :
        rowData.status === 'pending' ? (<div className={`bg-black px-2 py-1 max-w-max text-white text-xs rounded-md`}>{rowData.status}</div>) :
          rowData.status === 'in progress' ? (<div className={`bg-[#bdbd44] px-2 py-1 max-w-max text-white text-xs rounded-md`}>{rowData.status}</div>) :
            rowData.status === 'blocked' ? (<div className={`bg-[#D32F2F] px-2 py-1 max-w-max text-white text-xs rounded-md`}>{rowData.status}</div>) :
              rowData.status === 'bug' ? (<div className={`bg-[#FFAB91] px-2 py-1 max-w-max text-white text-xs rounded-md`}>{rowData.status}</div>) :
                rowData.status === 'completed' && (<div className={`bg-[#33691E] px-2 py-1 max-w-max text-white text-xs rounded-md`}>{rowData.status}</div>)
      }
    </Cell>
  )
}

const renderMenu = ({ onClose, left, top, className }, ref) => {
  const handleSelect = eventKey => {
    onClose();
    console.log(eventKey);
  };
  return (
    <Popover ref={ref} className={className} style={{ left, top }} full>
      <Dropdown.Menu onSelect={handleSelect}>
        <Dropdown.Item eventKey={1}>Edit</Dropdown.Item>
        <Dropdown.Item eventKey={2}>Delete</Dropdown.Item>
      </Dropdown.Menu>
    </Popover>
  );
};

const ActionCell = ({ rowData, dataKey, ...props }) => {
  return (
    <Cell {...props} style={{ display: 'flex' }}>
      <Whisper placement="autoVerticalStart" trigger="click" speaker={renderMenu}>
        <IconButton appearance="subtle" icon={<MoreIcon />} />
      </Whisper>
    </Cell>
  );
};


function TaskTable({ tableData }) {

  const data = tableData

  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);

  const getData = () => {
    if (sortColumn && sortType) {
      return data.sort((a, b) => {
        console.log(new Date(a[sortColumn]))
      })
    }

    return data;
  };

  const handleSortColumn = (sortColumn, sortType) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSortColumn(sortColumn);
      setSortType(sortType);
    }, 500);
  };


  return (
    <>
      <div>
        <Table
          height={450}
          data={getData()}
          rowHeight={50}
          sortColumn={sortColumn}
          sortType={sortType}
          onSortColumn={handleSortColumn}
          loading={loading}
        >
          <Column width={150} align="center" resizable>
            <HeaderCell className='text-sm'>
              Status
            </HeaderCell>
            <StatusCell dataKey="status" />
          </Column>

          <Column width={400} resizable>
            <HeaderCell className='text-sm'>
              Title
            </HeaderCell>
            <Cell dataKey="title" />
          </Column>

          <Column width={250} resizable sortable>
            <HeaderCell className='text-sm'>
              Start Date
            </HeaderCell>
            <DateCell dataKey={'start_date'} />
          </Column>

          <Column width={250} resizable sortable>
            <HeaderCell className='text-sm'>
              Due Date
            </HeaderCell>
            <DateCell dataKey="due_date" />
          </Column>

          <Column width={250} resizable>
            <HeaderCell>
            </HeaderCell>
            <ActionCell dataKey="id" />
          </Column>
        </Table>
      </div>
    </>
  )
}

export default TaskTable