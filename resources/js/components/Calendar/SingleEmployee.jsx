import axios from 'axios'
import React from 'react'
import { useDispatch } from 'react-redux'
import { setEditActiveScheduleModal, setActiveSchedule } from '../../store/general'
import { XMarkIcon } from '@heroicons/react/24/outline'

export default function SingleEmployee(props) {
  const dispatch = useDispatch()
  const handleDeleteSchedule = (e) => {
    e.stopPropagation()
    axios.delete('/api/schedules/' + props.schedule.id)
    .then(() => {
      dispatch(setActiveSchedule(null))
      props.removeSchedule(props.schedule.id)
    })
  }
  const handleEmployeeClick = (e) => {
    e.stopPropagation()
    dispatch(setEditActiveScheduleModal(true))
    dispatch(setActiveSchedule(props.schedule))
  }

  return (
    <div
      className={
        'relative rounded-xl py-1 px-1 lg:px-2 text-center justify-center lg:justify-between whitespace-pre-wrap cursor-grab focus:cursor-grabbing select-none active:cursor-grabbing tracking-wide text-sm flex items-center gap-2 lg:gap-4 text-white'
      }
      style={{ backgroundColor: props.employee.color }}
      onClick={handleEmployeeClick}
    >
      <div className="text-left text-xs sm:text-sm">
        <span className="font-bold">{ props.employee.name } </span>
        <span>{props.schedule.time ? props.schedule.time : ''}</span>
      </div>
      <div className="hidden lg:flex items-center gap-1">
        <div className="cursor-pointer" onClick={handleDeleteSchedule}>
          <XMarkIcon className={'h-4 w-4 text-white'} />
        </div>
      </div>
    </div>
  )
}
