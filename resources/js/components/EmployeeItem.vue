<template>
  <div class="my-2 flex items-center gap-4">
    <div
      class="rounded-xl py-1 px-4 focus-within:bg-gray-100 hover:bg-gray-100 lg:w-3/4"
      :class="[activeEmployeeId === employee.id ? 'opacity-100' : 'opacity-80']"
      :style="`background-color: ${employee.color}`"
      @click="$store.commit('setActiveEmployee', employee)"
    >
      {{ employee.name }}
    </div>
    <PencilIcon
      v-if="activeEmployeeId === employee.id"
      class="w-5 h-5"
      @click="showEmployeeModal = true"
    />
    <EmployeeModal
      v-if="showEmployeeModal"
      :open="showEmployeeModal"
      :employee="employee"
      @close="showEmployeeModal = false"
    />
  </div>
</template>

<script>
  import { PencilIcon } from '@heroicons/vue/outline'
  import EmployeeModal from './Modals/EmployeeModal.vue'
  export default {
    components: { PencilIcon, EmployeeModal },
    props: {
      employee: {
        type: Object,
        default: () => {}
      }
    },
    data: () => ({
      showEmployeeModal: false,
    }),
    computed: {
      activeEmployeeId() {
        return this.$store.getters.activeEmployee?.id
      }
    },
    methods: {}
  }
</script>
