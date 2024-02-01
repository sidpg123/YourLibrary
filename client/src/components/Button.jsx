import React from 'react'

export default function Button({onClick, label}) {
  return (
    <button disabled={isSubmitting} type="submit" onClick={onClick} className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">{isSubmitting ? "Loading..." : {label}}</button>
  )
}
