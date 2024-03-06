import React from 'react'
import TaskCard from './TaskCard';
import { useSelector, useDispatch } from 'react-redux'
import { editTask } from '../../store/taskSlice';

function Column({ children, column, props }) {

  const { cardRef, handleDrop } = props

  const colName = column.charAt(0).toUpperCase() + column.slice(1);

  // console.log(taskdata)

  let colColor = ''

  switch (column) {
    case 'todo':
      colColor = '#7CB9E8'
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


  return (
    <>
      <div className='border-[1px] py-2 px-3' style={{ borderColor: `${colColor}` }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => handleDrop(cardRef.current, column)}
      >
        <div className='text-white font-semibold py-1 px-3 text-center rounded-md' style={{ backgroundColor: `${colColor}` }}>
          <p>{colName}</p>
        </div>
        <div>
          {children}
        </div>
      </div>
    </>
  )
}

export default Column
