import React, { useEffect, useRef } from 'react'
import dayjs from 'dayjs'
import { useSelector, useDispatch } from 'react-redux'
import SingleShift from './SingleShift'
import { setFocusDate } from '../../store/general'

export default function SingleDay(props) {
  const dayRef = useRef()
  const dispatch = useDispatch()
  const daysOfWeek = ['Ned', 'Pon', 'Uto', 'Sre', 'Čet', 'Pet', 'Sub']
  const state = useSelector((state) => state.general)
  const focusDate = useSelector((state) => state.general.focusDate)
  const isDisabled = state.activeEmployee && state.activeEmployee.vacation.find((date) => date === props.day.date)
  const shifts = Array.from(Array(state.shifts).keys())
  const occupations = state.activeOccupation !== null ? state.occupations.filter((o) => o.id === state.activeOccupation) : state.occupations.filter((o) => o.id !== null)
  const listShifts = occupations.map((o) => shifts.map((s, i) => <SingleShift day={props.day} shift={i + 1} occupation={o.id} isDisabled={isDisabled} key={i + '-' + o.id} />))
  const isToday = dayjs(props.day.date).isSame(dayjs(), 'day')
  const isSunday = dayjs(props.day.date).day() === 0
  const dayName = daysOfWeek[dayjs(props.day.date).day()]

  useEffect(() => {
    if(isToday && focusDate === null)
    dayRef.current.focus()
  }, [])

  return (
    <tr
      ref={dayRef}
      tabIndex="0"
      data-day={props.day.date}
      className={
        'border border-t-0 border-gray-300 text-center text-sm font-medium text-gray-900 outline-gray-300 select-none '
        }>
      <td className={'SingleDate py-2 lg:py-3 px-1 lg:px-4 font-bold text-center'
        + (isToday ? ' bg-indigo-100 text-indigo-500' : '')
        + (isSunday ? ' text-red-500 ' : '')
        }>
        <div className="flex flex-col items-center justify-center text-xs lg:text-sm">
          <div>{ dayName }</div>
          <div>{ props.day.date_formatted }</div>
        </div>
      </td>
      { listShifts }
    </tr>
  )
}
