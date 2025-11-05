import { cn } from '@/config/styles/utils'
import * as React from 'react'
import { Label } from '../label'

interface FormFieldContextValue {
  name: string
}

const FormFieldContext = React.createContext<FormFieldContextValue>({} as FormFieldContextValue)

export const FormFieldComponent = ({ name, children }: { name: string; children: React.ReactNode }) => {
  return <FormFieldContext.Provider value={{ name }}>{children}</FormFieldContext.Provider>
}

export const FormItemComponent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn('space-y-2', className)} {...props} />
  },
)
FormItemComponent.displayName = 'FormItem'

export const FormLabelComponent = React.forwardRef<
  React.ElementRef<typeof Label>,
  React.ComponentPropsWithoutRef<typeof Label>
>(({ className, ...props }, ref) => {
  return <Label ref={ref} className={cn(className)} {...props} />
})
FormLabelComponent.displayName = 'FormLabel'

export const FormControlComponent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ ...props }, ref) => {
    return <div ref={ref} {...props} />
  },
)
FormControlComponent.displayName = 'FormControl'

export const FormDescriptionComponent = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return <p ref={ref} className={cn('text-muted-foreground text-sm', className)} {...props} />
})
FormDescriptionComponent.displayName = 'FormDescription'

export const FormMessageComponent = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <p ref={ref} className={cn('text-destructive text-sm font-medium', className)} {...props}>
        {children}
      </p>
    )
  },
)
FormMessageComponent.displayName = 'FormMessage'
