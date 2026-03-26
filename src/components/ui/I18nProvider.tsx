import { useEffect } from 'react'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import es from '../../i18n/es.json'
import en from '../../i18n/en.json'
import { useAppStore } from '../../store/useAppStore'

export function I18nProvider() {
  const { locale } = useAppStore()

  useEffect(() => {
    if (!i18n.isInitialized) {
      i18n
        .use(initReactI18next)
        .init({
          resources: {
            es: { translation: es },
            en: { translation: en },
          },
          lng: locale,
          fallbackLng: 'es',
          interpolation: {
            escapeValue: false,
          },
        })
    } else {
      i18n.changeLanguage(locale)
    }
  }, [locale])

  return null
}