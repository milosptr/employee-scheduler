import React, { useEffect } from 'react'
import axios from 'axios'
import { setEmployees, setOpenAsideMenu, toggleShowAddEmployeeModal } from '.././../store/general'
import { useSelector, useDispatch } from 'react-redux'
import { Occupation } from './Occupation'
import { PrinterIcon, UserPlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { printElement } from '../../helpers'


export default function Sidebar() {
  const state = useSelector((state) => state.general)
  const dispatch = useDispatch()
  const addEmlpoyeeModal = () => {
    dispatch(toggleShowAddEmployeeModal())
  }
  const activeOccupation = state.occupations.find((o) => o.id === state.activeOccupation)
  const print = () => {
    const body = document.getElementById('schedulesTable').outerHTML
    axios.post('/api/schedules/pdf', { body })
      .then((res) => {
        window.open('/pdf/' + res.data.file, '_blank')
        alert('radi')
      })
      .catch(() => {
        alert('ne radi')
      })
    // if(window.innerWidth > 768) {
    //   printElement('schedulesTable')
    // } else {
    //   const body = document.getElementById('schedulesTable').outerHTML
    //   axios.post('/api/schedules/pdf', { body })
    //     .then((res) => {
    //       window.open('/pdf/' + res.data.file, '_blank')
    //     })
    // }
  }


  useEffect(() => {
    axios.get('/api/employees')
      .then((res) => {
        dispatch(setEmployees(res.data.data))
      })
  }, [])

  const listOccupationEmployees = state.activeOccupation !== null ?
    <Occupation id={activeOccupation.id} title={activeOccupation.name} ocupation={activeOccupation} />
    : state.occupations.map((o) => o.id !== null && <Occupation key={o.id} id={o.id} title={o.name} ocupation={o} />)

  return (
    <div>
      <div className="flex items-center justify-end gap-4">
        <XMarkIcon className='w-6 h-6 mr-auto lg:hidden' onClick={() => dispatch(setOpenAsideMenu())} />
        <UserPlusIcon onClick={addEmlpoyeeModal} className="w-6 h-6 cursor-pointer" />
        <PrinterIcon onClick={print} className="w-6 h-6 cursor-pointer" />
      </div>
      <div className="grid grid-cols-1 gap-6 mt-5 pb-24 sm:pb-0">
        { listOccupationEmployees }
      </div>
    </div>
  )
}
