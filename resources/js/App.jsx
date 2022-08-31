import React, { useEffect } from 'react'
import dayjs from 'dayjs'
import CalendarWrapper from './components/Calendar/CalendarWrapper'
import EditEmployeeModal from './components/Modals/EditEmployeeModal'
import DeleteScheduleModal from './components/Modals/DeleteScheduleModal'
import EditScheduleModal from './components/Modals/EditScheduleModal'
import Sidebar from './components/Sidebar/Sidebar'
import { useSelector } from 'react-redux'
import DeleteEmployeeModal from './components/Modals/DeleteEmployeeModal'
import AddEmployeeModal from './components/Modals/AddEmployeeModal'


export default function App() {
  const showModal = useSelector((state) => state.general.showEditEmployeeModal)
  const activeSchedule = useSelector((state) => state.general.activeSchedule)
  const editActiveScheduleModal = useSelector((state) => state.general.editActiveScheduleModal)
  const showDeleteEmployeeModal = useSelector((state) => state.general.showDeleteEmployeeModal)
  const showAddEmployeeModal = useSelector((state) => state.general.showAddEmployeeModal)
  const openAsideMenu = useSelector((state) => state.general.openAsideMenu)

  return (
    <div className="h-screen flex">
      <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
        <main className="flex-1 flex overflow-hidden">
          <section
            className="min-w-0 flex-1 h-full flex flex-col overflow-y-auto lg:order-last py-4 px-2 lg:px-10"
          >
            <CalendarWrapper />
          </section>

          <aside className={"lg:block lg:flex-shrink-0 lg:order-first " + (openAsideMenu ? 'open' : '') }>
            <div className="h-full relative flex flex-col lg:w-80 border-r border-gray-200 bg-white overflow-y-auto py-4 px-4 lg:px-10">
              <Sidebar />
            </div>
          </aside>
        </main>
      </div>

      { showAddEmployeeModal && <AddEmployeeModal /> }
      { showModal && <EditEmployeeModal /> }
      { showDeleteEmployeeModal && <DeleteEmployeeModal /> }
      { activeSchedule && !editActiveScheduleModal && <DeleteScheduleModal /> }
      { activeSchedule && editActiveScheduleModal && <EditScheduleModal /> }
      <div id="calendarPortalTarget"></div>
    </div>
  )
}
