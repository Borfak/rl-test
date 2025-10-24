import * as React from 'react'
import { cn } from '@/config/styles/utils'

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export const LabelComponent = React.forwardRef<HTMLLabelElement, LabelProps>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn(
      'text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
      className,
    )}
    {...props}
  />
))

LabelComponent.displayName = 'Label'
