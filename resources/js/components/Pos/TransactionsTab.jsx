import React from 'react'
import { formatPrice } from '../../utils/formatPrice'

export const TransactionsTab = ({ transactions }) => {
  const today = new Date()
  const dateStr = `${String(today.getDate()).padStart(2, '0')}.${String(today.getMonth() + 1).padStart(
    2,
    '0'
  )}.${today.getFullYear()}`

  return (
    <div className='flex flex-col justify-between h-full p-6 max-w-[600px] mx-auto'>
      <div>
        <div className='text-center text-2xl font-semibold mb-6 uppercase'>Pregled prometa {dateStr}</div>
        <div className='mt-10 text-xl'>
          <div className='flex justify-between items-center py-1 font-medium'>
            <div>Gotovina</div>
            <div>{formatPrice(transactions.income)} RSD</div>
          </div>
          <div className='flex justify-between items-center py-1 font-medium'>
            <div>Reprezentacija</div>
            <div>{formatPrice(transactions.onthehouse)} RSD</div>
          </div>
          <div className='flex justify-between items-center py-1 pb-3 border-b border-gray-300 font-medium'>
            <div>Storno</div>
            <div>{formatPrice(transactions.refund)} RSD</div>
          </div>
          <div className='flex justify-between items-center py-1 pt-3 font-bold'>
            <div>Ukupno</div>
            <div>{formatPrice(transactions.total)} RSD</div>
          </div>
        </div>
      </div>
    </div>
  )
}
