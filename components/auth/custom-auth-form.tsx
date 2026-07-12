"use client";

import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { useSignIn, useSignUp } from "@clerk/nextjs";
import { ArrowLeft, Github } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, type ReactNode, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type AuthMode = "sign-in" | "sign-up";
type OAuthStrategy = "oauth_github" | "oauth_google";

interface CustomAuthFormProps {
  mode: AuthMode;
}

function clerkErrorMessage(error: unknown) {
  if (isClerkAPIResponseError(error)) {
    return (
      error.errors[0]?.longMessage ||
      error.errors[0]?.message ||
      "Authentication failed. Please try again."
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Authentication failed. Please try again.";
}

function SocialButton({
  children,
  disabled,
  icon,
  onClick,
}: {
  children: string;
  disabled: boolean;
  icon: ReactNode;
  onClick: () => void;
}) {
  return (
    <Button
      type="button"
      variant="outline"
      disabled={disabled}
      onClick={onClick}
      className="h-11 rounded-full bg-surface text-foreground shadow-[var(--neo-flat)] hover:bg-surface-hover hover:shadow-[var(--neo-raised-sm)] disabled:opacity-70"
    >
      {icon}
      <span className="font-semibold">{children}</span>
    </Button>
  );
}

export function CustomAuthForm({ mode }: CustomAuthFormProps) {
  const router = useRouter();
  const signInState = useSignIn();
  const signUpState = useSignUp();
  const isSignUp = mode === "sign-up";
  const isLoaded = isSignUp ? signUpState.isLoaded : signInState.isLoaded;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState<"details" | "verify">("details");

  const title = isSignUp ? "Create your account" : "Sign in to CodeBlocks";
  const subtitle = isSignUp
    ? "Welcome! Please fill in the details to get started."
    : "Welcome back! Please sign in to continue.";
  const switchHref = isSignUp ? "/sign-in" : "/sign-up";
  const switchText = isSignUp
    ? "Already have an account?"
    : "Don't have an account?";
  const switchAction = isSignUp ? "Sign in" : "Sign up";

  async function handleOAuth(strategy: OAuthStrategy) {
    if (!isLoaded) return;

    setError("");
    setIsSubmitting(true);

    try {
      const authResource = isSignUp
        ? signUpState.signUp
        : signInState.signIn;

      await authResource?.authenticateWithRedirect({
        strategy,
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/",
      });
    } catch (authError) {
      setError(clerkErrorMessage(authError));
      setIsSubmitting(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isLoaded) return;

    setError("");
    setIsSubmitting(true);

    try {
      if (isSignUp) {
        const { signUp, setActive } = signUpState;

        if (step === "verify") {
          const result = await signUp?.attemptEmailAddressVerification({
            code,
          });

          if (result?.status === "complete") {
            if (!setActive) {
              setError("Your account was created, but the session could not start.");
              return;
            }

            await setActive({ session: result.createdSessionId });
            router.push("/");
            return;
          }

          setError("Verification is not complete yet. Please try again.");
          return;
        }

        await signUp?.create({
          emailAddress: email,
          password,
          firstName: firstName || undefined,
          lastName: lastName || undefined,
        });

        await signUp?.prepareEmailAddressVerification({
          strategy: "email_code",
        });

        setStep("verify");
        return;
      }

      const { signIn, setActive } = signInState;
      const result = await signIn?.create({
        identifier: email,
        password,
      });

      if (result?.status === "complete") {
        if (!setActive) {
          setError("You signed in, but the session could not start.");
          return;
        }

        await setActive({ session: result.createdSessionId });
        router.push("/");
        return;
      }

      setError("This sign-in needs another verification step.");
    } catch (authError) {
      setError(clerkErrorMessage(authError));
    } finally {
      setIsSubmitting(false);
    }
  }

  const primaryLabel =
    step === "verify"
      ? isSubmitting
        ? "Verifying..."
        : "Verify email"
      : isSubmitting
        ? "Please wait..."
        : "Continue";

  return (
    <section className="relative w-[min(92vw,28rem)] rounded-[1.75rem] bg-surface p-7 text-foreground shadow-[var(--neo-raised-lg)] sm:p-8">
      <Link
        href="/"
        aria-label="Back to homepage"
        className="absolute left-5 top-5 inline-flex size-9 items-center justify-center rounded-full bg-surface text-foreground shadow-[var(--neo-flat)] transition hover:-translate-y-0.5 hover:shadow-[var(--neo-raised-sm)]"
      >
        <ArrowLeft aria-hidden="true" className="size-4" />
      </Link>

      <div className="space-y-2 pt-5 text-center">
        <h1 className="text-xl font-bold text-foreground">{title}</h1>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>

      {step === "details" ? (
        <div className="mt-7 grid grid-cols-2 gap-3">
          <SocialButton
            disabled={!isLoaded || isSubmitting}
            icon={<Github aria-hidden="true" className="size-4" />}
            onClick={() => handleOAuth("oauth_github")}
          >
            GitHub
          </SocialButton>
          <SocialButton
            disabled={!isLoaded || isSubmitting}
            icon={
              <span
                aria-hidden="true"
                className="text-base font-black text-foreground"
              >
                G
              </span>
            }
            onClick={() => handleOAuth("oauth_google")}
          >
            Google
          </SocialButton>
        </div>
      ) : null}

      {step === "details" ? (
        <div className="my-7 flex items-center gap-5 text-sm text-muted-foreground">
          <span className="h-px flex-1 bg-border-muted" />
          <span>or</span>
          <span className="h-px flex-1 bg-border-muted" />
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        {step === "verify" ? (
          <div className="space-y-2">
            <Label htmlFor="verification-code">Verification code</Label>
            <Input
              id="verification-code"
              value={code}
              onChange={(event) => setCode(event.target.value)}
              placeholder="Enter the code from your email"
              autoComplete="one-time-code"
              required
              className="h-12 bg-surface-hover"
            />
          </div>
        ) : (
          <>
            {isSignUp ? (
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input
                    id="first-name"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                    placeholder="First name"
                    autoComplete="given-name"
                    className="h-12 bg-surface-hover"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input
                    id="last-name"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                    placeholder="Last name"
                    autoComplete="family-name"
                    className="h-12 bg-surface-hover"
                  />
                </div>
              </div>
            ) : null}

            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email address"
                autoComplete="email"
                required
                className="h-12 bg-surface-hover"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                autoComplete={isSignUp ? "new-password" : "current-password"}
                required
                className="h-12 bg-surface-hover"
              />
            </div>
          </>
        )}

        {error ? (
          <p className="rounded-xl bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </p>
        ) : null}

        <Button
          type="submit"
          disabled={!isLoaded || isSubmitting}
          className={cn(
            "h-12 w-full bg-accent text-accent-foreground shadow-[var(--neo-raised-sm)] hover:bg-accent-hover hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-100",
            (!isLoaded || isSubmitting) &&
              "bg-accent text-accent-foreground shadow-[var(--neo-raised-sm)]",
          )}
        >
          {primaryLabel}
          <span aria-hidden="true">›</span>
        </Button>
      </form>

      <p className="mt-5 text-center text-sm text-muted-foreground">
        {switchText}{" "}
        <Link href={switchHref} className="font-bold text-foreground">
          {switchAction}
        </Link>
      </p>
    </section>
  );
}
