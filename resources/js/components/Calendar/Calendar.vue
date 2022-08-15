<template>
  <div class="Calendar overflow-scroll mt-10">
    <div @click="printTable">print</div>
    <div class="grid grid-cols-2 sticky top-0 z-10 bg-gray-400 h-7 text-center text-white font-semibold text-lg">
      <div>{{ occupations[1].name }}</div>
      <div>{{ occupations[2].name }}</div>
    </div>
    <table id="CalendarTable" class="min-w-full divide-y divide-gray-300">
      <thead class="bg-gray-200">
        <tr>
          <th scope="col" class="sticky top-7 z-10 border-b border-gray-300 bg-gray-200 bg-opacity-75 py-3.5 px-3 text-center text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter">Datum</th>
          <template v-if="activeOccupation === null || activeOccupation === 0">
            <th scope="col" class="sticky top-7 z-10 border-b border-gray-300 bg-gray-200 bg-opacity-75 px-3 py-3.5 text-center text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter">1. Smena</th>
            <th scope="col" class="sticky top-7 z-10 border-b border-gray-300 bg-gray-200 bg-opacity-75 px-3 py-3.5 text-center text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter">2. Smena</th>
            <th scope="col" class="sticky top-7 z-10 border-b border-gray-300 bg-gray-200 bg-opacity-75 px-3 py-3.5 text-center text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter">3. Smena</th>
          </template>
          <template v-if="activeOccupation === null || activeOccupation === 1">
            <th scope="col" class="sticky top-7 z-10 border-b border-gray-300 bg-gray-200 bg-opacity-75 px-3 py-3.5 text-center text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter">1. Smena</th>
            <th scope="col" class="sticky top-7 z-10 border-b border-gray-300 bg-gray-200 bg-opacity-75 px-3 py-3.5 text-center text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter">2. Smena</th>
            <th scope="col" class="sticky top-7 z-10 border-b border-gray-300 bg-gray-200 bg-opacity-75 px-3 py-3.5 text-center text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter">3. Smena</th>
          </template>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200 bg-white">
        <CalendarDay
          v-for="(day, idx) in timeline"
          :key="idx"
          :day="day"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
  import CalendarDay from './CalendarDay.vue'
  export default {
    components: { CalendarDay },
    data: () => ({
    }),
    computed: {
      timeline() {
        return this.$store.getters.timeline
      },
      activeOccupation() {
        return this.$store.getters.activeOccupation
      },
      occupations() {
        return this.$store.getters.occupations
      }
    },
    methods: {
      printTable() {
        var printWindow = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
        printWindow.document.write('<html><head><title>Table Contents</title>');
        printWindow.document.write('<link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet"></head>');
        printWindow.document.write('<style>.sticky { position: relative; }</style>');
        // printWindow.document.write('</head>');
        //Print the DIV contents i.e. the HTML Table.
        printWindow.document.write('<body>');
        printWindow.document.write(document.getElementById("CalendarTable").outerHTML);
        printWindow.document.write('</body>');

        printWindow.document.write('</html>');
        printWindow.document.close();
        setTimeout(() => {

          printWindow.print();
        }, 1000);
    }
    }

  }
</script>

<style scoped>
  .Calendar {
    height: calc(100vh - 130px);
  }
</style>
