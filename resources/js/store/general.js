import { createSlice } from '@reduxjs/toolkit'
import dayjs from 'dayjs'

export const general = createSlice({
  name: 'general',
  initialState: {
    dateRange: [
      dayjs().format('YYYY-MM-DD'),
      dayjs().add(1, 'month').format('YYYY-MM-DD')
    ],
    activeOccupation: null,
    activeEmployee: null,
    activeSchedule: null,
    showEditEmployeeModal: false,
    editActiveScheduleModal: false,
    showAddEmployeeModal: false,
    showDeleteEmployeeModal: false,
    deleteMode: false,
    employees: [],
    occupations: [
      { id: null, name: 'Sve' },
      { id: 1, name: 'Kuhinja' },
      { id: 0, name: 'Šank' },
    ],
    shifts: 3,
    timeline: [],
    trashDraggableGroup: null,
  },
  reducers: {
    setActiveOccupation: (state, action) => {
      state.activeOccupation = action.payload
    },
    setActiveEmployee: (state, action) => {
      state.activeEmployee = action.payload
    },
    setEmployees: (state, action) => {
      state.employees = action.payload
    },
    toggleShowEditEmployeeModal: (state) => {
      state.showEditEmployeeModal = !state.showEditEmployeeModal
    },
    toggleShowAddEmployeeModal: (state) => {
      state.showAddEmployeeModal = !state.showAddEmployeeModal
    },
    setTimeline: (state, action) => {
      state.timeline = action.payload
    },
    setActiveSchedule: (state, action) => {
      state.activeSchedule = action.payload
    },
    setDeleteEmployeeModal: (state, action) => {
      state.showDeleteEmployeeModal = action.payload
    },
    setEditActiveScheduleModal: (state, action) => {
      state.editActiveScheduleModal = action.payload
    },
    setDateRange: (state, action) => {
      state.dateRange = action.payload
    },
  },
})

export const {
  setActiveOccupation,
  setEmployees,
  setActiveEmployee,
  toggleShowEditEmployeeModal,
  toggleShowScheduleDeleteModal,
  toggleShowAddEmployeeModal,
  setEditActiveScheduleModal,
  setTimeline,
  setActiveSchedule,
  setDeleteEmployeeModal,
  setDateRange,
 } = general.actions

export default general.reducer
