import React from 'react'
import { formatPrice } from '../../utils/formatPrice'
import { OrderItem } from './OrderItem'
import { InvoiceMenu } from './InvoiceMenu'

export const InvoiceSidebar = ({ invoice, onAction }) => {
  if (!invoice) {
    return (
      <div className='flex items-center justify-center h-full text-gray-400 text-lg'>
        Izaberite racun
      </div>
    )
  }

  const colorClass = invoice.status === 0 ? 'text-red-500' : invoice.status === 2 ? 'text-indigo-500' : ''

  return (
    <div className={`flex flex-col h-full ${colorClass}`}>
      <div className='flex items-center justify-between p-4 border-b'>
        <div className='text-2xl font-bold uppercase'>{invoice.table_name}</div>
        <InvoiceMenu invoice={invoice} onAction={onAction} />
      </div>
      <div className='flex-1 overflow-y-auto'>
        {invoice.order && invoice.order.map((item, index) => (
          <OrderItem key={index} item={item} />
        ))}
      </div>
      <div className='border-t p-4 flex justify-between items-center font-bold text-lg'>
        <span>Total</span>
        <span>{formatPrice(invoice.total)} RSD</span>
      </div>
    </div>
  )
}
