import React from 'react'
import { formatPrice } from '../../utils/formatPrice'

const statusText = (status) => {
  if (status === 0) return 'Stornirano'
  if (status === 2) return 'Na racun kuce'
  return 'Naplaceno'
}

const parseTime = (dateStr) => {
  if (!dateStr) return ''
  const parts = dateStr.split(' ')
  return parts.length > 1 ? parts[1] : dateStr
}

export const InvoicesList = ({ invoices, selectedInvoice, onSelect }) => {
  const today = new Date()
  const dateStr = `${String(today.getDate()).padStart(2, '0')}.${String(today.getMonth() + 1).padStart(2, '0')}.${today.getFullYear()}`

  return (
    <div className='flex flex-col h-full'>
      <div className='p-4 border-b'>
        <h2 className='text-xl font-semibold'>Pregled racuna za {dateStr}</h2>
      </div>
      <div className='grid grid-cols-5 gap-2 px-4 py-2 text-sm font-semibold text-gray-500 border-b'>
        <div>Vreme naplate</div>
        <div>Total</div>
        <div>Broj stola</div>
        <div>Status</div>
        <div>Br. racuna</div>
      </div>
      <div className='flex-1 overflow-y-auto'>
        {invoices.map((invoice) => {
          const isSelected = selectedInvoice && selectedInvoice.id === invoice.id
          const colorClass = invoice.status === 0 ? 'text-red-500' : invoice.status === 2 ? 'text-indigo-500' : ''

          return (
            <div
              key={invoice.id}
              className={`grid grid-cols-5 gap-2 px-4 py-3 cursor-pointer hover:bg-gray-50 border-l-4
                ${isSelected ? 'border-indigo-500 bg-indigo-50' : 'border-transparent'}
                ${colorClass}`}
              onClick={() => onSelect(invoice)}
            >
              <div>{parseTime(invoice.created_at)}</div>
              <div className={invoice.status === 0 ? 'line-through' : ''}>
                {formatPrice(invoice.total)} RSD
              </div>
              <div>{invoice.table_name}</div>
              <div>{statusText(invoice.status)}</div>
              <div>{invoice.invoice_number}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
