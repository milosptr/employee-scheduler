import React, { Fragment } from 'react'
import axios from 'axios'
import { Dialog, Transition } from '@headlessui/react'
import { useSelector, useDispatch } from 'react-redux'
import { setActiveEmployee, setDeleteEmployeeModal, setEmployees } from '../../store/general'

export default function DeleteEmployeeModal() {
  const dispatch = useDispatch()
  const activeEmployee = useSelector((state) => state.general.activeEmployee)
  const showDeleteEmployeeModal = useSelector((state) => state.general.showDeleteEmployeeModal)
  const closeDeleteEmployeeModal = () => {
    dispatch(setDeleteEmployeeModal(false))
  }
  const deleteEmployee = () => {
    axios.delete('/api/employees/' + activeEmployee.id)
      .then(() => {
        dispatch(setDeleteEmployeeModal(false))
        dispatch(setActiveEmployee(null))
        axios.get('/api/employees')
          .then((res) => {
            dispatch(setEmployees(res.data.data))
          })
      })
  }

  return (
    <Transition.Root show={showDeleteEmployeeModal} as={Fragment} onClose={closeDeleteEmployeeModal}>
      <Dialog as="div" className="relative z-10">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className="relative bg-white h-screen sm:h-auto rounded-lg text-left overflow-hidden shadow-xl transhtmlForm transition-all sm:my-8 w-full sm:max-w-lg sm:w-full"
              >
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="w-full sm:flex sm:items-start">
                    <div className="w-full mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title as="h3" className="text-xl leading-6 font-semibold text-gray-900">
                        Delete { activeEmployee.name }
                      </Dialog.Title>
                      <div className="mt-2 text-gray-500">
                        You are about to delete <span className="text-gray-900">{ activeEmployee.name }</span>. This actions is undoable!
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full text-red-500 inline-flex justify-center rounded-md border border-red-500 shadow-sm px-4 py-2 bg-white text-base font-medium hover:bg-red-500 hover:text-white focus:outline-none focus:ring-0 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={deleteEmployee}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-0 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={closeDeleteEmployeeModal}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
