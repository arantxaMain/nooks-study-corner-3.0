import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import '../styles/components/Progress.css'

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className="progress-root"
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="progress-indicator"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
