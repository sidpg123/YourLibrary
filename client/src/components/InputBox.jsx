import React from 'react'

export default function InputBox({label, paceholder, onChange}) {
  return <>
    <div className='text-sm font-medium text-left p-2'>{label}</div>
    <input className=' rounded-md shadow-sm  w-full border-slate-300 py-1 px-2 text-black' paceholder={paceholder} onChange={onChange}></input>
    </>
}
