import React from 'react'
import { formatPrice } from '../../utils/formatPrice'

export const TransactionsTab = ({ transactions }) => {
  const today = new Date()
  const dateStr = `${String(today.getDate()).padStart(2, '0')}.${String(today.getMonth() + 1).padStart(2, '0')}.${today.getFullYear()}`

  return (
    <div className='p-6'>
      <h2 className='text-xl font-semibold mb-6'>Pregled prometa za {dateStr}</h2>
      <div className='max-w-md'>
        <div className='flex justify-between py-3'>
          <span>Gotovina</span>
          <span>{formatPrice(transactions.income)} RSD</span>
        </div>
        <div className='flex justify-between py-3'>
          <span>Reprezentacija</span>
          <span>{formatPrice(transactions.onthehouse)} RSD</span>
        </div>
        <div className='flex justify-between py-3 border-b'>
          <span>Storno</span>
          <span>{formatPrice(transactions.refund)} RSD</span>
        </div>
        <div className='flex justify-between py-3 font-bold text-lg'>
          <span>Ukupno</span>
          <span>{formatPrice(transactions.total)} RSD</span>
        </div>
      </div>
    </div>
  )
}
