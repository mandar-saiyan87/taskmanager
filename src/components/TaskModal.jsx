import React, { useState } from 'react'
import { Modal, DatePicker, SelectPicker } from 'rsuite';
import { useSelector, useDispatch } from 'react-redux'
import { addNewTask, rstMsgErr, getAlltasks } from '../store/taskSlice'
import Spinner from './Spinner';



const dropDown = ['todo', 'pending', 'in progress', 'completed', 'bug', 'blocked'].map(
  item => ({ label: item, value: item })
);

function TaskModal({ open, handleClose }) {

  const data = useSelector((state) => state.task)
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [start_date, setstartDate] = useState(new Date())
  const [due_date, setdueDate] = useState(new Date())
  const [status, setStatus] = useState('')

  const newTask = {
    title,
    description,
    start_date,
    due_date,
    status
  }

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(addNewTask(newTask))
    if (!data.error) {
      setTimeout(() => {
        dispatch(rstMsgErr())
        handleClose(false)
      }, 3000);
      setTitle('')
      setDescription('')
      setstartDate(new Date())
      setdueDate(new Date())
      setStatus('')
    }
  }

  return (
    <>
      <Modal overflow={true} open={open} onClose={() => handleClose(false)}>
        <Modal.Header>
          <Modal.Title>Add New</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {data.loading && <div className='flex items-center justify-center m-auto'>
            <Spinner size="35" color="#25005a" />
          </div>}
          {!data.loading && data.message ? <div>New Task Added Successfully</div> :
            <div className='mt-4 flex flex-col gap-5'>
              <input type="text" placeholder='Enter Task Title' value={title} className='max-w-[80%] p-2 border-[1px] border-slate-300 rounded-lg focus:outline-[#25005a] focus:rounded-lg' onChange={(e) => setTitle(e.target.value)} />
              <textarea name="description" id="" cols="30" rows="5" value={description} placeholder="Enter Task Description" className='w-[80%] p-2 border-[1px] border-slate-300 rounded-lg focus:outline-[#25005a] focus:rounded-lg' onChange={(e) => setDescription(e.target.value)}></textarea>
              <div className='flex items-center gap-5'>
                <div className='max-w-[40%]'>
                  <p>Start Date</p>
                  <DatePicker format="dd-MM-yyyy" oneTap onChange={(value) => setstartDate(value)} />
                </div>
                <div className='max-w-[40%]'>
                  <p>Due Date</p>
                  <DatePicker format="dd-MM-yyyy" oneTap onChange={(value) => setdueDate(value)} />
                </div>
              </div>
              <SelectPicker searchable={false} label="Status" data={dropDown} style={{ width: 224 }} onChange={(value) => setStatus(value)} value={status} />
            </div>
          }
          {data.error && <div className='flex items-center justify-center text-red-500 my-2'>{data.error.message}</div>}
        </Modal.Body>
        <Modal.Footer>
          {!data.loading && data.message ? '' :
            <div className='flex gap-4 items-center'>
              <button className='text-white bg-[#25005a] font-medium px-3 py-2 rounded-lg active:opacity-70' onClick={handleSubmit}>Save</button>
              <button className='bg-slate-300 font-medium px-3 py-2 rounded-lg active:opacity-70' onClick={() => handleClose(false)}>Cancel</button>
            </div>
          }

        </Modal.Footer>
      </Modal>
    </>
  )
}

export default TaskModal