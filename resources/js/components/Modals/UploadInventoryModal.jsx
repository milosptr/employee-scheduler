import React from 'react'
import axios from 'axios'

export const UploadInventoryModal = ({ closeModal }) => {
  const dateValue = new Date()
  const year = dateValue.getFullYear()
  const hours = dateValue.getHours()
  let month = dateValue.getMonth() + 1
  let day = dateValue.getDate()
  if (hours <= 4) day = day - 1
  month = month < 10 ? `0${month}` : month
  day = day < 10 ? `0${day}` : day
  const currentDate = `${year}-${month}-${day}`
  const [date, setDate] = React.useState(currentDate)
  const [file, setFile] = React.useState(null)
  const [error, setError] = React.useState(null)
  const [success, setSuccess] = React.useState(false)

  const handleDateChange = (e) => {
    setDate(e.target.value)
  }
  const handleFileUpload = (e) => {
    setFile(e.target.files[0])
  }
  const handleSubmit = () => {
    if (!date || !file) return setError('Morate uneti i datum i fajl za uvoz')
    const formData = new FormData()
    formData.append('date', date + ' 00:00:00')
    formData.append('file', file)
    axios
      .post('http://192.168.200.30/public/sales/import', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(() => {
        setSuccess(true)
      })
      .catch(() => {
        setError('Došlo je do greške prilikom uvoza, pokušajte ponovo.')
      })
  }

  return (
    <div className='fixed left-0 top-0 z-[100] w-full h-screen flex justify-center items-center'>
      <div
        className='absolute left-0 top-0 w-full h-screen bg-black z-[99] opacity-50'
        onClick={closeModal}></div>
      <div className='relative z-[100] w-1/2 min-h-[50vh] bg-white p-10 rounded-lg'>
        {!success && (
          <>
            <div>
              {error && (
                <div className='rounded-md bg-red-50 p-4'>
                  <div className='flex'>
                    <div className='flex-shrink-0'>
                      <svg
                        className='h-5 w-5 text-red-400'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                        aria-hidden='true'>
                        <path
                          fillRule='evenodd'
                          d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </div>
                    <div className='ml-3'>
                      <h3 className='font-medium text-red-800'>{error}</h3>
                    </div>
                  </div>
                </div>
              )}
              <div className='flex items-center gap-5 mt-8'>
                <div className='min-w-[200px]'>
                  <label className='block font-medium text-gray-500'>Izaberi datum</label>
                  <input
                    type='date'
                    name='date'
                    className='rounded-md border-gray-400 min-w-[200px]'
                    value={date}
                    onChange={handleDateChange}
                  />
                </div>
                <div className='w-full'>
                  <label className='block font-medium text-gray-500'>Izaberi fajl</label>
                  <input
                    onChange={handleFileUpload}
                    className='w-full file:bg-indigo-50 file:text-indigo-500 hover:file:bg-indigo-100 file:rounded-lg file:rounded-tr-none file:rounded-br-none file:px-4 file:py-2 file:mr-4 file:border-none hover:cursor-pointer border rounded-lg text-gray-400'
                    placeholder='Izaberi fajl'
                    type='file'
                    name='file'
                  />
                </div>
              </div>
              <div
                onClick={handleSubmit}
                className='bg-indigo-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-8 text-center'>
                Uvezi
              </div>
            </div>
          </>
        )}
        {success && (
          <div className='relative '>
            <div>
              <div className='mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100'>
                <svg
                  className='h-6 w-6 text-green-600'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  aria-hidden='true'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M4.5 12.75l6 6 9-13.5'
                  />
                </svg>
              </div>
              <div className='mt-3 text-center sm:mt-5'>
                <h3
                  className='text-2xl font-semibold leading-6 text-gray-900'
                  id='modal-title'>
                  Uspešan uvoz
                </h3>
                <div className='mt-2'>
                  <p className='text-gray-500'>Možete zatvoriti ovaj prozor i nastaviti sa radom.</p>
                </div>
              </div>
            </div>
            <div className='mt-5 sm:mt-6'>
              <button
                type='button'
                onClick={closeModal}
                className='inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                Zatvori
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
