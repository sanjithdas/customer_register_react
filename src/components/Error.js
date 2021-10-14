import React from 'react'

 const Error = (props) => {
  return (
    <>
      <li className="text-danger">{props.message}</li>
    </>
  )
}

export default Error;
