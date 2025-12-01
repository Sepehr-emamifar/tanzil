// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: ['@nuxt/ui'],
  app: {
    head: {
      title: 'Tanzil',
      meta: [
        { name: 'description', content: 'Tanzil Quran Navigator'},
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1'}
      ],
      link: [
        { rel: 'icon', href: '/tanzil.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { 
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Scheherazade+New:wght@400;700&family=Noto+Sans+Arabic:wght@400;700&display=swap'
        }
      ]
    }
  },

  css: ["~/assets/css/main.css"],
  colorMode: {
    preference: 'default'
  },
  routeRules: {
    '/': { redirect: '/quran' }
  },
   icon: {
    serverBundle: {
      collections: ['lucide', 'heroicons']
    }
  }

})