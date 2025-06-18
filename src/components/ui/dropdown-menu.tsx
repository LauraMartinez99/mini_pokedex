import * as React from "react"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface DropdownMenuProps {
  trigger: React.ReactNode
  children: React.ReactNode
  className?: string
}

export function DropdownMenu({ trigger, children, className }: DropdownMenuProps) {
  const [open, setOpen] = React.useState(false)

  // Enhance children to provide closeMenu to DropdownMenuItem
  const enhancedChildren = React.Children.map(children, child => {
    if (
      React.isValidElement(child) &&
      (child.type as React.ComponentType).displayName === 'DropdownMenuItem'
    ) {
      return React.cloneElement(child as React.ReactElement<DropdownMenuItemProps>, { closeMenu: () => setOpen(false) });
    }
    return child;
  });

  return (
    <div className="relative">
      <Button
        variant="outline"
        role="combobox"
        aria-expanded={open}
        className={cn("w-full justify-between", className)}
        onClick={() => setOpen(!open)}
      >
        {trigger}
        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
      {open && (
        <div className="absolute z-50 mt-1 w-full rounded-md border bg-popover p-1 text-popover-foreground shadow-md">
          {enhancedChildren}
        </div>
      )}
    </div>
  )
}

interface DropdownMenuItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  closeMenu?: () => void
}

export function DropdownMenuItem({ children, className, closeMenu, onClick, ...props }: DropdownMenuItemProps) {
  return (
    <button
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
        className
      )}
      onClick={e => {
        onClick?.(e);
        closeMenu?.();
      }}
      {...props}
    >
      {children}
    </button>
  )
}

DropdownMenuItem.displayName = 'DropdownMenuItem'; 