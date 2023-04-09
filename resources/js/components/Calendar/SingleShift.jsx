import React, { useState, useEffect } from 'react'
import { SortableContainer, SortableElement } from 'react-sortable-hoc'
import { setTimeline, setTargetDraggableElement } from '../../store/general'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import SingleEmployee from './SingleEmployee'

export default function SingleShift(props) {
  const dispatch = useDispatch()
  const filterEmployees = () =>
    props.day.schedules
      .filter((e) => e.shift === props.shift && e.occupation === props.occupation)
      .sort((a, b) => a.order - b.order)
  const activeEmployee = useSelector((state) => state.general.activeEmployee)
  const activeOccupation = useSelector((state) => state.general.activeOccupation)
  const focusDate = useSelector((state) => state.general.focusDate)
  const dateRange = useSelector((state) => state.general.dateRange)
  const [employees, setEmployees] = useState(filterEmployees())
  const handleSetTimeline = () => {
    axios.get('/api/schedules/timeline?range=' + dateRange.join(' to ')).then((res) => {
      dispatch(setTimeline(res.data))
    })
  }
  const handleRemoveSchedule = (id) => {
    setEmployees(employees.filter((e) => e.id !== id))
    handleSetTimeline()
  }
  const borderClass =
    activeOccupation === null && props.shift === 1 && props.occupation === 0
      ? 'border-l-2 border-gray-400'
      : 'border-l border-gray-300'
  const isDisabled = !(
    !props.isDisabled &&
    activeEmployee &&
    activeEmployee.occupation === props.occupation &&
    employees.every((e) => e.employee?.id !== activeEmployee.id)
  )
  const isVacation = props.isDisabled && activeEmployee && activeEmployee.occupation === props.occupation
  const addEmployeForDate = () => {
    if (!isDisabled) {
      const schedule = {
        date: props.day.date,
        employee_id: activeEmployee.id,
        shift: props.shift,
        occupation: activeEmployee.occupation,
        order: 0
      }
      axios.post('/api/schedules', schedule).then((res) => {
        setEmployees([...employees, res.data.data])
        axios.get('/api/schedules/timeline?range=' + dateRange.join(' to ')).then((res) => {
          dispatch(setTimeline(res.data))
        })
      })
    }
  }

  const filterActiveEmployees = employees.filter((e) => e?.id).sort((a, b) => a.order - b.order)
  const handleDragEnter = (event) => {
    if (filterActiveEmployees.length === 0) {
      dispatch(setTargetDraggableElement({ date: props.day.date, shift: props.shift, order: 0 }))
    }
  }

  useEffect(() => {
    if (props.day.date === focusDate) setEmployees(filterEmployees())
  }, [props.day])

  useEffect(() => {
    setEmployees(filterEmployees())
  }, [props.day.schedules])

  return (
    <td
      className={
        'SingleShift py-2 lg:py-3 px-1.5 lg:px-4 select-none ' +
        borderClass +
        (isDisabled && activeEmployee !== null ? ' cursor-not-allowed ' : '') +
        (isVacation && activeEmployee !== null ? ' bg-red-200 ' : ' ')
      }
      onClick={addEmployeForDate}
      onDragEnter={handleDragEnter}>
      <div className='flex flex-col gap-2'>
        {filterActiveEmployees.map((value, index) => (
          <SingleEmployee
            key={value.id}
            index={index}
            schedule={value}
            employee={value.employee}
            dateRange={dateRange.join(' to ')}
            removeSchedule={handleRemoveSchedule}
          />
        ))}
      </div>
    </td>
  )
}
