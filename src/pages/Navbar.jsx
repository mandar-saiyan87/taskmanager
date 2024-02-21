import React from 'react'

function Navbar() {
  return (
    <>
      <div className='max-w-[1536px] m-auto flex py-2 px-3 shadow-md'>
        <div className='flex items-center gap-1 text-[#25005a]'>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M5.625 3.75a2.625 2.625 0 1 0 0 5.25h12.75a2.625 2.625 0 0 0 0-5.25H5.625ZM3.75 11.25a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75ZM3 15.75a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75ZM3.75 18.75a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75Z" />
            </svg>
          </div>
          <p className='text-lg font-semibold tracking-wide'>TaskMaster</p>
        </div>

      </div>

    </>
  )
}

export default Navbar