import React from 'react'
import { Modal } from 'rsuite'
import Spinner from '../Spinner'
import { useSelector, useDispatch } from 'react-redux'
import { rstMsgErr } from '../../store/taskSlice'

function MessageModal({ setOpen, isOpen }) {

  const data = useSelector((state) => state.task)
  const dispatch = useDispatch()

  function handleClose() {
    dispatch(rstMsgErr())
    setOpen(false)
  }

  return (
    <Modal size={400} open={isOpen} onClose={handleClose}>
      <Modal.Body>
        {data.loading && <div className='flex items-center justify-center m-auto'>
          <Spinner size="35" color="#25005a" />
        </div>}
        {!data.loading && data.message ? <div className='flex items-center justify-center text-center my-2'>{data.message}</div> :
          !data.loading && data.error ? <div className='flex items-center justify-center text-center my-2'>{data.error.message}</div> : ''
          // <div className='flex items-center justify-center text-center my-2'>Processing request .....</div>
        }
      </Modal.Body>
      <Modal.Footer>
        <div className='flex items-center justify-center'>
          <button className='text-white bg-[#25005a] font-medium px-3 py-2 rounded-lg cursor-pointer active:opacity-70' onClick={handleClose}>Ok</button>
        </div>
      </Modal.Footer>
    </Modal>
  )
}

export default MessageModal
