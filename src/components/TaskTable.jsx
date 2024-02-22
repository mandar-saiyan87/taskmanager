import React, { useState, useEffect } from 'react'
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

  let data = tableData

  const [currentData, setCurrentData] = useState([...data])
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);
  const [currentStatus, setCurrentStatus] = useState('All')


  const getData = () => {
    if (sortColumn && sortType) {
      return currentData.sort((a, b) => {
        const dateA = new Date(a[sortColumn]);
        const dateB = new Date(b[sortColumn]);
        if (sortType === 'asc') {
          return dateA - dateB;
        } else {
          return dateB - dateA;
        }
      })
    }
    return currentData;
  };

  const handleSortColumn = (sortColumn, sortType) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSortColumn(sortColumn);
      setSortType(sortType);
    }, 500);
  };

  function setStatusData(cstate) {
    if (cstate !== 'All') {
      const newData = data.filter((task) => (
        task.status === cstate
      ))
      setCurrentData([...newData])
    }
    else {
      setCurrentData([...data])
    }
  }


  return (
    <>
      <div>
        <div className='flex items-center mb-7 gap-4'>
          <p>Status:</p>
          <Dropdown title={currentStatus} onSelect={(e) => {
            setCurrentStatus(e)
            setStatusData(e)
          }}>
            <Dropdown.Item eventKey={"All"}>All</Dropdown.Item>
            <Dropdown.Item eventKey={"todo"}>todo</Dropdown.Item>
            <Dropdown.Item eventKey={"pending"}>pending</Dropdown.Item>
            <Dropdown.Item eventKey={"in progress"}>in progress</Dropdown.Item>
            <Dropdown.Item eventKey={"completed"}>completed</Dropdown.Item>
            <Dropdown.Item eventKey={"bug"}>bug</Dropdown.Item>
            <Dropdown.Item eventKey={"blocked"}>blocked</Dropdown.Item>
          </Dropdown>
        </div>

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

          <Column width={150} resizable>
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