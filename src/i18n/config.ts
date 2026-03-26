import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import es from './es.json'
import en from './en.json'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      es: { translation: es },
      en: { translation: en },
    },
    lng: 'es',
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false,
    },
  })

// Sync with store
import { useAppStore } from '@/store/useAppStore'
const { locale } = useAppStore.getState()
i18n.changeLanguage(locale)

export default i18n