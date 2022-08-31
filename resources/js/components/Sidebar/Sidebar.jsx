import React, { useEffect } from 'react'
import axios from 'axios'
import { setEmployees, setOpenAsideMenu, toggleShowAddEmployeeModal } from '.././../store/general'
import { useSelector, useDispatch } from 'react-redux'
import { Occupation } from './Occupation'
import { PrinterIcon, FolderArrowDownIcon, UserPlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { printElement } from '../../helpers'


export default function Sidebar() {
  const state = useSelector((state) => state.general)
  const dispatch = useDispatch()
  const addEmlpoyeeModal = () => {
    dispatch(toggleShowAddEmployeeModal())
  }


  useEffect(() => {
    axios.get('/api/employees')
      .then((res) => {
        dispatch(setEmployees(res.data.data))
      })
  }, [])

  const listOccupationEmployees = state.occupations.map((o) => o.id !== null && <Occupation key={o.id} id={o.id} title={o.name} ocupation={o} />)

  return (
    <div>
      <div className="flex items-center justify-end gap-4">
        <XMarkIcon className='w-6 h-6 mr-auto lg:hidden' onClick={() => dispatch(setOpenAsideMenu())} />
        <UserPlusIcon onClick={addEmlpoyeeModal} className="w-6 h-6 cursor-pointer" />
        <PrinterIcon onClick={() => printElement('schedulesTable')} className="w-6 h-6 cursor-pointer" />
      </div>
      <div className="grid grid-cols-1 gap-6 mt-5 pb-24 sm:pb-0">
        { listOccupationEmployees }
      </div>
    </div>
  )
}
