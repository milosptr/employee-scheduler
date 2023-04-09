import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  setEditActiveScheduleModal,
  setActiveSchedule,
  setActiveDraggableEmployee,
  setTargetDraggableElement,
  setGlobalLoading
} from '../../store/general'
import { XMarkIcon } from '@heroicons/react/24/outline'

export default function SingleEmployee(props) {
  const dispatch = useDispatch()
  const activeDraggableEmployee = useSelector((state) => state.general.activeDraggableEmployee)
  const targetDraggableElement = useSelector((state) => state.general.targetDraggableElement)
  const handleDeleteSchedule = (e) => {
    e.stopPropagation()
    axios.delete('/api/schedules/' + props.schedule.id).then(() => {
      dispatch(setActiveSchedule(null))
      props.removeSchedule(props.schedule.id)
    })
  }
  const handleEmployeeClick = (e) => {
    e.stopPropagation()
    dispatch(setEditActiveScheduleModal(true))
    dispatch(setActiveSchedule(props.schedule))
  }
  const handleDragStart = () => {
    dispatch(setActiveDraggableEmployee(props.schedule))
  }
  const handleDragEnd = (event) => {
    if (activeDraggableEmployee && activeDraggableEmployee.id && targetDraggableElement) {
      dispatch(setGlobalLoading(true))
      axios
        .post(`/api/schedules/${activeDraggableEmployee.id}`, {
          ...activeDraggableEmployee,
          ...targetDraggableElement
        })
        .then(() => {
          dispatch(setActiveDraggableEmployee(null))
          dispatch(setTargetDraggableElement(null))
        })
    } else {
      dispatch(setActiveDraggableEmployee(null))
      dispatch(setTargetDraggableElement(null))
    }
  }

  const handleDragEnter = (event) => {
    const date = event.target.getAttribute('data-day')
    const shift = parseInt(event.target.getAttribute('data-shift'))
    const order = parseInt(event.target.getAttribute('data-index'))
    dispatch(setTargetDraggableElement({ date, shift, order }))
  }

  const handleDragOver = (event) => {
    event.preventDefault()
  }

  return (
    <div
      className={
        'relative rounded-xl py-1 px-1 lg:px-2 text-center justify-center lg:justify-between whitespace-pre-wrap cursor-grab focus:cursor-grabbing select-none active:cursor-grabbing tracking-wide text-sm flex items-center gap-2 lg:gap-4 text-white'
      }
      style={{ backgroundColor: props.employee.color }}
      onClick={handleEmployeeClick}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={(e) => handleDragEnd(e)}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}>
      {!!activeDraggableEmployee && (
        <div
          className='absolute left-0 top-0 w-full h-full z-10'
          data-day={props.schedule.date}
          data-index={props.index}
          data-shift={props.schedule.shift}></div>
      )}
      <div className='text-left text-xs sm:text-sm'>
        <span className='font-bold'>{props.employee.name} </span>
        <span>{props.schedule.time ? props.schedule.time : ''}</span>
      </div>
      {!!props.schedule.from_checkin && (
        <div className='absolute -top-1 -left-0.5 w-3 h-3 rounded-full bg-red-500 text-[8px] flex items-center justify-center'>
          A
        </div>
      )}
      <div className='hidden lg:flex items-center gap-1'>
        <div
          className='cursor-pointer'
          onClick={handleDeleteSchedule}>
          <XMarkIcon className={'h-4 w-4 text-white'} />
        </div>
      </div>
    </div>
  )
}
