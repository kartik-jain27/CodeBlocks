import { Github, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface AuthOneProps {
  title?: string;
  description?: string;
}

export function AuthOne({
  title = "Welcome back",
  description = "Sign in to continue to your workspace.",
}: AuthOneProps) {
  return (
    <section className="flex min-h-[560px] items-center justify-center px-4 py-16">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2">
            <Button variant="outline">
              <Github aria-hidden="true" />
              GitHub
            </Button>
            <Button variant="outline">
              <Mail aria-hidden="true" />
              Google
            </Button>
          </div>
          <div className="my-6 flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-xs uppercase text-muted-foreground">or</span>
            <Separator className="flex-1" />
          </div>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" />
            </div>
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            New here? <span className="font-medium text-foreground">Create account</span>
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
