import { Button } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

export default function BottomWarnign({label, buttonText, to}) {
    return (
        <>
            <div className='py-2 text-sm flex justify-center'>
                <div className='text-lg pr-2    '>{label}</div>
                <Link className='cursor-pointer underline text-lg pr-2 text-blue-500 hover:text-blue-700' to={to}>
                    {buttonText}
                </Link>
            </div>
        </>
    )
}
