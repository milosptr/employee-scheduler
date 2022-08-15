<template>
  <div
    class="rounded-xl py-1 px-2 text-center text-black whitespace-pre-wrap"
    :style="`background-color: ${employee.color}`"
  >
    {{ employee.name }}
  </div>
</template>

<script>
  export default {
    props: {
      employee: {
        type: Object,
        default: () => {},
      }
    }
  }
</script>
