import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border-0 px-2.5 py-0.5 text-xs font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring",
  {
    variants: {
      variant: {
        default:
          "bg-surface text-foreground shadow-[var(--neo-flat)] hover:shadow-[var(--neo-raised-sm)]",
        secondary:
          "bg-surface-hover text-muted-foreground shadow-[var(--neo-inset-sm)] hover:text-foreground",
        destructive:
          "bg-destructive text-destructive-foreground shadow-[var(--neo-raised-sm)]",
        outline:
          "bg-surface text-muted-foreground shadow-[var(--neo-flat)]",
        pro: "bg-surface text-pro-gold shadow-[var(--neo-raised-sm)]",
        success: "bg-surface text-success shadow-[var(--neo-raised-sm)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
