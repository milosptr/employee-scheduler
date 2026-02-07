import React from 'react'
import { InvoiceSidebar } from './InvoiceSidebar'
import { InvoicesList } from './InvoicesList'

export const InvoicesTab = ({ invoices, selectedInvoice, onSelect, onAction }) => {
  return (
    <div className='flex h-full'>
      <div className='w-[28%] border-r'>
        <InvoiceSidebar invoice={selectedInvoice} onAction={onAction} />
      </div>
      <div className='w-[72%]'>
        <InvoicesList invoices={invoices} selectedInvoice={selectedInvoice} onSelect={onSelect} />
      </div>
    </div>
  )
}
