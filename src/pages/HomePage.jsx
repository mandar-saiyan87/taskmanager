import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Spinner from '../components/Spinner'
import { useSelector, useDispatch } from 'react-redux'
import { getAlltasks, rstMsgErr, setView } from "../store/taskSlice"
import TaskTable from '../components/tableView/TaskTable'
import TaskModal from '../components/tableView/TaskModal'
import MessageModal from '../components/tableView/MessageModal'
import TaskDetails from '../components/tableView/TaskDetails'
import KanbanView from '../components/kanbanView/KanbanView'



function HomePage() {

  const data = useSelector((state) => state.task)
  // console.log(data)
  const dispatch = useDispatch()

  const [taskModal, setTaskModal] = useState(false)
  const [modalmsg, setModalmsg] = useState(false)
  const [taskDetails, setTaskDetails] = useState(false)
  const [task, setTask] = useState({})

  // Open Modal Add new Task
  function handleaddNew(e) {
    e.preventDefault()
    setTaskModal(true)
  }

  // Open Modal Details od Selected Task
  function handleTaskDetails(task) {
    setTask(task)
    setTaskDetails(true)
    // console.log(task)
  }

  // Open Modal Edit task
  function handleTaskModal(task) {
    setTask(task)
    setTaskModal(true)
  }

  // Close modal
  function handleCloseTask() {
    setTask({})
    setTaskModal(false)
  }


  useEffect(() => {
    dispatch(getAlltasks())
    setTimeout(() => {
      dispatch(rstMsgErr())
    }, 2000);
  }, [dispatch])

  return (
    <>
      <div className='fixed w-full bg-white top-0 md:hidden'>
        <Navbar />
        <div className='max-w-[1536px] flex items-center justify-between mt-4 mx-auto px-5'>
          <button className='text-white bg-[#25005a] text-sm rounded-md px-3 py-2 max-w-max active:opacity-75' onClick={handleaddNew}>+ Add New Task</button>
          <div className='cursor-pointer' onClick={() => dispatch(setView())}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125Z" />
            </svg>
          </div>
        </div>
      </div>
      <div className='hidden md:block'>
        <Navbar />
        <div className='max-w-[1536px] flex items-center justify-between mt-4 mx-auto px-5'>
          <button className='text-white bg-[#25005a] text-sm rounded-md px-3 py-2 max-w-max active:opacity-75' onClick={handleaddNew}>+ Add New Task</button>
          <div className='cursor-pointer' onClick={() => dispatch(setView())}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125Z" />
            </svg>
          </div>
        </div>
      </div>
      <div className='mt-20 md:mt-0 flex flex-col max-w-[1536px] px-5 mx-auto min-h-screen'>
        {data.viewType ?
          <div className='max-w-7xl w-full mx-auto'>
            {data.loading && <div className='flex items-center justify-center m-auto'>
              <Spinner size="35" color="#25005a" />
            </div>
            }
            {!data.loading && data.error ? <div className='flex items-center justify-center m-auto'>{data.error.message}</div> : null}
            {!data.loading && data.tasks?.length > 0 ?
              (
                <TaskTable tableData={data.tasks} setOpen={setModalmsg} taskOpen={handleTaskDetails} currentTask={handleTaskModal} />
              ) :
              data.tasks?.length === 0 && <div className='w-full m-auto flex items-center justify-center'>No tasks to display for now!</div>
            }

          </div> :
          <div className='w-[1500px] mx-auto mt-12 px-5 overflow-hidden'>
            {data.loading && <div className='flex items-center justify-center m-auto'>
              <Spinner size="35" color="#25005a" />
            </div>
            }
            {!data.loading && data.error ? <div className='flex items-center justify-center m-auto'>{data.error.message}</div> : null}
            {!data.loading && data.tasks?.length > 0 ?
              (
                <KanbanView handleTaskModal={handleTaskModal} handleTaskDetails={handleTaskDetails} modalMsg={setModalmsg} />
              ) :
              data.tasks?.length === 0 && <div className='w-full m-auto flex items-center justify-center'>No tasks to display for now!</div>
            }
          </div>
        }

        {taskModal && <TaskModal open={taskModal} handleClose={handleCloseTask} currentTask={task} />}
        {modalmsg && <MessageModal isOpen={modalmsg} setOpen={setModalmsg} />}
        {taskDetails && <TaskDetails tskDetails={task} handleClose={setTaskDetails} />}
      </div>
    </>
  )
}

export default HomePage