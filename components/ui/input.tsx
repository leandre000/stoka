import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<   
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 hover:border-ring/50 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:placeholder:text-neutral-400 dark:focus-visible:ring-ring dark:focus-visible:ring-offset-neutral-900",
        className
      )}
      ref={ref}
      {...props}

      //input
    />
  )
})
Input.displayName = "Input"

export { Input }
