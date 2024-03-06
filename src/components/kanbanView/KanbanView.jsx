import React from 'react'
import { useSelector } from 'react-redux'
import Column from './Column'

function KanbanView({ handleTaskModal, handleTaskDetails, modalMsg }) {


  const data = useSelector((state) => state.task.tasks)

  const statusColumns = ['todo', 'pending', 'in progress', 'blocked', 'bug', 'completed']

  return (
    <div className='overflow-x-auto'>
      <div className='grid grid-cols-4 gap-4 mb-5'>
        {statusColumns.map((col) => (
          <Column taskdata={data} column={col} key={col} handleTaskModal={handleTaskModal} handleTaskDetails={handleTaskDetails} modalMsg={modalMsg} />
        ))}
      </div>
    </div>
  )
}

export default KanbanView