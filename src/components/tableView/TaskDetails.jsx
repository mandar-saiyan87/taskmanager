import React from 'react'
import { Modal } from 'rsuite'
import { format } from 'date-fns'

function TaskDetails({ tskDetails, handleClose }) {
  return (
    <Modal overflow={true} open={open} onClose={() => handleClose(false)}>
      <Modal.Header>
        <Modal.Title className='mb-3'>{tskDetails.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='flex flex-col gap-6'>
          <div className=''>{tskDetails.description}</div>
          <div className='w-full flex items-center gap-10'>
            <div>Start Date: {format(new Date(tskDetails.start_date), 'dd-MM-yyyy')}</div>
            <div>Due Date: {format(new Date(tskDetails.due_date), 'dd-MM-yyyy')}</div>
          </div>
          <div className='flex gap-2 items-center'>Status: {
            tskDetails.status === 'todo' ? (<div className={`bg-[#7CB9E8] px-2 py-1 max-w-max text-white text-xs rounded-md`}>{tskDetails.status}</div>) :
              tskDetails.status === 'pending' ? (<div className={`bg-black px-2 py-1 max-w-max text-white text-xs rounded-md`}>{tskDetails.status}</div>) :
                tskDetails.status === 'in progress' ? (<div className={`bg-[#bdbd44] px-2 py-1 max-w-max text-white text-xs rounded-md`}>{tskDetails.status}</div>) :
                  tskDetails.status === 'blocked' ? (<div className={`bg-[#D32F2F] px-2 py-1 max-w-max text-white text-xs rounded-md`}>{tskDetails.status}</div>) :
                    tskDetails.status === 'bug' ? (<div className={`bg-[#FFAB91] px-2 py-1 max-w-max text-white text-xs rounded-md`}>{tskDetails.status}</div>) :
                      tskDetails.status === 'completed' && (<div className={`bg-[#33691E] px-2 py-1 max-w-max text-white text-xs rounded-md`}>{tskDetails.status}</div>)
          }</div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className='flex gap-4 items-center'>
          <button className='text-white bg-[#25005a] font-medium px-3 py-2 rounded-lg active:opacity-70' onClick={() => handleClose(false)}>Ok</button>
        </div>
      </Modal.Footer>
    </Modal>
  )
}

export default TaskDetails
