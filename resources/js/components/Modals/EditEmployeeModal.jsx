import React, { Fragment, useRef, useState, useEffect } from 'react'
import dayjs from 'dayjs'
import axios from 'axios'
import { Dialog, Transition } from '@headlessui/react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleShowEditEmployeeModal, setActiveEmployee, setTimeline, setEmployees } from '../../store/general'
import DatePicker from "react-multi-date-picker"
import DatePanel from "react-multi-date-picker/plugins/date_panel"
import colors from "react-multi-date-picker/plugins/colors"

export default function EditEmployeeModal() {
  const activeEmployee = useSelector((state) => state.general.activeEmployee)
  const [employee, setEmployee] = useState(activeEmployee)
  const [selectedMonth, setSelectedMonth] = useState(dayjs().month())
  const occupations = useSelector((state) => state.general.occupations)
  const showModal = useSelector((state) => state.general.showEditEmployeeModal)
  const dateRange = useSelector((state) => state.general.dateRange)
  const dispatch = useDispatch()
  const closeEditEmployeeModal = () => {
    dispatch(toggleShowEditEmployeeModal())
    setEmployee(activeEmployee)
  }
  const listOccupations = occupations.map((o) => o.id !== null && <option key={o.id} value={o.id}>{o.name}</option>)
  const calendarPortalTarget = document.getElementById('calendarPortalTarget')
  const onClose = () => {}
  const datePickerRef = useRef()
  const updateEmployee = (value) => {
    setEmployee({
      ...employee,
      ...value
    })
  }
  const handleMonthChange = (date) => {
    setSelectedMonth(date.month.index)
  }
  const currentMonthVacationDays = employee.vacation.filter((d) => dayjs(d).month() === selectedMonth)
  const vacationOldDays = employee.vacation.filter((d) => dayjs(d).month() !== selectedMonth)
  const updateVacationDays = (dates) => {
    console.log(dates);
    const days = dates.map((d) => dayjs(d.unix * 1000).format('YYYY-MM-DD'))
    const vacation = [...new Set([...vacationOldDays, ...days])]
    setEmployee({
      ...employee,
      'vacation': vacation
    })
  }
  const saveEmployee = () => {
    axios.post('/api/employees/' + employee.id, employee)
      .then(() => {
        axios.get('/api/schedules/timeline?range=' + dateRange.join(' to '))
          .then((res) => {
            dispatch(setTimeline([]))
            setTimeout(() => {
              dispatch(setTimeline(res.data))
            }, 50);
            closeEditEmployeeModal()
          })
        axios.get('/api/employees')
          .then((res) => {
            dispatch(setEmployees(res.data.data))
            dispatch(setActiveEmployee(res.data.data.find((e) => e.id === employee.id)))
          })
      })
  }

  useEffect(() => {
    setEmployee(activeEmployee)
  }, [activeEmployee])

  return (
    <Transition.Root show={showModal} as={Fragment} onClose={onClose}>
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
                onClick={() => datePickerRef.current.closeCalendar()}
              >
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="w-full sm:flex sm:items-start">
                    <div className="w-full mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title as="h3" className="text-xl leading-6 font-medium text-gray-900">
                        Edit <span className="font-bold">{ employee && employee.name }</span>
                      </Dialog.Title>
                      <div className="mt-2">
                        { employee &&
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Name
                              </label>
                              <div className="mt-1 relative rounded-md shadow-sm">
                                <input
                                  type="text"
                                  name="name"
                                  id="name"
                                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                  tabIndex="0"
                                  value={employee.name}
                                  onChange={(e) => updateEmployee({'name': e.target.value})}
                                />
                              </div>
                            </div>
                            <div>
                              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                                Occupation
                              </label>
                              <select
                                id="location"
                                name="location"
                                value={employee.occupation}
                                onChange={(e) => updateEmployee({'occupation': parseInt(e.target.value)})}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                              >
                                { listOccupations }
                              </select>
                            </div>
                            <div>
                              <label htmlFor="color" className="block text-sm font-medium text-gray-700">
                                Color
                              </label>
                              <div className="relative rounded-md shadow-sm">
                                <input
                                  type="color"
                                  name="name"
                                  id="color"
                                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                  value={employee.color}
                                  onChange={(e) => updateEmployee({'color': e.target.value})}
                                />
                              </div>
                            </div>
                            <div onClick={(e) => e.stopPropagation()}>
                              <label htmlFor="vacation" className="block text-sm font-medium text-gray-700">
                                Vacation days
                              </label>
                              <DatePicker
                                ref={datePickerRef}
                                multiple
                                onChange={updateVacationDays}
                                onMonthChange={handleMonthChange}
                                value={currentMonthVacationDays}
                                portal
                                portalTarget={calendarPortalTarget}
                                sort
                                render={<CustomInput />}
                                plugins={[
                                  // colors({ colors: ["blue","green", "red"] }),
                                  <DatePanel sort formatFunction={(d) => dayjs(d.format).format('DD.MM.YYYY.')}/>
                                ]}
                              />
                            </div>
                          </div>
                        }
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={saveEmployee}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-0 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={closeEditEmployeeModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="mt-3 mr-auto text-red-500 w-full inline-flex justify-center rounded-md border border-red-500 shadow-sm px-4 py-2 bg-white text-base font-medium hover:bg-red-500 hover:text-white focus:outline-none focus:ring-0 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={closeEditEmployeeModal}
                  >
                    Delete
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

function CustomInput({ openCalendar, value, handleValueChange }) {
  const placeholder = value.length ? (value.length + ' selected dates') : 'Select dates'
  return (
    <input
      type="text"
      className="relative border shadow-sm block w-full sm:text-sm border-gray-300 rounded-md"
      onFocus={openCalendar}
      value={placeholder}
      onChange={handleValueChange}
    />
  )
}
