import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'

export const InvoiceMenu = ({ invoice, onAction }) => {
  const [open, setOpen] = useState(false)
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
    axios.post(`/api/pos/invoices/${invoice.id}/on-the-house`)
      .then(() => {
        setOpen(false)
        onAction()
      })
      .catch(() => {
        setOpen(false)
      })
  }

  const handleStorno = () => {
    axios.post(`/api/pos/invoices/${invoice.id}/storno`)
      .then(() => {
        setOpen(false)
        onAction()
      })
      .catch(() => {
        setOpen(false)
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
    </div>
  )
}
