import React from 'react'

const BackDrop = ({ data, open }) => {
  if (!data && !open) return null;

  return (
    <div
      className={`z-10 transition-all duration-200 opacity-40 w-screen h-screen bg-slate-900/30 fixed ${data ? "top-16" : "top-0"} left-0 pointer-events-none`}
    ></div>
  )
}

export default BackDrop