import React from 'react'
import { setActiveEmployee, toggleShowEditEmployeeModal, setDeleteEmployeeModal, setOpenAsideMenu } from '../store/general'
import { useSelector, useDispatch } from 'react-redux'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { getColorBrightness } from '../helpers'


export default function SingleEmployee(props) {
  const activeEmployee = useSelector((state) => state.general.activeEmployee)
  const timeline = useSelector((state) => state.general.timeline)
  const style = { backgroundColor: props.employee.color }
  const dispatch = useDispatch()
  const setEmployee = () => {
    dispatch(setActiveEmployee(props.employee))
    if(activeEmployee && activeEmployee.id === props.employee.id) {
      dispatch(setActiveEmployee(null))
      return
    }
    if(window.innerWidth <= 768) dispatch(setOpenAsideMenu())
  }
  const editEmployee = () => {
    dispatch(toggleShowEditEmployeeModal())
  }
  const deleteEmployee = () => {
    dispatch(setDeleteEmployeeModal(true))
  }
  const canEdit = activeEmployee && activeEmployee.id === props.employee.id && <PencilSquareIcon className="mb-1 h-5 w-5 cursor-pointer" onClick={editEmployee}/>
  const canDelete = activeEmployee && activeEmployee.id === props.employee.id && <TrashIcon className="mb-1 h-5 w-5 cursor-pointer text-red-500" onClick={deleteEmployee}/>
  const textColorClass = getColorBrightness(props.employee.color) ? 'text-black' : 'text-white'
  const employeeTotalShifts = timeline.reduce((a, v) => {
    const hasEmployee = v.schedules.some((s) => s.employee.id === props.employee.id)
    return a + (hasEmployee ? 1 : 0)
  }, 0)

  return (
    <div className="my-2 flex items-center gap-4">
      <div
        className={'rounded-xl py-1 px-4 focus-within:bg-gray-100 hover:bg-gray-100 w-3/4 select-none cursor-pointer flex justify-between ' + textColorClass}
        style={ style }
        onClick={setEmployee}
      >
        <div>{ props.employee.name }</div>
        <div className='ml-3 sm:ml-0 font-semibold'>{ employeeTotalShifts }</div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        { canEdit }
        { canDelete }
      </div>
    </div>
  )
}
