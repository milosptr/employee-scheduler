import React, {useState} from 'react'
import { Fragment } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon, XMarkIcon, ExclamationTriangleIcon} from '@heroicons/react/24/outline'
import { setActiveEmployee, setEmployees } from '../../store/general'
const CHECK_IN = 1
const CHECK_OUT = 2

export const CheckinConfirmModal = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const dispatch = useDispatch()
  const activeEmployee = useSelector((state) => state.general.activeEmployee)
  const checkinType = activeEmployee.lastCheckin ? (activeEmployee.lastCheckin.check_out ? CHECK_IN : CHECK_OUT) : CHECK_IN
  const lastCheckinId = activeEmployee.lastCheckin ? activeEmployee.lastCheckin.id : null
  const handleClose = () => {
    dispatch(setActiveEmployee(null))
  }
  const handleCheckin = () => {
    if(loading) return
    setLoading(true)
    axios.post(`/api/employees/${activeEmployee.id}/checkin`, { employee: activeEmployee.id, checkin: lastCheckinId})
      .then((response) => {
        setError(false)
        dispatch(setEmployees(response.data.data))
        setLoading(false)
        dispatch(setActiveEmployee(null))
      })
      .catch((error) => {
        setError(true)
        setLoading(false)
      })
  }

  return (
    <Transition.Root show as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="flex items-center gap-4">
                    { !error && checkinType === CHECK_IN && (
                      <>
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                          <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                        </div>
                        <div className="text-2xl font-bold leading-6 text-gray-900">PRIJAVA</div>
                      </>
                    )}
                    { !error && checkinType === CHECK_OUT && (
                      <>
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                          <XMarkIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                        </div>
                        <div className="text-2xl font-bold leading-6 text-gray-900">ODJAVA</div>
                      </>
                    )}
                    { !!error && (
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
                        <ExclamationTriangleIcon className="h-6 w-6 text-orange-600" aria-hidden="true" />
                      </div>
                    )}
                  </div>
                  { !error && (
                    <div className="mt-3 sm:mt-5">
                      <Dialog.Title as="h3" className="text-2xl font-bold leading-6 text-gray-900">
                        { activeEmployee.name }
                      </Dialog.Title>
                      <div className="text-md mt-4 text-left">
                        <p className="text-gray-500">
                          Potvrdite { checkinType === CHECK_OUT ? ' odjavu.' : ' prijavu.' }
                        </p>
                        <div className="text-gray-500">
                          U toku istog dana mozete se vise puta prijaviti i odjaviti.
                        </div>
                      </div>
                    </div>
                    )}
                    { !!error && (
                      <div className="mt-3 sm:mt-5">
                      <Dialog.Title as="h3" className="text-2xl font-bold leading-6 text-gray-900">
                        Došlo je do greške
                      </Dialog.Title>
                      <div className="text-md mt-4 text-left">
                        <p className="text-gray-500">
                          Konekcija sa serverom nije moguća. Molimo sačekajte ili kontaktirajte nadredjenog.
                        </p>
                      </div>
                    </div>
                    )}
                </div>
                <div className="mt-5 sm:mt-12 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <div className="sm:col-start-2">
                    { !error && (
                      <button
                        type="button"
                        className={`inline-flex w-full justify-center rounded-md border border-transparent  px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-0 sm:text-sm
                        ${checkinType === CHECK_OUT ? 'bg-red-600 hover:bg-red-700' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                        onClick={handleCheckin}
                      >
                        { checkinType === CHECK_OUT ? 'ODJAVI SE' : 'PRIJAVI SE' }
                      </button>
                    )}
                    {
                      !!error && (
                        <button
                          type="button"
                          className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-0 sm:mt-0 sm:text-sm"
                          onClick={() => window.location.reload()}
                        >
                          OSVEŽI STRANICU
                        </button>
                      )
                    }
                  </div>
                  <div className="sm:col-start-1">
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-0 sm:col-start-1 sm:mt-0 sm:text-sm"
                      onClick={handleClose}
                    >
                      OTKAŽI
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
