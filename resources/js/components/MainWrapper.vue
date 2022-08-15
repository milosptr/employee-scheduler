<template>
  <div class="flex h-screen">
    <div class="w-3/4 py-4 px-4 lg:px-10">
      <CalendarTopNavigation />
      <Calendar />
    </div>
    <div class="w-1/4 bg-gray-50 border-l border-gray-100 py-4 px-4 lg:px-10">
      <RightNavigation />
    </div>
  </div>
</template>

<script>
  import CalendarTopNavigation from './CalendarTopNavigation.vue'
  import Calendar from './Calendar/Calendar.vue'
  import RightNavigation from './RightNavigation.vue'

  export default {
    components: { CalendarTopNavigation, Calendar, RightNavigation },
    mounted() {
      this.$store.dispatch('getEmployees')
      this.$store.dispatch('getTimeline')
    },
  }
</script>
