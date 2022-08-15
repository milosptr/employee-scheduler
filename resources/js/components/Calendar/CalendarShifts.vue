<template>
  <td
    class="whitespace-nowrap p-3 text-sm text-gray-500"
    :class="{'bg-red-200': hasVacation}"
    @click="addEmployee(day.date, shift)"
    :style="[shift === 1 && occupation === 1 ? 'border-left: 1px solid rgb(156, 163, 175)!important;' : '']"
  >
    <div class="flex flex-col">
      <draggable
        v-model="schedulesForShift"
        item-key="id"
        class="flex flex-col gap-2"
      >
        <template #item="{element}">
          <div
            class="rounded-xl py-1 px-2 text-center text-black whitespace-pre-wrap cursor-grab focus:cursor-grabbing active:cursor-grabbing"
            :class="`order-${element.order}`"
            :style="`background-color: ${element.employee.color}`"
          >
            <span class="select-none">{{element.employee.name}}</span>
          </div>
        </template>
      </draggable>
    </div>
  </td>
</template>

<script>
  import draggable from 'vuedraggable'
  import CalendarShiftEmployee from './CalendarShiftEmployee.vue'
  export default {
    components: { CalendarShiftEmployee, draggable },
    props: {
      day: {
        type: Object,
        default: () => {},
      },
      shift: {
        type: Number,
        default: () => 0,
      },
      occupation: {
        type: Number,
        default: () => 0,
      },
    },
    computed: {
      activeEmployee() {
        return this.$store.getters.activeEmployee
      },
      schedulesForShift: {
        get() {
          return this.day.schedules
            .filter((s) => s.shift === this.shift && s.occupation === this.occupation)
            .sort((a, b) => a.order - b.order)
        },
        set(values) {
          values.forEach((v, i) => { v.order = i })
          this.$store.dispatch('updateScheduleOrder', values)
        }
      },
      employeesId() {
        return this.day.schedules.map((s) => s.employee.id)
      },
      hasVacation() {
        return this.activeEmployee?.vacation.some((v) => dayjs(v).isSame(dayjs(this.day.date), 'day'))
      },
    },
    methods: {
      addEmployee(date, shift) {
        if(this.hasVacation || this.activeEmployee === null || this.employeesId.includes(this.activeEmployee.id))
          return
        if(this.activeEmployee.occupation !== this.occupation)
          return
        const data = { date: dayjs(date).format('YYYY-MM-DD'), employee_id: this.activeEmployee.id, shift, occupation: this.occupation }
        this.$store.dispatch('storeEmployeeForDate', data)
      },
    }
  }
</script>
