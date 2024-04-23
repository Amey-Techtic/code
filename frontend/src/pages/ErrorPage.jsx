import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div className='text-center mt-[10%]'>

      <h1 className='text-2xl font-bold text-zinc-500'>Looking for Something?</h1>
      <p className='text-lg font-semibold mb-[2%]'>We're sorry. The Web address you entered is not a functioning page on our site.</p>
      <Link className='font-bold text-lg text-slate-500 underline' to={'/'}>Back to Home Page</Link>
    </div>
  )
}

export default ErrorPage
