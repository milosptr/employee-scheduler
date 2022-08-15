import { createStore } from 'vuex'
const store = createStore({
  state () {
    return {
      occupations: [
        { id: null, name: 'Sve' },
        { id: 0, name: 'Šank' },
        { id: 1, name: 'Kuhinja' },
      ],
      shifts: 3,
      activeOccupation: null,
      activeEmployee: null,
      employees: [],
      timeline: [],
    }
  },
  actions: {
    getEmployees({ commit }) {
      axios.get('/api/employees')
        .then((res) => {
          commit('setEmployees', res.data.data)
        })
    },
    getTimeline({ commit }) {
      axios.get('/api/schedules/timeline')
        .then((res) => {
          commit('setTimeline', res.data)
        })
    },
    storeEmployeeForDate({ dispatch, commit }, schedule) {
      axios.post('/api/schedules', schedule)
        .then((res) => {
          dispatch('getTimeline')
        })
    },
    updateScheduleOrder({ dispatch }, values) {
      axios.post('/api/schedules/reorder', values)
        .then(() => {
          dispatch('getTimeline')
        })
    },
    updateEmployee({ dispatch }, employee) {
      axios.post('/api/employees/' + employee.id, employee)
        .then(() => {
          dispatch('getTimeline')
        })
    },
  },
  mutations: {
    setActiveOccupation(state, occupation) {
      state.activeOccupation = occupation
    },
    setEmployees(state, employees) {
      state.employees = employees
    },
    setTimeline(state, timeline) {
      state.timeline = timeline
    },
    setActiveEmployee(state, employee) {
      state.activeEmployee = employee
    },
    setEmployeeForDate(state, data) {
      if(state.activeEmployee)
        state.timeline.push(data)
    }
  },
  getters: {
    occupations: (state) => state.occupations,
    employees: (state) => state.employees,
    timeline: (state) => state.timeline,
    shifts: (state) => state.shifts,
    activeEmployee: (state) => state.activeEmployee,
    activeOccupation: (state) => state.activeOccupation,
  }
})

export default store
