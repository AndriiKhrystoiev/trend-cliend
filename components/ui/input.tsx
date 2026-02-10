import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const inputVariants = cva(
  "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input w-full min-w-0 border bg-transparent shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:border-0 file:bg-transparent file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      size: {
        default: "h-9 rounded-sm px-3 py-1 text-base md:text-sm file:text-sm file:h-7",
        sm: "h-8 rounded-sm px-2.5 py-1 text-sm file:text-xs file:h-6",
        lg: "h-10 rounded-sm px-3 py-2 text-base md:text-sm file:text-sm file:h-7",
        xl: "h-12 rounded-sm px-4 py-3 text-base file:text-sm file:h-8",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

function Input({ className, type, readOnly, label, wrapperClassName, size, ...props }: Omit<React.ComponentProps<"input">, "size"> &
  VariantProps<typeof inputVariants> & {
    label?: string
    wrapperClassName?: string
  }
) {
  const input = (
    <input
      type={type}
      data-slot="input"
      data-size={size}
      readOnly={readOnly}
      className={cn(
        inputVariants({ size }),
        readOnly && "read-only:bg-white read-only:border-neutral-100 read-only:cursor-default read-only:shadow-none read-only:focus-visible:ring-0 read-only:focus-visible:border-neutral-100",
        className
      )}
      {...props}
    />
  )

  if (!label) return input

  return (
    <div className={cn("flex flex-col gap-1.5", wrapperClassName)}>
      <label className="text-sm font-semibold text-neutral-700">{label}</label>
      {input}
    </div>
  )
}

export { Input, inputVariants }
