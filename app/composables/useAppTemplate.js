export const useAppTemplate = () => {
  const selectedTemplate = useCookie('app-template', { 
    default: () => 'desktop',
  })

  const isMobileView = ref(selectedTemplate.value === 'mobile')

  const checkScreenSize = () => {
    if (process.client) {
      const width = window.innerWidth
      
      if (width < 864 && selectedTemplate.value === 'desktop') {
        isMobileView.value = true
      } else if (selectedTemplate.value === 'mobile') {
        isMobileView.value = true
      } else {
        isMobileView.value = false
      }
    }
  }

  watch(selectedTemplate, (newTemplate) => {
    isMobileView.value = newTemplate === 'mobile'
  })

  onMounted(() => {
    checkScreenSize()

    // if screen is small
    if (!selectedTemplate.value && window.innerWidth < 864) {
      selectedTemplate.value = 'mobile'
    }

    window.addEventListener('resize', checkScreenSize)

    onUnmounted(() => {
      window.removeEventListener('resize', checkScreenSize)
    })
  })

  return {
    selectedTemplate,
    isMobileView
  }
}