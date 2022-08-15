<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10" @close="$emit('close')">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed z-10 inset-0 overflow-y-auto">
        <div class="flex items-center justify-center min-h-full p-4 text-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel class="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 w-full sm:max-w-lg sm:w-full">
              <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <DialogTitle as="h3" class="text-xl leading-6 font-medium text-gray-900"> Edit <span class="font-bold">{{ employee.name }}</span> </DialogTitle>
                  <div class="mt-2">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                        <div class="mt-1 relative rounded-md shadow-sm">
                          <input v-model="employee.name" type="text" name="name" id="name" class="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                        </div>
                      </div>
                      <div>
                        <label for="name" class="block text-sm font-medium text-gray-700">Occupation</label>
                        <div class="mt-1 relative rounded-md shadow-sm">
                          <select v-model="employee.occupation" id="location" name="location" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                            <option
                              v-for="occupation in occupations"
                              :key="occupation.id"
                              :value="occupation.id"
                            >
                              {{ occupation.name }}
                            </option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label for="name" class="block text-sm font-medium text-gray-700">Color</label>
                        <div class="mt-1 relative rounded-md shadow-sm">
                          <input v-model="employee.color" type="color" name="name" id="name" class="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                        </div>
                      </div>
                      <div class="relative">
                        <label for="name" class="block text-sm font-medium text-gray-700">Vacation days</label>
                        <Datepicker
                          v-model="employee.vacation"
                          position="center"
                          multiDates
                          placeholder="Vacation days"
                          :format="() => 'Vacation days'"
                          :previewFormat="(d) => `${d.length} selected dates`"
                          :enableTimePicker="false"
                          :clearable="false"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="!showDeleteInfo" class="bg-gray-50 px-4 py-3 sm:px-6 justify-between sm:flex gap-4">
                <button type="button" class="mb-3 w-full inline-flex justify-center rounded-md border border-red-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-red-500 hover:bg-red-500 hover:text-white focus:outline-none focus:ring-0 focus:ring-offset-0 sm:mb-0 sm:ml-3 sm:w-auto sm:text-sm" @click="showDeleteInfo = true">Delete</button>
                <div class="sm:flex sm:flex-row-reverse">
                  <button type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-0 focus:ring-offset-0 sm:ml-3 sm:w-auto sm:text-sm" @click="saveEmployee">Save</button>
                  <button type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-0 focus:ring-offset-0 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" @click="$emit('close')" ref="cancelButtonRef">Cancel</button>
                </div>
              </div>
              <div v-else class="bg-gray-50 px-4 py-3 sm:px-6 justify-between items-center sm:flex gap-4">
                <div class="sm:pr-12 leading-tight">Are you sure you want to delete this user?</div>
                <div class="sm:flex sm:flex-row-reverse">
                  <button type="button" class="mb-3 w-full inline-flex justify-center rounded-md border border-red-300 shadow-sm px-4 py-2 text-base font-medium bg-red-500 text-white focus:outline-none focus:ring-0 focus:ring-offset-0 sm:mb-0 sm:ml-3 sm:w-auto sm:text-sm" @click="showDeleteInfo = true">Delete</button>
                  <button type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-0 focus:ring-offset-0 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" @click="showDeleteInfo = false">Cancel</button>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
  import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
  import { ExclamationIcon } from '@heroicons/vue/outline'
  import Datepicker from '@vuepic/vue-datepicker';
  import '@vuepic/vue-datepicker/dist/main.css'

  export default {
    components: { Datepicker, Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot, ExclamationIcon },
    props: {
      open: {
        type: Boolean,
        default: () => false,
      },
      employee: {
        type: Object,
        default: () => {},
      },
    },
    data: () => ({
      showDeleteInfo: false
    }),
    computed: {
      occupations() {
        return this.$store.getters.occupations.filter((o) => o.id !== null)
      },
    },
    methods: {
      saveEmployee() {
        this.$store.dispatch('updateEmployee', this.employee)
        this.$emit('close')
      },
    }
  }
</script>

<style>
  input[type="color"]::-webkit-color-swatch-wrapper {
    padding: 0;
  }
  input[type="color"]::-webkit-color-swatch {
    border: 1px solid rgb(209, 213, 219);
    border-radius: 6px;
  }
  input.dp__pointer.dp__input_readonly.dp__input.dp__input_icon_pad.dp__input_reg {
    font-size: 14px;
    color: #777;
  }
</style>
