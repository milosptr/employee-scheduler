import React, { useState } from 'react'
import axios from 'axios'

export const EnterPin = ({ onSuccess }) => {
  const [pin, setPin] = useState('')
  const [error, setError] = useState(false)

  const handleKey = (digit) => {
    if (pin.length < 4) {
      setPin(pin + digit)
      setError(false)
    }
  }

  const handleDelete = () => {
    setPin('')
    setError(false)
  }

  const handleEnter = () => {
    if (pin.length !== 4) return
    axios.post('/api/validate-pin', { pin: parseInt(pin) })
      .then((res) => {
        if (res.data.status) {
          onSuccess()
        } else {
          setError(true)
          setPin('')
        }
      })
      .catch(() => {
        setError(true)
        setPin('')
      })
  }

  const digits = pin.split('')

  return (
    <div className='flex flex-col items-center justify-center h-full'>
      <div
        className='grid grid-cols-4 gap-3 mb-8'
        style={error ? { animation: 'ErrorShake 0.3s' } : {}}
      >
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`w-16 h-16 border-2 rounded-lg flex items-center justify-center text-3xl font-bold
              ${error ? 'border-red-500' : 'border-gray-300'}`}
          >
            {digits[i] ? '*' : ''}
          </div>
        ))}
      </div>
      <div className='grid grid-cols-3 gap-3 NumpadWidth'>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
          <div
            key={digit}
            className='bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer flex items-center justify-center select-none'
            style={{ height: '70px' }}
            onClick={() => handleKey(String(digit))}
          >
            <div style={{ fontSize: '26px' }}>{digit}</div>
          </div>
        ))}
        <div
          className='bg-red-100 hover:bg-red-200 text-red-600 rounded-lg cursor-pointer flex items-center justify-center select-none'
          style={{ height: '70px' }}
          onClick={handleDelete}
        >
          <div style={{ fontSize: '16px' }} className='font-semibold'>Obrisi</div>
        </div>
        <div
          className='bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer flex items-center justify-center select-none'
          style={{ height: '70px' }}
          onClick={() => handleKey('0')}
        >
          <div style={{ fontSize: '26px' }}>0</div>
        </div>
        <div
          className='bg-green-100 hover:bg-green-200 text-green-600 rounded-lg cursor-pointer flex items-center justify-center select-none'
          style={{ height: '70px' }}
          onClick={handleEnter}
        >
          <div style={{ fontSize: '16px' }} className='font-semibold'>Enter</div>
        </div>
      </div>
    </div>
  )
}
