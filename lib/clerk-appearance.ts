import type { Appearance } from "@clerk/types";

export const clerkAppearance: Appearance = {
  layout: {
    socialButtonsVariant: "blockButton",
    socialButtonsPlacement: "top",
  },
  variables: {
    colorPrimary: "var(--accent)",
    colorPrimaryForeground: "var(--accent-foreground)",
    colorBackground: "var(--surface)",
    colorForeground: "var(--foreground)",
    colorInput: "var(--surface-hover)",
    colorInputForeground: "var(--foreground)",
    colorMuted: "var(--surface-hover)",
    colorMutedForeground: "var(--muted)",
    colorNeutral: "var(--foreground)",
    colorText: "var(--foreground)",
    colorTextSecondary: "var(--muted)",
    colorDanger: "var(--destructive)",
    colorBorder: "var(--border-muted)",
    colorRing: "var(--ring)",
    colorShadow: "rgba(0, 0, 0, 0.28)",
    borderRadius: "var(--radius)",
    fontFamily: "var(--font-sans)",
  },
  elements: {
    cardBox: {
      backgroundColor: "var(--surface)",
      border: "0",
      borderRadius: "calc(var(--radius) + 0.5rem)",
      boxShadow: "var(--neo-raised-lg)",
      overflow: "hidden",
    },
    card: {
      backgroundColor: "var(--surface)",
      border: "0",
      boxShadow: "none",
      gap: "1.5rem",
    },
    headerTitle: {
      color: "var(--foreground)",
      fontWeight: "700",
      letterSpacing: "0",
    },
    headerSubtitle: {
      color: "var(--muted)",
    },
    socialButtonsBlockButton: {
      backgroundColor: "var(--surface)",
      border: "0",
      borderRadius: "999px",
      boxShadow: "var(--neo-flat)",
      color: "var(--foreground)",
      minHeight: "44px",
      transition: "box-shadow 180ms ease, transform 180ms ease",
      "&:hover, &:focus": {
        backgroundColor: "var(--surface-hover)",
        boxShadow: "var(--neo-raised-sm)",
      },
      "&:active": {
        boxShadow: "var(--neo-inset-sm)",
        transform: "translateY(1px)",
      },
    },
    socialButtonsBlockButtonText: {
      color: "var(--foreground)",
      fontWeight: "600",
    },
    dividerLine: {
      backgroundColor: "var(--border-muted)",
    },
    dividerText: {
      color: "var(--muted)",
    },
    formFieldLabel: {
      color: "var(--foreground)",
      fontWeight: "600",
    },
    formFieldInput: {
      backgroundColor: "var(--surface-hover)",
      border: "0",
      borderRadius: "var(--radius)",
      boxShadow: "var(--neo-inset-sm)",
      color: "var(--foreground)",
      minHeight: "46px",
      caretColor: "var(--foreground)",
      transition: "box-shadow 180ms ease",
      "&:focus": {
        boxShadow: "var(--neo-inset), 0 0 0 2px var(--ring)",
      },
      "&:-webkit-autofill": {
        boxShadow:
          "var(--neo-inset-sm), 0 0 0 1000px var(--surface-hover) inset",
        WebkitTextFillColor: "var(--foreground)",
      },
    },
    formFieldInputShowPasswordButton: {
      color: "var(--muted)",
    },
    formButtonPrimary: {
      backgroundColor: "var(--accent)",
      border: "0",
      borderRadius: "var(--radius)",
      boxShadow: "var(--neo-raised-sm)",
      color: "var(--accent-foreground)",
      fontWeight: "700",
      minHeight: "46px",
      opacity: "1",
      transition: "box-shadow 180ms ease, transform 180ms ease",
      "&:hover, &:focus": {
        backgroundColor: "var(--accent-hover)",
        boxShadow: "var(--neo-raised)",
        color: "var(--accent-foreground)",
      },
      "&:active": {
        boxShadow: "var(--neo-inset-sm)",
        transform: "translateY(1px)",
      },
      "&:disabled": {
        backgroundColor: "var(--accent)",
        boxShadow: "var(--neo-flat)",
        color: "var(--accent-foreground)",
        opacity: "0.82",
      },
    },
    footer: {
      backgroundColor: "var(--surface-hover)",
      borderTop: "1px solid var(--border-muted)",
    },
    footerPagesLink: {
      color: "var(--muted)",
    },
    footerActionText: {
      color: "var(--muted)",
    },
    footerActionLink: {
      color: "var(--foreground)",
      fontWeight: "700",
    },
    identityPreviewText: {
      color: "var(--foreground)",
    },
    formResendCodeLink: {
      color: "var(--foreground)",
      fontWeight: "700",
    },
    userButtonPopoverCard: {
      backgroundColor: "var(--surface)",
      border: "0",
      borderRadius: "calc(var(--radius) + 0.25rem)",
      boxShadow: "var(--neo-raised-lg)",
    },
    userButtonPopoverActionButton: {
      color: "var(--foreground)",
      borderRadius: "var(--radius)",
    },
    userButtonPopoverActionButtonText: {
      color: "var(--foreground)",
    },
    userButtonPopoverFooter: {
      backgroundColor: "var(--surface-hover)",
      borderTop: "1px solid var(--border-muted)",
    },
  },
};
