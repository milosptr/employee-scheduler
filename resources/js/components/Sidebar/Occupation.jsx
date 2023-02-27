import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SingleEmployee from '../SingleEmployee'
import { toggleShowAddEmployeeModal } from '../../store/general'

export const Occupation = (props) => {
  const employees = useSelector((state) => state.general.employees)
  const listEmployees = employees.map((e) => e.occupation === props.id && <SingleEmployee key={e.id} employee={e} />)

  return (
    <div>
      <div className="text-xl font-medium pb-1 border-b border-gray-200">
        { props.title }
      </div>
      <div className="flex flex-col">
        { listEmployees }
      </div>
    </div>
  )
}
