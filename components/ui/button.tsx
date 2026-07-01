import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex h-10 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 neo-pressable",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[var(--neo-raised-sm)] hover:shadow-[var(--neo-raised)] active:shadow-[var(--neo-inset-sm)]",
        destructive:
          "bg-destructive text-destructive-foreground shadow-[var(--neo-raised-sm)] hover:shadow-[var(--neo-raised)] active:shadow-[var(--neo-inset-sm)]",
        outline:
          "border-0 bg-surface text-foreground shadow-[var(--neo-flat)] hover:bg-surface-hover hover:shadow-[var(--neo-raised-sm)]",
        secondary:
          "border-0 bg-surface-hover text-secondary-foreground shadow-[var(--neo-raised-sm)] hover:shadow-[var(--neo-raised)]",
        ghost:
          "text-muted-foreground shadow-none hover:bg-surface hover:shadow-[var(--neo-flat)] hover:text-foreground",
        link: "text-accent underline-offset-4 shadow-none hover:text-foreground hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-lg px-3",
        lg: "h-11 rounded-xl px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
