<template>
  <tr
    class="divide-x divide-gray-200 border-l border-r"
    :class="{'bg-gray-100': isToday}"
  >
    <td
      class="whitespace-nowrap text-center py-3 text-sm font-medium text-gray-900 w-32"
      :class="{'calendar--today': isToday}"
      tabindex="1"
    >
      {{ day.date_formatted }}
    </td>
    <CalendarShifts
      v-show="activeOccupation === null || activeOccupation === 0"
      v-for="(shift, idx) in shifts"
      :key="idx"
      :day="day"
      :shift="idx + 1"
      :occupation="0"
    />
    <CalendarShifts
      v-show="activeOccupation === null || activeOccupation === 1"
      v-for="(shift, idx) in shifts"
      :key="idx"
      :day="day"
      :shift="idx + 1"
      :occupation="1"
    />
  </tr>
</template>

<script>
  import CalendarShifts from './CalendarShifts.vue'
  export default {
    components: { CalendarShifts },
    props: {
      day: {
        type: Object,
        default: () => {}
      },
    },
    computed: {
      activeOccupation() {
        return this.$store.getters.activeOccupation
      },
      shifts() {
        return [...Array(this.$store.getters.shifts).keys()]
      },
      isToday() {
        return dayjs().isSame(this.day.date, 'day')
      },
    },
    mounted() {
      if(this.isToday) {
        document.querySelector('.calendar--today').focus()
      }
    },
  }
</script>
