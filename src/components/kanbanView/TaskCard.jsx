import React, { useEffect, useState, useRef } from 'react'
import { format } from 'date-fns'
import { useDispatch } from 'react-redux'
import { deleteTask } from '../../store/taskSlice'



function TaskCard({ taskDetails, column, funcs }) {

  let colColor = ''

  switch (column) {
    case 'todo':
      colColor = '#4a62cc'
      break;

    case 'pending':
      colColor = 'black'
      break;

    case 'in progress':
      colColor = '#bdbd44'
      break;

    case 'blocked':
      colColor = '#D32F2F'
      break;

    case 'bug':
      colColor = '#FFAB91'
      break;

    case 'completed':
      colColor = '#33691E'
      break;

    default:
      colColor = 'white';
  }

  const { handleTaskModal, handleTaskDetails, handleDeleteTask, cardRef } = funcs

  const [options, setOptions] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    function handleDropdownClick(e) {
      if (cardRef.current && !cardRef.current.contains(e.target)) {
        setOptions(false)
      }
    }
    if (options) {
      document.addEventListener('click', handleDropdownClick)
    }
    return () => {
      document.addEventListener('click', handleDropdownClick)
    }
  })

  function handleOptions(e) {
    e.stopPropagation();
    setOptions(!options)
  }


  function handleEditTask(e) {
    e.stopPropagation()
    handleTaskModal(taskDetails)
    setOptions(false)
  }

  function handleDelete(e) {
    handleDeleteTask(taskDetails.id)
    setOptions(false)
  }


  return (
    <div
      className='w-full bg-white flex flex-col gap-4 rounded-md border-[1px] p-3 my-2.5 cursor-pointer'
      style={{ borderColor: `${colColor}` }}
      draggable
      onDoubleClick={() => handleTaskDetails(taskDetails)}
      ref={cardRef}
      onDragOver={(e) => e.preventDefault()}
      onDragStart={() => cardRef.current = taskDetails.id}
    >
      <div className='flex items-center justify-between'>
        <p className='font-semibold line-clamp-1'>{taskDetails.title}</p>
        <div className='flex flex-col items-center cursor-pointer max-w-max relative'>
          <div onClick={handleOptions}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </div>
          {options && <div className='absolute flex flex-col gap-1 bg-white py-2 border-[1px] shadow-md top-5 rounded-md'>
            <div className='flex items-center justify-center px-3 py-1 cursor-pointer hover:bg-blue-200 hover:text-blue-500' onClick={handleEditTask}>
              <p>Edit</p>
            </div>
            <div className='flex items-center justify-center px-3 py-1 cursor-pointer hover:bg-blue-200 hover:text-blue-500' onClick={handleDelete}>
              <p>Delete</p>
            </div>
          </div>}

        </div>
      </div>
      <p className='text-sm line-clamp-2'>{taskDetails.description}</p>
      <div className='grid grid-cols-2'>
        <div>
          <p className='font-medium text-sm'>Start Date: <br /><span>{format(new Date(taskDetails.start_date), 'dd-MM-yyyy')}</span></p>
        </div>
        <div>
          <p className='font-medium text-sm'>Due Date: <br /><span>{format(new Date(taskDetails.due_date), 'dd-MM-yyyy')}</span></p>
        </div>
      </div>
    </div>
  )
}

export default TaskCard