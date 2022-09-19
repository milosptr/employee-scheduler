import React, { useState } from 'react'
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import { setTimeline } from '../../store/general'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import SingleEmployee from './SingleEmployee'

export default function SingleShift(props) {
  const dispatch = useDispatch()
  const activeEmployee = useSelector((state) => state.general.activeEmployee)
  const activeOccupation = useSelector((state) => state.general.activeOccupation)
  const listEmployees = props.day.schedules.filter((e) => e.shift === props.shift && e.occupation === props.occupation).sort((a, b) => a.order - b.order)
  const dateRange = useSelector((state) => state.general.dateRange)
  const [employees, setEmployees] = useState(listEmployees)
  const handleSetTimeline = () => {
    axios.get('/api/schedules/timeline?range=' + dateRange.join(' to '))
        .then((res) => {
          dispatch(setTimeline(res.data))
        })
  }
  const onSortEnd = ({oldIndex, newIndex}) => {
    if(oldIndex === newIndex)
      return
    const sortedEmployees = []
    const empoyeeForMoving = employees.find((e) => e.order === oldIndex)
    const newIndexEmployee = employees.find((e) => e.order === newIndex)
    sortedEmployees.push({...empoyeeForMoving, order: newIndex})
    if(newIndexEmployee)
      sortedEmployees.push({...newIndexEmployee, order: oldIndex})
    const rest = employees.filter((e) => !sortedEmployees.some((se) => se.id === e.id))
    sortedEmployees.push(...rest)
    setEmployees(sortedEmployees.sort((a, b) => a.order - b.order))
    axios.post('/api/schedules/reorder', sortedEmployees)
      .then(() => {
        handleSetTimeline()
      })
  }
  const handleRemoveSchedule = (id) => {
    setEmployees(employees.filter((e) => e.id !== id))
    handleSetTimeline()
  }
  const SortableItem = SortableElement(({value}) => <SingleEmployee schedule={value} employee={value.employee} removeSchedule={handleRemoveSchedule} />)
  const SortableList = SortableContainer(({items}) => {
    return (
      <div className="flex flex-col gap-2">
        {items.map((value, index) => (
          <SortableItem key={`item-${value.id}`} index={index} value={value} disabled={employees.length < 2} />
        ))}
      </div>
    )
  })
  const borderClass = activeOccupation === null && props.shift === 1 && props.occupation === 0 ? 'border-l-2 border-gray-400' : 'border-l border-gray-300'
  const isDisabled = !(!props.isDisabled && activeEmployee && activeEmployee.occupation === props.occupation && employees.every((e) => e.employee?.id !== activeEmployee.id))
  const isVacation =  !(!props.isDisabled && activeEmployee && activeEmployee.occupation === props.occupation)
  const addEmployeForDate = () => {
    if(!isDisabled) {
      const schedule = {
        date: props.day.date,
        employee_id: activeEmployee.id,
        shift: props.shift,
        occupation: activeEmployee.occupation,
        order: 0
      }
      axios.post('/api/schedules', schedule)
        .then((res) => {
          setEmployees([...employees, res.data.data])
          axios.get('/api/schedules/timeline?range=' + dateRange.join(' to '))
            .then((res) => {
              dispatch(setTimeline(res.data))
            })
        })
    }
  }

  return (
    <td
      className={'SingleShift py-2 lg:py-3 px-1.5 lg:px-4 select-none '
        + borderClass
        + (isDisabled && activeEmployee !== null ? ' cursor-not-allowed ' : '')
        + (isVacation && activeEmployee !== null ? ' bg-red-100 ' : ' ')
      }
      onClick={addEmployeForDate}
    >
      <SortableList items={employees.filter((e) => e?.id)} onSortEnd={onSortEnd} pressDelay={200} />
    </td>
  )
}
