import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const textareaVariants = cva(
  "placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input w-full min-w-0 border bg-transparent shadow-xs transition-[color,box-shadow] outline-none resize-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      size: {
        default: "min-h-20 rounded-sm px-3 py-2 text-base md:text-sm",
        sm: "min-h-16 rounded-sm px-2.5 py-1.5 text-sm",
        lg: "min-h-24 rounded-sm px-3 py-2.5 text-base md:text-sm",
        xl: "min-h-32 rounded-sm px-4 py-3 text-base",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

function Textarea({ className, readOnly, label, wrapperClassName, size, ...props }: Omit<React.ComponentProps<"textarea">, "size"> &
  VariantProps<typeof textareaVariants> & {
    label?: string
    wrapperClassName?: string
  }
) {
  const textarea = (
    <textarea
      data-slot="textarea"
      data-size={size}
      readOnly={readOnly}
      className={cn(
        textareaVariants({ size }),
        readOnly && "read-only:bg-white read-only:border-neutral-100 read-only:cursor-default read-only:shadow-none read-only:focus-visible:ring-0 read-only:focus-visible:border-neutral-100",
        className
      )}
      {...props}
    />
  )

  if (!label) return textarea

  return (
    <div className={cn("flex flex-col gap-1.5", wrapperClassName)}>
      <label className="text-sm font-semibold text-neutral-700">{label}</label>
      {textarea}
    </div>
  )
}

export { Textarea, textareaVariants }
