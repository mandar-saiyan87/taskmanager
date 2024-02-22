import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Spinner from '../components/Spinner'
import { useSelector, useDispatch } from 'react-redux'
import { getAlltasks } from "../store/taskSlice"
import TaskTable from '../components/TaskTable'
import TaskModal from '../components/TaskModal'

function HomePage() {

  const data = useSelector((state) => state.task)
  const dispatch = useDispatch()

  const [taskModal, setTaskModal] = useState(false)

  useEffect(() => {
    dispatch(getAlltasks())
  }, [])

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
          {!data.loading && data.error ? <div>{data.error.message}</div> : null}
          {!data.loading && !data.error && data.tasks.taskList?.length > 0 ?
            (
              <TaskTable tableData={data.tasks.taskList} />
            )
            : data.tasks.taskList?.length === 0 && <div>No tasks to display for now!</div>
          }
        </div>
        {taskModal && <TaskModal open={taskModal} handleClose={setTaskModal}/>}

      </div>
    </>
  )
}

export default HomePage