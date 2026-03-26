import { Button } from './Button'
import { useAppStore } from '@/store/useAppStore'

export function LocaleToggle() {
  const { locale, setLocale } = useAppStore()

  const toggleLocale = () => {
    setLocale(locale === 'es' ? 'en' : 'es')
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLocale}
      className="w-12 px-0 font-mono text-sm"
    >
      {locale.toUpperCase()}
      <span className="sr-only">Toggle language</span>
    </Button>
  )
}