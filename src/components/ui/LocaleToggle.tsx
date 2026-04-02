import { useAppStore } from '@/store/useAppStore'
import { cn } from '@/utils/cn'

export function LocaleToggle() {
  const { locale, setLocale } = useAppStore()

  return (
    <div className="flex bg-card/40 backdrop-blur-md rounded-full p-1 border border-border/50 shadow-inner">
      <button
        onClick={() => setLocale('es')}
        className={cn(
          "px-3 py-1 text-xs font-bold rounded-full transition-all duration-300",
          locale === 'es' 
            ? "bg-primary text-bg shadow-[0_0_15px_rgba(59,130,246,0.5)] scale-105" 
            : "text-secondary hover:text-primary"
        )}
      >
        ES
      </button>
      <button
        onClick={() => setLocale('en')}
        className={cn(
          "px-3 py-1 text-xs font-bold rounded-full transition-all duration-300",
          locale === 'en' 
            ? "bg-primary text-bg shadow-[0_0_15px_rgba(59,130,246,0.5)] scale-105" 
            : "text-secondary hover:text-primary"
        )}
      >
        EN
      </button>
    </div>
  )
}