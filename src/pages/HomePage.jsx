import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Spinner from '../components/Spinner'
import { useSelector, useDispatch } from 'react-redux'
import { getAlltasks, rstMsgErr } from "../store/taskSlice"
import TaskTable from '../components/TaskTable'
import TaskModal from '../components/TaskModal'
import MessageModal from '../components/MessageModal'

function HomePage() {

  const data = useSelector((state) => state.task)
  // console.log(data)
  const dispatch = useDispatch()

  const [taskModal, setTaskModal] = useState(false)
  const [modalmsg, setModalmsg] = useState(false)


  useEffect(() => {
    dispatch(getAlltasks())
    setTimeout(() => {
      dispatch(rstMsgErr())
    }, 2000);
  }, [dispatch])

  return (
    <>
      <Navbar />
      <div className='flex flex-col max-w-[1536px] py-2 px-5 m-auto min-h-screen'>
        <button className='text-white bg-[#25005a] text-sm rounded-md px-3 py-2 mt-4 max-w-max active:opacity-75' onClick={() => setTaskModal(true)}>+ Add New Task</button>
        <div className='max-w-7xl w-full mx-auto mt-12'>
          {data.loading && <div className='flex items-center justify-center m-auto'>
            <Spinner size="35" color="#25005a" />
          </div>
          }
          {!data.loading && data.error ? <div className='flex items-center justify-center m-auto'>{data.error.message}</div> : null}
          {!data.loading && data.tasks?.length > 0 ?
            (
              <TaskTable tableData={data.tasks} setOpen={setModalmsg} />
            ) :
            data.tasks?.length === 0 && <div className='w-full m-auto flex items-center justify-center'>No tasks to display for now!</div>
          }
        </div>
        {taskModal && <TaskModal open={taskModal} handleClose={setTaskModal} />}
        {modalmsg && <MessageModal isOpen={modalmsg} setOpen={ setModalmsg} />}

      </div>
    </>
  )
}

export default HomePage