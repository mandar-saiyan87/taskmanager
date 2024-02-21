import React from 'react'
import { Oval } from 'react-loader-spinner'

function Spinner({ size, color }) {
  return (
    <>
      <Oval
        visible={true}
        height={size}
        width={size}
        color={color}
        secondaryColor={color}
        strokeWidth="5"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </>
  )
}

export default Spinner