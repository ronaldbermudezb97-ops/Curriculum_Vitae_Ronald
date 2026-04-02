import { useEffect } from 'react'
import i18n from '../../i18n/config'
import { useAppStore } from '../../store/useAppStore'

export function I18nProvider() {
  const { locale } = useAppStore()

  useEffect(() => {
    if (i18n.language !== locale) {
      i18n.changeLanguage(locale)
    }
  }, [locale])

  return null
}