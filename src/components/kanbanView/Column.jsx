import React from 'react'
import TaskCard from './TaskCard';

function Column({ taskdata, column }) {

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

  const dummyTask = {
    id: 1,
    title: 'Dummy task',
    description: 'Dummy description',
    start_date: new Date(),
    due_date: new Date(),
    status: 'todo'
  }

  return (
    <>
      <div className='border-[1px] py-2 px-3' style={{ borderColor: `${colColor}` }}>
        <div className='text-white font-semibold py-1 px-3 text-center rounded-md' style={{ backgroundColor: `${colColor}` }}>
          <p>{colName}</p>
        </div>
        <div>
          {taskdata.filter((task) => task.status === column).map((item) =>
            <TaskCard taskDetails={item} bcolor={colColor} />
          )}

        </div>
      </div>
    </>
  )
}

export default Column
