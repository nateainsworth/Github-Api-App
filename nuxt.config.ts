// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  generate:{
    nojekyll: true,
  },
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss','@pinia/nuxt','dayjs-nuxt'],
  alias:{
    assets: "/<rootDir>/assets"
  },
  app: {
    baseURL: '/Github-Api-App/',
    buildAssetsDir: 'assets',
    head: {
      title: 'Github Rest API',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Simple website making use of github rest API in a GUI' },
      ],
    }
  },
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.js',
    exposeConfig: false,
    injectPosition: 0,
    viewer: true,
  },
  imports: {
    dirs: ['services'],
  },
  runtimeConfig: {
    public:{
      apiToken: process.env.GITHUB_API_TOKEN,
    }
  }
})
