import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'

export const InvoiceMenu = ({ invoice, onAction }) => {
  const [open, setOpen] = useState(false)
  const [confirmStorno, setConfirmStorno] = useState(false)
  const [confirmOnTheHouse, setConfirmOnTheHouse] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (invoice.status === 0 || invoice.status === 2) return null

  const handleOnTheHouse = () => {
    setOpen(false)
    setConfirmOnTheHouse(true)
  }

  const confirmOnTheHouseAction = () => {
    axios.post(`/api/pos/invoices/${invoice.id}/on-the-house`)
      .then(() => {
        setConfirmOnTheHouse(false)
        onAction()
      })
      .catch(() => {
        setConfirmOnTheHouse(false)
      })
  }

  const handleStorno = () => {
    setOpen(false)
    setConfirmStorno(true)
  }

  const confirmStornoAction = () => {
    axios.post(`/api/pos/invoices/${invoice.id}/storno`)
      .then(() => {
        setConfirmStorno(false)
        onAction()
      })
      .catch(() => {
        setConfirmStorno(false)
      })
  }

  return (
    <div className='relative' ref={menuRef}>
      <div
        className='cursor-pointer p-1 hover:bg-gray-100 rounded'
        onClick={() => setOpen(!open)}
      >
        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
          <path strokeLinecap='round' strokeLinejoin='round' d='M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z' />
        </svg>
      </div>
      {open && (
        <div className='absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[180px]'>
          <div
            className='px-4 py-3 hover:bg-gray-50 cursor-pointer text-sm'
            onClick={handleOnTheHouse}
          >
            Na racun kuce
          </div>
          <div
            className='px-4 py-3 hover:bg-gray-50 cursor-pointer text-sm text-red-600'
            onClick={handleStorno}
          >
            Storniraj
          </div>
        </div>
      )}
      {confirmOnTheHouse && (
        <div className='fixed inset-0 z-[200] flex items-center justify-center'>
          <div className='absolute inset-0 bg-black opacity-50' onClick={() => setConfirmOnTheHouse(false)}></div>
          <div className='relative z-[201] bg-white rounded-lg shadow-xl p-6 max-w-sm w-full mx-4'>
            <h3 className='text-lg font-semibold mb-2'>Na racun kuce</h3>
            <p className='text-gray-500 mb-6'>Da li ste sigurni da zelite da stavite ovaj racun na racun kuce?</p>
            <div className='flex gap-3'>
              <button
                className='flex-1 py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50'
                onClick={() => setConfirmOnTheHouse(false)}
              >
                Otkazi
              </button>
              <button
                className='flex-1 py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700'
                onClick={confirmOnTheHouseAction}
              >
                Potvrdi
              </button>
            </div>
          </div>
        </div>
      )}
      {confirmStorno && (
        <div className='fixed inset-0 z-[200] flex items-center justify-center'>
          <div className='absolute inset-0 bg-black opacity-50' onClick={() => setConfirmStorno(false)}></div>
          <div className='relative z-[201] bg-white rounded-lg shadow-xl p-6 max-w-sm w-full mx-4'>
            <h3 className='text-lg font-semibold mb-2'>Storniranje racuna</h3>
            <p className='text-gray-500 mb-6'>Da li ste sigurni da zelite da stornirate ovaj racun?</p>
            <div className='flex gap-3'>
              <button
                className='flex-1 py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50'
                onClick={() => setConfirmStorno(false)}
              >
                Otkazi
              </button>
              <button
                className='flex-1 py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700'
                onClick={confirmStornoAction}
              >
                Storniraj
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
