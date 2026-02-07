import React from 'react'
import { formatPrice } from '../../utils/formatPrice'

export const OrderItem = ({ item }) => {
  const isStorno = item.status === 0

  return (
    <div className={`py-2 px-3 ${isStorno ? 'text-red-500 line-through' : ''}`}>
      <div className='font-semibold truncate'>{item.name}</div>
      <div className='text-sm text-gray-500'>
        {item.qty} x {formatPrice(item.price)} = {formatPrice(item.qty * item.price)} RSD
      </div>
    </div>
  )
}
