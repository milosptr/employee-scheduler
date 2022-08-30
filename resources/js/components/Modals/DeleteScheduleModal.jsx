import React, { Fragment } from 'react'
import axios from 'axios'
import dayjs from 'dayjs'
import { Dialog, Transition } from '@headlessui/react'
import { useSelector, useDispatch } from 'react-redux'
import { setActiveSchedule, setTimeline } from '../../store/general'

export default function DeleteScheduleModal() {
  const dispatch = useDispatch()
  const activeSchedule = useSelector((state) => state.general.activeSchedule)
  const dateRange = useSelector((state) => state.general.dateRange)
  const closeDeleteScheduleModal = () => {
    dispatch(setActiveSchedule(null))
  }
  const removeSchedule = () => {
    axios.delete('/api/schedules/' + activeSchedule.id)
      .then(() => {
        dispatch(setActiveSchedule(null))
        axios.get('/api/schedules/timeline?range=' + dateRange.join(' to '))
          .then((res) => {
            dispatch(setTimeline([]))
            setTimeout(() => {
              dispatch(setTimeline(res.data))
            }, 50);
            closeEditEmployeeModal()
          })
      })
  }
  const showMOdal = !!activeSchedule
  const dateFormatted = dayjs(activeSchedule.date).format('DD. MMM YYYY')

  return (
    <Transition.Root show={showMOdal} as={Fragment} onClose={closeDeleteScheduleModal}>
      <Dialog as="div" className="relative z-10">
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

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className="relative bg-white h-screen sm:h-auto rounded-lg text-left overflow-hidden shadow-xl transhtmlForm transition-all sm:my-8 w-full sm:max-w-lg sm:w-full"
              >
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="w-full sm:flex sm:items-start">
                    <div className="w-full mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title as="h3" className="text-xl leading-6 font-semibold text-gray-900">
                        Remove { activeSchedule.employee.name }
                      </Dialog.Title>
                      <div className="mt-2 text-gray-500">
                        You are about to remove <span className="text-gray-900">{ activeSchedule.employee.name }</span> from schedule for <span className="text-gray-900">{ dateFormatted }</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full text-red-500 inline-flex justify-center rounded-md border border-red-500 shadow-sm px-4 py-2 bg-white text-base font-medium hover:bg-red-500 hover:text-white focus:outline-none focus:ring-0 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={removeSchedule}
                  >
                    Remove
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-0 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={closeDeleteScheduleModal}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
