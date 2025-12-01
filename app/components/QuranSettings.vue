<template>
  <div dir="rtl" class="space-y-4">
    <div dir="rtl" class="space-y-3">
      <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">حالت صفحه</label>
      <UColorModeSwitch color="info" size="xl" class="flex justify-end"/>
    </div>
    <div dir="rtl" class="space-y-3">
      <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300">قالب</label>
      <USelectMenu
        dir="ltr"
        :items="templateOptions"
        v-model="appTemplate.selectedTemplate.value"
        class="min-w-40 hover:cursor-pointer transition ease-in delay-75 hover:shadow-lg"
        :ui="{
          trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200'
        }"
        value-key="value"
      />
    </div>
  </div>
</template>

<script setup>
const appTemplate = inject('appTemplate')

const templateOptions = [
  {
    label: 'Desktop',
    icon: 'i-lucide-monitor',
    value: 'desktop'
  },
  {
    label: 'Mobile',
    icon: 'i-lucide-smartphone',
    value: 'mobile'
  }
]
</script>
