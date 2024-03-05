import React, { useState, useEffect } from 'react'
import { Table, Whisper, IconButton, Popover, Dropdown, Pagination } from 'rsuite';
import MoreIcon from '@rsuite/icons/legacy/More';
import { format } from 'date-fns'
import { useDispatch } from 'react-redux'
import { deleteTask } from '../../store/taskSlice';

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


const ActionCell = ({ rowData, dataKey, handleDel, onOpen, openModal, ...props }) => {
  const renderMenu = ({ onClose, left, top, className }, ref) => {
    const handleSelect = eventKey => {
      onClose();
    };

    function handleDelete() {
      onOpen(true)
      handleDel(rowData.id)
      onClose()
    }

    function handleEdit() {
      openModal(rowData)
      onClose()
    }

    return (
      <Popover ref={ref} className={className} style={{ left, top }} full>
        <Dropdown.Menu onSelect={handleSelect}>
          <Dropdown.Item eventKey={1} onClick={handleEdit}>Edit</Dropdown.Item>
          <Dropdown.Item eventKey={2} onClick={handleDelete}>Delete</Dropdown.Item>
        </Dropdown.Menu>
      </Popover>
    );
  };

  return (
    <Cell {...props} style={{ display: 'flex' }}>
      <Whisper placement="autoVerticalStart" trigger="click" speaker={renderMenu}>
        <IconButton appearance="subtle" icon={<MoreIcon />} />
      </Whisper>
    </Cell>
  );
};


function TaskTable({ tableData, setOpen, taskOpen, currentTask }) {

  const dispatch = useDispatch()

  let data = tableData

  const [currentData, setCurrentData] = useState([...data])
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);
  const [currentStatus, setCurrentStatus] = useState('All')
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1)


  const handleChangeLimit = dataKey => {
    setPage(1);
    setLimit(dataKey);
  }

  const viewData = currentData.filter((v, i) => {
    const start = limit * (page - 1);
    const end = start + limit;
    return i >= start && i < end;
  });


  const handleSortColumn = (sortColumn, sortType) => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSortColumn(sortColumn);
      setSortType(sortType);
    }, 500);

    // console.log(sortColumn, sortType)
    if (sortColumn && sortType) {
      setLoading(true)
      return currentData.sort((a, b) => {
        let x
        let y
        if (sortColumn === 'start_date' || sortColumn === 'due_date') {
          x = new Date(a[sortColumn]);
          y = new Date(b[sortColumn]);
        } else {
          x = a[sortColumn];
          y = b[sortColumn];
        }
        if (typeof x === 'string') {
          x = x.charCodeAt();
        }
        if (typeof y === 'string') {
          y = y.charCodeAt();
        }
        if (sortType === 'asc') {
          return x - y;
        } else {
          return y - x;
        }
      })
    }
    // return currentData;
    setCurrentData([...currentData])
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

  function handleTaskDelete(id) {
    dispatch(deleteTask(id))
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
          height={400}
          data={viewData}
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
            <Cell className='hover:cursor-pointer'>
              {
                rowData => <div onClick={() => taskOpen(rowData)}>{rowData.title}</div>
              }
            </Cell>
          </Column>

          <Column width={200} resizable sortable>
            <HeaderCell className='text-sm'>
              Start Date
            </HeaderCell>
            <DateCell dataKey={'start_date'} />
          </Column>

          <Column width={200} resizable sortable>
            <HeaderCell className='text-sm'>
              Due Date
            </HeaderCell>
            <DateCell dataKey="due_date" />
          </Column>

          <Column width={150} resizable>
            <HeaderCell>
            </HeaderCell>
            <ActionCell dataKey="id" handleDel={handleTaskDelete} onOpen={setOpen} openModal={currentTask} />
          </Column>
        </Table>
        <div style={{ padding: 20 }}>
          <Pagination
            prev
            next
            first
            last
            ellipsis
            boundaryLinks
            maxButtons={5}
            size="sm"
            layout={['total', '-', 'limit', '|', 'pager', 'skip']}
            total={currentData.length}
            limitOptions={[10, 30, 50]}
            limit={limit}
            activePage={page}
            onChangePage={setPage}
            onChangeLimit={handleChangeLimit}
          />
        </div>
      </div>
    </>
  )
}

export default TaskTable