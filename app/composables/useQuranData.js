export const useQuranData = () => {
  
  const selectedEdition = useCookie('quran-edition', { 
    default: () => 'quran-uthmani'
  })
  
  const selectedTranslator = useCookie('quran-translator', { 
    default: () => 'fa.ghomshei'
  })
  
  const selectedQari = useCookie('quran-qari', { 
    default: () => 'ar.alafasy'
  })
  
  const pageCounter = useCookie('quran-page', { 
    default: () => 1
  })

  const { data: meta, status: metaStatus } = useFetch(
    'https://api.alquran.cloud/v1/meta'
  )
  
  const { data: quran, status: quranStatus } = useFetch(
    'https://api.alquran.cloud/v1/edition'
  )
  
  const { data: page, status: pageStatus, error: pageError, refresh: refreshPage } = useFetch(() => 
    `https://api.alquran.cloud/v1/page/${pageCounter.value}/${selectedEdition.value}`
  )
  
  const { data: tarjomeh, status: tarjomehStatus, error: tarjomehError, refresh: refreshTarjomeh } = useFetch(() => 
    `https://api.alquran.cloud/v1/page/${pageCounter.value}/${selectedTranslator.value}`
  )
  
  const { data: audio, status: audioStatus, error: audioError, refresh: refreshAudio } = useFetch(() => 
    `https://api.alquran.cloud/v1/page/${pageCounter.value}/${selectedQari.value}`
  )

  const network = inject('network' ,{isOnline:ref(true)})

  const hasError = computed(()=> {
    const isOfflineAndLoading =
     !network.isOnline.value && (pageStatus.value === 'pending' || tarjomehStatus.value === 'pending')

    const hasApiError = pageError.value || tarjomehError.value || audioError.value

    return hasApiError || isOfflineAndLoading
  })

  const isLoading = computed(() => 
    (pageStatus.value === 'pending' || 
    tarjomehStatus.value === 'pending'||
    audioStatus.value === 'pending') &&
    !hasError.value
  )


  const refreshAll = async() => {
      await Promise.all([
      refreshPage(),
      refreshTarjomeh(),
      refreshAudio()
    ])
  }

  const showPage = computed(() => page.value?.data ?? {})
  const metaPage = computed(() => meta.value?.data?.pages?.references ?? [])
  const surahMeta = computed(() => meta.value?.data?.surahs?.references ?? [])
  const juzsMeta = computed(() => meta.value?.data?.juzs?.references ?? [])

  const qari = computed(() =>
    quran.value?.data?.filter(item => item.format === 'audio') ?? []
  )

  const translator = computed(() =>
    quran.value?.data?.filter(
      item => item.type === 'translation' && 
              item.format === 'text' && 
              item.language !== 'ba'
    ) ?? []
  )

  const edition = computed(() =>
    quran.value?.data?.filter(item => item.type === 'quran') ?? []
  )

  return {
    selectedEdition,
    selectedTranslator,
    selectedQari,
    pageCounter,

    hasError,
    isLoading,
    refreshAll,
    pageError,
    tarjomehError,
    audioError,
    
    showPage,
    metaPage,
    surahMeta,
    juzsMeta,
    tarjomeh,
    audio,
    
    qari,
    translator,
    edition
  }
}