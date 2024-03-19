export default defineNuxtConfig({
  devtools: { enabled: true },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "~/assets/css/main.scss" as *;
          `,
        }
      }
    }
  },
  modules: [
    '@pinia/nuxt',
  ],
  pinia: {
    storesDirs: ['./stores/**'],
  },
  imports: {
    dirs: ['/stores/**', './hooks/*.ts'],
  },
})
