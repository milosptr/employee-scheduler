import React, { Fragment, useEffect, useState } from 'react'
import axios from 'axios'
import dayjs from 'dayjs'
import { Dialog, Transition } from '@headlessui/react'
import { useSelector, useDispatch } from 'react-redux'
import { setActiveSchedule, setEditActiveScheduleModal, setTimeline } from '../../store/general'

export default function EditScheduleModal() {
  const dispatch = useDispatch()
  const activeSchedule = useSelector((state) => state.general.activeSchedule)
  const dateRange = useSelector((state) => state.general.dateRange)
  const [time, setTime] = useState(activeSchedule.time)
  const closeEditScheduleModal = () => {
    dispatch(setActiveSchedule(null))
    dispatch(setEditActiveScheduleModal(false))
  }
  const showModal = !!activeSchedule
  const dateFormatted = dayjs(activeSchedule.date).format('DD. MMM YYYY')
  const saveSchedule = () => {
    axios.post('/api/schedules/' + activeSchedule.id, { time: time + ':00' })
      .then(() => {
        axios.get('/api/schedules/timeline?range=' + dateRange.join(' to '))
          .then((res) => {
            dispatch(setTimeline([]))
            setTimeout(() => {
              dispatch(setTimeline(res.data))
            }, 50);
            dispatch(setActiveSchedule(null))
            dispatch(setEditActiveScheduleModal(false))
          })
      })
  }
  const clearTime = () => {
    axios.post('/api/schedules/' + activeSchedule.id, { time: '' })
      .then(() => {
        axios.get('/api/schedules/timeline?range=' + dateRange.join(' to '))
          .then((res) => {
            dispatch(setTimeline([]))
            setTimeout(() => {
              dispatch(setTimeline(res.data))
            }, 50);
            dispatch(setActiveSchedule(null))
            dispatch(setEditActiveScheduleModal(false))
          })
      })
  }

  return (
    <Transition.Root show={showModal} as={Fragment} onClose={closeEditScheduleModal}>
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
                        Edit schedule
                      </Dialog.Title>
                      <div className="mt-2 text-gray-500">
                        You are editing schedule <span className="text-gray-900">{ activeSchedule.employee.name }</span> for <span className="text-gray-900">{ dateFormatted }</span>
                      </div>
                      <div className="grid grid-cols-1">
                        <div className="">
                          <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                            Arrival time
                          </label>
                          <div className="relative rounded-md flex gap-2">
                            <input
                              type="number"
                              name="time"
                              id="time"
                              step="1"
                              min="0"
                              max="23"
                              className="focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-md w-2/3"
                              value={time}
                              onChange={(e) => setTime(e.target.value)}
                            />
                            { time && <div
                              className="text-sm border border-red-500 text-red-500 rounded-md flex items-center px-3 cursor-pointer hover:bg-red-500 hover:text-white"
                              onClick={clearTime}
                            >
                              Remove
                            </div> }
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full text-white inline-flex justify-center rounded-md border border-indigo-500 shadow-sm px-4 py-2 bg-indigo-500 text-base font-medium hover:bg-indigo-700 hover:text-white focus:outline-none focus:ring-0 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={saveSchedule}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-0 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={closeEditScheduleModal}
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
