<template>
  <div class="flex justify-end items-center gap-4">
    <button
      v-for="occupation in $store.getters.occupations"
      :key="occupation.id"
      type="button"
      class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white focus:ring-0"
      :class="{'bg-indigo-500 text-white': $store.getters.activeOccupation === occupation.id}"
      @click="changeOccupation(occupation.id)"
    >
      {{ occupation.name }}
    </button>
  </div>
</template>

<script>
  export default {
    methods: {
      changeOccupation(id) {
        this.$store.commit('setActiveOccupation', id)
        document.querySelector('.calendar--today').focus()
      }
    }
  }
</script>
