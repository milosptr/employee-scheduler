import React from 'react'
import dayjs from 'dayjs'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveEmployee, setActiveOccupation, setDateRange, setTimeline, setOpenAsideMenu } from '../../store/general'
import Calendar from './Calendar'
import DatePicker from 'react-multi-date-picker'
import { Bars3Icon, CalendarDaysIcon } from '@heroicons/react/24/outline'
import SingleEmployee from '../SingleEmployee'

export default function CalendarWrapper() {
  const datePickerRef = React.useRef()
  const state = useSelector((state) => state.general)
  const dispatch = useDispatch()
  const listOccupations = state.occupations.map((o) => {
    const activeClass = state.activeOccupation === o.id ? 'bg-indigo-500 text-white' : ''
    const changeOccupation = (id) => {
      dispatch(setActiveOccupation(id))
      dispatch(setActiveEmployee(null))
    }
    return <div
        key={o.id}
        className={'w-full sm:w-auto text-center px-6 py-2 border border-solid border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white focus:ring-0 select-none cursor-pointer ' + activeClass}
        onClick={() => changeOccupation(o.id)}
      >
        { o.name }
      </div>
  })
  const occupations = state.activeOccupation !== null ? state.occupations.filter((o) => o.id === state.activeOccupation) : state.occupations.filter((o) => o.id !== null)
  const listOccupationsNames = occupations.map((o) => <div key={o.id}>{ o.name }</div>)
  const gridCols = state.activeOccupation !== null ? 'grid-cols-1' : 'grid-cols-2'
  const updateDateRange = (v) => {
    if(v.length === 2) {
      datePickerRef.current.closeCalendar()
      const start = dayjs(v[0].unix * 1000).format('YYYY-MM-DD')
      const end = dayjs(v[1].unix * 1000).format('YYYY-MM-DD')
      dispatch(setDateRange([start, end]))
      axios.get('/api/schedules/timeline?range=' + [start, end].join(' to '))
        .then((res) => {
          dispatch(setTimeline(res.data))
        })
    }
  }

  return (
    <div>
      <div className="sm:hidden flex justify-between items-center mb-1">
          { state.activeEmployee && <SingleEmployee employee={state.activeEmployee} /> }
        <div className='ml-auto'>
          <Bars3Icon className="w-8 h-8 my-2" onClick={() => dispatch(setOpenAsideMenu())} />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-end items-center gap-4">
        <div className="w-full sm:mr-auto">
          <DatePicker
            ref={datePickerRef}
            range
            onChange={updateDateRange}
            value={state.dateRange}
            weekStartDayIndex={1}
            render={<CustomInput />}
          />
        </div>
        <div className="w-full sm:w-auto flex gap-4">
          { listOccupations }
        </div>
      </div>
      <div className="CalendarTableWrapper overflow-scroll mt-5">
        <div className={'sticky left-0 top-0 z-10 bg-gray-400 h-7 text-center text-white font-semibold text-lg hidden sm:grid ' + gridCols }>
          { listOccupationsNames }
        </div>
        <Calendar />
      </div>
    </div>
  )
}

function CustomInput({ openCalendar, value, handleValueChange }) {
  const placeholder = value.length ? (value[0] + ' to ' + value[1]) : 'Select range'
  return (
    <div className="relative w-full sm:w-64">
      <input
        type="text"
        className="relative border shadow-sm block w-full sm:w-56 sm:text-sm border-gray-300 rounded-md pl-10"
        onFocus={openCalendar}
        value={placeholder}
        onChange={handleValueChange}
      />
      <CalendarDaysIcon className="absolute left-2 top-1.5 w-6 h-6 text-gray-700" />
    </div>
  )
}
