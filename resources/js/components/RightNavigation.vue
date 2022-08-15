<template>
  <div>
    <div class="text-3xl font-medium pb-1 border-b border-gray-200">Zaposleni</div>
    <div class="grid grid-cols-1 gap-6 mt-10">
      <div
        v-for="occupation in occumations"
        :key="occupation.id"
      >
        <div class="text-xl font-medium pb-1 border-b border-gray-200 mb-4">{{ occupation.name }}</div>
        <EmployeeItem
          v-for="employee in $store.getters.employees.filter((e) => e.occupation === occupation.id)"
          :key="occupation.id + '-' + employee.id"
          :employee="employee"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import EmployeeItem from './EmployeeItem.vue'
  export default {
    components: { EmployeeItem },
    computed: {
      occumations() {
        if(this.$store.getters.activeOccupation === null)
          return this.$store.getters.occupations.filter((l) => l.id !== null)
        return this.$store.getters.occupations.filter((l) => l.id !== null && l.id === this.$store.getters.activeOccupation)
      }
    }
  }
</script>
