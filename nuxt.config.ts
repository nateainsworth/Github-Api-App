// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  generate:{
    nojekyll: true,
  },
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  alias:{
    assets: "/<rootDir>/assets"
  },
  app: {
    baseURL: '/Github-Api-App/',
  },
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.js',
    exposeConfig: false,
    injectPosition: 0,
    viewer: true,
  },
})
