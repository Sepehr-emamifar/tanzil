<template>
  <div dir="rtl" class="space-y-4">
    
    <div class="space-y-2">
      <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300">سوره</label>
      <USelectMenu
        v-model="selectedSurah"
        :items="surahOptions"
        class="min-w-40 hover:cursor-pointer transition ease-in delay-75 hover:shadow-lg"
        :ui="{
        trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200'
        }"
        value-key="value"
        dir="rtl"
      />
    </div>

    <div class="space-y-2" >
      <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300">آیه</label>
      <USelectMenu
        v-model="selectedAyah"
        :items="ayahOptions"
        class="min-w-40 hover:cursor-pointer transition ease-in delay-75 hover:shadow-lg"
        :ui="{
        trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200'
        }"
        value-key="value"
        dir="rtl"
      />
    </div>

    <div class="space-y-2">
      <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300">جزء</label>
      <USelectMenu
        v-model="selectedJuz"
        :items="juzOptions"
        class="min-w-40 hover:cursor-pointer transition ease-in delay-75 hover:shadow-lg"
        :ui="{
        trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200'
        }"
        value-key="value"
        dir="rtl"
      />
    </div>

  </div>
</template>

<script setup>
const props = defineProps({
  selectedSurah: Number,
  selectedAyah: Number,
  selectedJuz: Number,
  surahMeta: Array,
  ayahList: Array,
  juzsMeta: Array
})

const emit = defineEmits(['update:selectedSurah', 'update:selectedAyah', 'update:selectedJuz'])

const selectedSurah = computed({
  get: () => props.selectedSurah,
  set: (value) => emit('update:selectedSurah', value)
})

const selectedAyah = computed({
  get: () => props.selectedAyah,
  set: (value) => emit('update:selectedAyah', value)
})

const selectedJuz = computed({
  get: () => props.selectedJuz,
  set: (value) => emit('update:selectedJuz', value)
})

const {removeArabicDiacritics} = useRemoveArabicSigns()

const surahOptions = computed(() => 
  props.surahMeta?.map(item => ({
    value: item.number,
    label: `${item.number}. ${removeArabicDiacritics(item.name)}` // نام سوره اول، بعد شماره
  })) || []
)

const ayahOptions = computed(() => 
  props.ayahList?.map(item => ({
    value: item,
    label: `آیه ${item}`
  })) || []
)

const juzOptions = computed(() => 
  props.juzsMeta?.map((item, i) => ({
    value: i + 1,
    label: `جزء ${i + 1}`
  })) || []
)
</script>
