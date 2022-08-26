import React from 'react'
import dayjs from 'dayjs'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveEmployee, setActiveOccupation } from '../../store/general'
import Calendar from './Calendar'

export default function CalendarWrapper() {
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
        className={'text-center px-6 py-2 border border-solid border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white focus:ring-0 select-none cursor-pointer ' + activeClass}
        onClick={() => changeOccupation(o.id)}
      >
        { o.name }
      </div>
  })
  const occupations = state.activeOccupation !== null ? state.occupations.filter((o) => o.id === state.activeOccupation) : state.occupations.filter((o) => o.id !== null)
  const listOccupationsNames = occupations.map((o) => <div key={o.id}>{ o.name }</div>)
  const gridCols = state.activeOccupation !== null ? 'grid-cols-1' : 'grid-cols-2'
  const jumpToToday = () => {
    const today = dayjs().format('YYYY-MM-DD')
    document.querySelector(`[data-day="${today}"`).focus()
  }
  return (
    <div>
      <div className="flex justify-end items-center gap-4">
        { listOccupations }
      </div>
      <div className="mt-5 mb-1 flex gap-3">
        <div>Jump to:</div>
        <div className='text-indigo-500 cursor-pointer' onClick={jumpToToday}>
          Today
        </div>
      </div>
      <div className="overflow-scroll" style={{height: 'calc(100vh - 130px)'}}>
        <div className={'grid sticky top-0 z-10 bg-gray-400 h-7 text-center text-white font-semibold text-lg ' + gridCols }>
          { listOccupationsNames }
        </div>
        <Calendar />
      </div>
    </div>
  )
}
