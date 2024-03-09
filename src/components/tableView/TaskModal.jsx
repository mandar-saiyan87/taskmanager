import React, { useEffect, useState } from 'react'
import { Modal, DatePicker, SelectPicker } from 'rsuite';
import { useSelector, useDispatch } from 'react-redux'
import { addNewTask, rstMsgErr, editTask } from '../../store/taskSlice'
import Spinner from '../Spinner';



const dropDown = ['todo', 'pending', 'in progress', 'completed', 'bug', 'blocked'].map(
  item => ({ label: item, value: item })
);

function TaskModal({ open, handleClose, currentTask }) {

  const data = useSelector((state) => state.task)
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [start_date, setstartDate] = useState(new Date(''))
  const [due_date, setdueDate] = useState(new Date(''))
  const [status, setStatus] = useState('')
  const [taskId, setTaskId] = useState(0)



  useEffect(() => {
    if (Object.keys(currentTask).length != 0) {
      setTaskId(currentTask.id)
      setTitle(currentTask.title)
      setDescription(currentTask.description)
      setstartDate(new Date(currentTask.start_date))
      setdueDate(new Date(currentTask.due_date))
      setStatus(currentTask.status)
    }
  }, [currentTask])


  const newTask = {
    title,
    description,
    start_date,
    due_date,
    status
  }

  // Create New Task function
  function handleSubmit(e) {
    e.preventDefault()
    dispatch(addNewTask(newTask))
    if (!data.error) {
      setTimeout(() => {
        dispatch(rstMsgErr())
        handleClose()
      }, 3000);
      setTitle('')
      setDescription('')
      setstartDate(new Date(''))
      setdueDate(new Date(''))
      setStatus('')
    }
  }

  // Update existing Task function
  function handleUpdate(e) {
    e.preventDefault()
    // console.log(newTask)
    dispatch(editTask({ taskId, newTask }))
    if (!data.error) {
      setTimeout(() => {
        dispatch(rstMsgErr())
        handleClose()
      }, 3000);
    }
  }

  function onCloseModal() {
    setTitle('')
    setDescription('')
    setstartDate(new Date(''))
    setdueDate(new Date(''))
    setStatus('')
    handleClose()
  }

  return (
    <>
      <Modal overflow={true} open={open} onClose={onCloseModal}>
        <Modal.Header>
          <Modal.Title>
            {Object.keys(currentTask).length === 0 ? 'Add New' : 'Edit Task'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            {data.loading && <div className='flex items-center justify-center m-auto'>
              <Spinner size="35" color="#25005a" />
            </div>}
            <>
              {!data.loading && data.message ? <div>{data.message}</div> :
                <div className='mt-4 flex flex-col gap-5'>
                  <input type="text" placeholder='Enter Task Title' value={title} className='max-w-[80%] p-2 border-[1px] border-slate-300 rounded-lg focus:outline-[#25005a] focus:rounded-lg' onChange={(e) => setTitle(e.target.value)} />
                  <textarea name="description" id="" cols="30" rows="5" value={description} placeholder="Enter Task Description" className='w-[80%] p-2 border-[1px] border-slate-300 rounded-lg focus:outline-[#25005a] focus:rounded-lg' onChange={(e) => setDescription(e.target.value)}></textarea>
                  <div className='flex items-center gap-5'>
                    <div className='max-w-[40%]'>
                      <p>Start Date</p>
                      <DatePicker format="dd-MM-yyyy" oneTap onChange={(value) => setstartDate(value)} value={start_date} />
                    </div>
                    <div className='max-w-[40%]'>
                      <p>Due Date</p>
                      <DatePicker format="dd-MM-yyyy" oneTap onChange={(value) => setdueDate(value)} value={due_date} />
                    </div>
                  </div>
                  <SelectPicker searchable={false} label="Status" data={dropDown} style={{ width: 224 }} onChange={(value) => setStatus(value)} value={status} />
                </div>
              }
            </>
          </div>
          {data.error && <div className='flex items-center justify-center text-red-500 my-2'>{data.error.message}</div>}
        </Modal.Body>
        <Modal.Footer>
          {!data.loading && data.message ? '' :
            <div className='flex gap-4 items-center'>
              {Object.keys(currentTask).length != 0 ? <button className='text-white bg-[#25005a] font-medium px-3 py-2 rounded-lg active:opacity-70' onClick={handleUpdate}>Update</button> :
                <button className='text-white bg-[#25005a] font-medium px-3 py-2 rounded-lg active:opacity-70' onClick={handleSubmit}>Save</button>
              }
              <button className='bg-slate-300 font-medium px-3 py-2 rounded-lg active:opacity-70' onClick={onCloseModal}>Cancel</button>
            </div>
          }

        </Modal.Footer>
      </Modal>
    </>
  )
}

export default TaskModal