import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getColorBrightness } from '../../helpers'
import { setEditActiveScheduleModal, setActiveSchedule } from '../../store/general'
import { XMarkIcon, ClockIcon } from '@heroicons/react/24/outline'

export default function SingleEmployee(props) {
  const activeOccupation = useSelector((state) => state.general.activeOccupation)
  const textColorClass = getColorBrightness(props.employee.color) ? 'text-black' : 'text-white'
  const dispatch = useDispatch()
  const handleEditSchedule = (e) => {
    e.stopPropagation()
    dispatch(setEditActiveScheduleModal(true))
    dispatch(setActiveSchedule(props.schedule))
  }
  const handleDeleteSchedule = (e) => {
    e.stopPropagation()
    dispatch(setActiveSchedule(props.schedule))
  }

  return (
    <div
      className={
        'relative rounded-xl py-1 px-2 text-center justify-between whitespace-pre-wrap cursor-grab focus:cursor-grabbing select-none active:cursor-grabbing tracking-wide text-sm flex items-center gap-4 '
        + textColorClass
      }
      style={{ backgroundColor: props.employee.color }}
    >
      <div className="text-left">{ props.employee.name } {props.schedule.time ? (' - ' + props.schedule.time) : ''}</div>
      <div className="flex items-center gap-1">
        <div className="cursor-pointer" onClick={handleEditSchedule}>
          <ClockIcon className={'h-4 w-4 ' + textColorClass} />
        </div>
        <div className="cursor-pointer" onClick={handleDeleteSchedule}>
          <XMarkIcon className={'h-4 w-4 ' + textColorClass} />
        </div>
      </div>
    </div>
  )
}