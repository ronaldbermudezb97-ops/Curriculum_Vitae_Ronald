import { Button } from './Button'
import { useAppStore } from '@/store/useAppStore'

export function ThemeToggle() {
  const { isDark, toggleTheme } = useAppStore()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="w-9 px-0"
    >
      {isDark ? '☀️' : '🌙'}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}