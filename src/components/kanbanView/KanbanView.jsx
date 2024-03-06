import React, { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Column from './Column'
import TaskCard from './TaskCard'
import { editTask, rstMsgErr } from '../../store/taskSlice'

function KanbanView({ handleTaskModal, handleTaskDetails, modalMsg }) {


  const data = useSelector((state) => state.task.tasks)

  const dispatch = useDispatch()

  const cardRef = useRef(null);

  const statusColumns = ['todo', 'pending', 'in progress', 'blocked', 'bug', 'completed']

  function handleDrop(taskId, status) {
    const cardTask = data.filter((currenttask) => currenttask.id === taskId)
    if (cardTask[0].status != status) {
      const newTask = { ...cardTask[0], status: status }
      modalMsg(true)
      dispatch(editTask({ taskId, newTask }))
      if (!data.error) {
        setTimeout(() => {
          dispatch(rstMsgErr())
        }, 3000);
      }
    }

  }

  return (
    <div className='overflow-x-auto'>
      <div className='grid grid-cols-4 gap-4 mb-5'>
        {statusColumns.map((col) => (
          <Column column={col} key={col} props={{ cardRef, handleDrop }}>
            {data.filter((task) => task.status === col).map((item) => (
              <TaskCard taskDetails={item} funcs={{ handleTaskModal, handleTaskDetails, cardRef, modalMsg }} key={item.id} />
            ))}
          </Column>
        ))}
      </div>
    </div>
  )
}

export default KanbanView