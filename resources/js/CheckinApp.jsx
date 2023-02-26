import React, {useEffect} from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveEmployee, setEmployees } from './store/general'
import { CheckinConfirmModal } from './components/Modals/CheckinConfirmModal'

const CheckinApp = () => {
  const dispatch = useDispatch()
  const employees = useSelector((state) => state.general.employees)
  const activeEmployee = useSelector((state) => state.general.activeEmployee)
  const kitchenEmployees = employees.filter((employee) => employee.occupation)
  const barEmployees = employees.filter((employee) => !employee.occupation)
  const dateFormatOptions = {
    hour: 'numeric',
    minute: 'numeric'
  }
  const formatDate = (date) => {
    if(date) {
      return new Intl.DateTimeFormat('default', dateFormatOptions).format(new Date(date))
    }
    return ''
  }
  const printCheckinDate = (employee) => {
    if(employee.lastCheckin && employee.lastCheckin.check_in)
      return formatDate(employee.lastCheckin.check_in)
    return ''
  }
  const printCheckoutDate = (employee) => {
    if(employee.lastCheckin && employee.lastCheckin.check_out)
      return ` - ${formatDate(employee.lastCheckin.check_out)}`
    return ''
  }

  const handleCheckin = (employee) => {
    dispatch(setActiveEmployee(employee))
  }

  useEffect(() => {
    axios.get('/api/employeesCheckin')
      .then((res) => {
        dispatch(setEmployees(res.data.data))
      })
  }, [])

  return (
    <div className="bg-gray-100 min-h-[100vh] p-[2%]">
      <div className="bg-white rounded-lg p-12">
        <div className="text-3xl font-semibold text-gray-900 mb-10">Prijavljivanje</div>
        <div>
          <div className="text-2xl font-semibold text-gray-900 pb-2 border-b border-gray-100 mb-10">Kuhinja</div>
          <div className="grid grid-cols-7 gap-5 text-center">
            { kitchenEmployees.map((employee) => (
              <div
                key={employee.id}
                className={`
                  rounded-lg cursor-pointer py-5 text-xl text-gray-800 min-h-[100px]
                  ${employee.lastCheckin && employee.lastCheckin.check_out === null ? 'bg-green-500' : ''}
                  ${employee.lastCheckin === null ? 'bg-gray-300' : ''}
                  ${employee.lastCheckin && employee.lastCheckin.check_out ? 'bg-red-500' : ''}`}
                onClick={() => handleCheckin(employee)}
              >
                <strong>{employee.name}</strong>
                <div className="font-mono text-center text-sm">{ printCheckinDate(employee) }{ printCheckoutDate(employee) }</div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10">
          <div className="text-2xl font-semibold text-gray-900 pb-2 border-b border-gray-100 mb-10">Šank</div>
          <div className="grid grid-cols-7 gap-5 text-center">
            { barEmployees.map((employee) => (
                <div
                  key={employee.id}
                  className={
                    `rounded-lg cursor-pointer py-5 text-xl text-gray-800 min-h-[100px]
                    ${employee.lastCheckin && employee.lastCheckin.check_out === null ? 'bg-green-500' : ''}
                    ${employee.lastCheckin === null ? 'bg-gray-300' : ''}
                    ${employee.lastCheckin && employee.lastCheckin.check_out ? 'bg-red-500' : ''}`}
                  onClick={() => handleCheckin(employee)}
                >
                  <strong>{employee.name}</strong>
                  <div className="font-mono text-center text-sm">{ printCheckinDate(employee) }{ printCheckoutDate(employee) }</div>
                </div>
              ))}
            </div>
        </div>
      </div>
      { !!activeEmployee && <CheckinConfirmModal />}
    </div>
  )
}

export default CheckinApp
