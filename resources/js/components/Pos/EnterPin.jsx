import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'

export const EnterPin = ({ onSuccess }) => {
  const [pin, setPin] = useState('')
  const [error, setError] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const validatePin = (value) => {
    axios.post('/api/validate-pin', { pin: parseInt(value) })
      .then((res) => {
        if (res.data.status) {
          onSuccess()
        } else {
          setError(true)
          setPin('')
          inputRef.current?.focus()
        }
      })
      .catch(() => {
        setError(true)
        setPin('')
        inputRef.current?.focus()
      })
  }

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4)
    setPin(value)
    setError(false)
    if (value.length === 4) {
      validatePin(value)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && pin.length === 4) {
      validatePin(pin)
    }
  }

  const digits = pin.split('')

  return (
    <div
      className='flex flex-col items-center justify-center h-full'
      onClick={() => inputRef.current?.focus()}
    >
      <input
        ref={inputRef}
        type='tel'
        inputMode='numeric'
        pattern='[0-9]*'
        maxLength={4}
        value={pin}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className='absolute opacity-0 w-0 h-0'
        autoFocus
      />
      <div
        className='grid grid-cols-4 gap-3'
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
    </div>
  )
}
