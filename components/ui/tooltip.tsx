"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

const TooltipProvider = TooltipPrimitive.Provider

const TooltipArrow = TooltipPrimitive.Arrow

// Context for long-press touch support
const TouchTooltipContext = React.createContext<{
  onTouchStart: () => void
  onTouchEnd: () => void
  onTouchMove: () => void
} | null>(null)

function Tooltip({ children, ...props }: React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Root>) {
  const [open, setOpen] = React.useState(false)
  const touchTimer = React.useRef<ReturnType<typeof setTimeout>>(undefined)
  const closeTimer = React.useRef<ReturnType<typeof setTimeout>>(undefined)

  React.useEffect(() => {
    return () => {
      clearTimeout(touchTimer.current)
      clearTimeout(closeTimer.current)
    }
  }, [])

  const touchHandlers = React.useMemo(() => ({
    onTouchStart: () => {
      clearTimeout(closeTimer.current)
      touchTimer.current = setTimeout(() => setOpen(true), 500)
    },
    onTouchEnd: () => {
      clearTimeout(touchTimer.current)
      closeTimer.current = setTimeout(() => setOpen(false), 1500)
    },
    onTouchMove: () => {
      clearTimeout(touchTimer.current)
    },
  }), [])

  return (
    <TouchTooltipContext.Provider value={touchHandlers}>
      <TooltipPrimitive.Root open={open} onOpenChange={setOpen} {...props}>
        {children}
      </TooltipPrimitive.Root>
    </TouchTooltipContext.Provider>
  )
}

const TooltipTrigger = React.forwardRef<
  React.ComponentRef<typeof TooltipPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Trigger>
>(({ onTouchStart, onTouchEnd, onTouchMove, ...props }, ref) => {
  const touchCtx = React.useContext(TouchTooltipContext)

  return (
    <TooltipPrimitive.Trigger
      ref={ref}
      onTouchStart={(e) => {
        touchCtx?.onTouchStart()
        onTouchStart?.(e)
      }}
      onTouchEnd={(e) => {
        touchCtx?.onTouchEnd()
        onTouchEnd?.(e)
      }}
      onTouchMove={(e) => {
        touchCtx?.onTouchMove()
        onTouchMove?.(e)
      }}
      {...props}
    />
  )
})
TooltipTrigger.displayName = "TooltipTrigger"

const TooltipContent = React.forwardRef<
  React.ComponentRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> & {
    showArrow?: boolean
  }
>(({ className, sideOffset = 8, showArrow = true, children, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-2000 overflow-visible rounded-sm bg-neutral-800 px-2 py-1 text-sm text-white shadow-lg",
        "animate-in fade-in-0 zoom-in-95",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    >
      {children}
      {showArrow && (
        <TooltipArrow
          className="fill-neutral-800"
          width={12}
          height={6}
        />
      )}
    </TooltipPrimitive.Content>
  </TooltipPrimitive.Portal>
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider, TooltipArrow }
