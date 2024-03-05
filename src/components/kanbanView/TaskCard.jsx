import React from 'react'
import { format } from 'date-fns'
import { Whisper, IconButton, Popover, Dropdown } from 'rsuite';
import MoreIcon from '@rsuite/icons/legacy/More';


export const ActionButton = ({...props }) => {
  const renderMenu = ({ onClose, left, top, className }, ref) => {
    const handleSelect = eventKey => {
      onClose();
    };

    function handleEdit() {
      console.log(rowData)
      // openModal(rowData)
      // onClose()
    }

    return (
      <Popover ref={ref} className={className} style={{ left, top }} full>
        <Dropdown.Menu onSelect={handleSelect}>
          <Dropdown.Item eventKey={1} onClick={handleEdit}>Edit</Dropdown.Item>
          <Dropdown.Item eventKey={2}>Delete</Dropdown.Item>
        </Dropdown.Menu>
      </Popover>
    );
  };

  return (
    <Whisper placement="autoVerticalStart" trigger="click" speaker={renderMenu}>
      <IconButton appearance="subtle" icon={<MoreIcon />} />
    </Whisper>
  );
};

function TaskCard({ taskDetails }) {
  return (
    <div className='w-full flex flex-col rounded-md shadow-md border-[1px] p-3 my-2.5'>
      <div className='flex items-center justify-between'>
        <p className='font-semibold line-clamp-1'>{taskDetails.title}</p>
        <ActionButton />
      </div>
      <p className='text-sm line-clamp-2'>{taskDetails.description}</p>
      <div className='grid grid-cols-2 mt-4'>
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