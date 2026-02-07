import React from 'react'
import { formatPrice } from '../../utils/formatPrice'

const GaugeArc = ({ value, max }) => {
  const ratio = Math.min(value / max, 1)
  const r = 120
  const stroke = 20
  const width = 300
  const height = 160
  const cx = width / 2
  const cy = 140
  const startAngle = Math.PI
  const endAngle = 0
  const bgX1 = cx + r * Math.cos(startAngle)
  const bgY1 = cy + r * Math.sin(startAngle)
  const bgX2 = cx + r * Math.cos(endAngle)
  const bgY2 = cy + r * Math.sin(endAngle)
  const fillAngle = startAngle - ratio * Math.PI
  const fillX = cx + r * Math.cos(fillAngle)
  const fillY = cy + r * Math.sin(fillAngle)
  const largeArc = ratio > 0.5 ? 1 : 0

  return (
    <div className='flex flex-col items-center justify-center mt-10 relative'>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <path
          d={`M ${bgX1} ${bgY1} A ${r} ${r} 0 1 1 ${bgX2} ${bgY2}`}
          fill='none'
          stroke='#EEEEEE'
          strokeWidth={stroke}
          strokeLinecap='round'
        />
        {ratio > 0 && (
          <path
            d={`M ${bgX1} ${bgY1} A ${r} ${r} 0 ${largeArc} 1 ${fillX} ${fillY}`}
            fill='none'
            stroke='#e86423'
            strokeWidth={stroke}
            strokeLinecap='round'
          />
        )}
      </svg>
      <div className='absolute left-0 top-0 w-full font-bold text-4xl flex items-center justify-center' style={{ height: `${height}px` }}>
        {formatPrice(value)}
      </div>
    </div>
  )
}

export const TransactionsTab = ({ transactions }) => {
  const today = new Date()
  const dateStr = `${String(today.getDate()).padStart(2, '0')}.${String(today.getMonth() + 1).padStart(
    2,
    '0'
  )}.${today.getFullYear()}`
  const maximum = 70000

  return (
    <div className='flex flex-col justify-between h-full p-6 max-w-[600px] mx-auto'>
      <div>
        <div className='text-center text-2xl font-semibold mb-6 uppercase'>Pregled prometa {dateStr}</div>
        <GaugeArc value={parseInt(transactions.income) || 0} max={maximum} />
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
