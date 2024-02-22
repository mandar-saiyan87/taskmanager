import React from 'react'
import { Modal } from 'rsuite';

function TaskModal({ open, handleClose }) {
  return (
    <>
      <Modal overflow={true} open={open} onClose={() => handleClose(false)}>
        <Modal.Header>
          <Modal.Title>Add New</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            This is task modal
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className='flex gap-4 items-center'>
            <button className='text-white bg-[#25005a] font-medium px-3 py-2 rounded-lg active:opacity-70' onClick={() => { }}>Save</button>
            <button className='bg-slate-300 font-medium px-3 py-2 rounded-lg active:opacity-70' onClick={() => handleClose(false)}>Cancel</button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default TaskModal