"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ToolbarButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}

const ToolbarButton = React.forwardRef<HTMLButtonElement, ToolbarButtonProps>(
  ({ className, active, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "h-8 w-8 flex items-center justify-center border border-neutral-100 bg-neutral-25 rounded-sm text-neutral-400 hover:bg-neutral-50 transition-colors",
          active && "bg-neutral-50",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
ToolbarButton.displayName = "ToolbarButton";

interface ToolbarButtonGroupProps {
  children: React.ReactNode;
  className?: string;
}

function ToolbarButtonGroup({ children, className }: ToolbarButtonGroupProps) {
  return (
    <div
      className={cn(
        "flex items-center border border-neutral-100 rounded-sm overflow-hidden",
        className
      )}
    >
      {children}
    </div>
  );
}

interface ToolbarButtonGroupItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}

const ToolbarButtonGroupItem = React.forwardRef<HTMLButtonElement, ToolbarButtonGroupItemProps>(
  ({ className, active, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "h-[30px] w-8 flex items-center justify-center text-sm font-medium text-neutral-400 bg-neutral-25 hover:bg-neutral-50 border-r border-neutral-100 border-t-0 border-b-0 last:border-r-0 transition-colors",
          disabled && "bg-neutral-50 text-neutral-300",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
ToolbarButtonGroupItem.displayName = "ToolbarButtonGroupItem";

export { ToolbarButton, ToolbarButtonGroup, ToolbarButtonGroupItem };
