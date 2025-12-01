export const useQuranSearch = () => {
  const searchQuery = ref('')
  const searchResults = ref(null)
  const isSearching = ref(false)
  const searchError = ref(null)
  const page = ref(1)
  const pageSize = 5

  const lastSearchQuery = useCookie('quran-last-search', {
    default: () => '',
  })

  const handleSearch = async () => {

    if (!searchQuery.value || searchQuery.value.trim().length < 2) {
      searchResults.value = null
      return
    }

    try {
      isSearching.value = true
      searchError.value = null

      const response = await $fetch(
        `https://api.alquran.cloud/v1/search/${encodeURIComponent(searchQuery.value.trim())}/all/quran-simple-clean`
      )

      searchResults.value = response?.data
      lastSearchQuery.value = searchQuery.value.trim()

    } catch (error) {
      console.error('Search error:', error)
      searchError.value = 'خطا در جستجو. لطفاً دوباره تلاش کنید.'
      searchResults.value = null
    } finally {
      isSearching.value = false
    }
  }

  const clearSearch = () => {
    searchQuery.value = ''
    searchResults.value = null
    searchError.value = null
  }

  onMounted(() => {
    if (lastSearchQuery.value) {
      searchQuery.value = lastSearchQuery.value
    }
  })

  const resultsCount = computed(() => {
    return searchResults.value?.count || 0
  })

  const hasResults = computed(() => {
    return resultsCount.value > 0
  })
  
  const paginatedResults = computed(() => {
  if (!searchResults.value?.matches) return []
  
  const start = (page.value - 1) * pageSize
  const end = start + pageSize
  
  return searchResults.value.matches.slice(start, end)

})
  return {
    searchQuery,
    searchResults,
    isSearching,
    searchError,
    pageSize,
    page,
    resultsCount,
    hasResults,
    paginatedResults,
    handleSearch,
    clearSearch
  }
}
