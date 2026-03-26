import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'

const cardVariants = cva(
  'rounded-lg border bg-card p-6 shadow-sm transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'border-border',
        project: 'border-primary/20 hover:border-primary/40 hover:shadow-lg',
        skill: 'border-accent/20 hover:border-accent/40',
        testimonial: 'border-secondary/20 hover:border-secondary/40',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

interface CardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'project' | 'skill' | 'testimonial'
  children: React.ReactNode
}

export function Card({ variant, className, children, ...props }: CardProps) {
  return (
    <div className={cn(cardVariants({ variant }), className)} {...props}>
      {children}
    </div>
  )
}