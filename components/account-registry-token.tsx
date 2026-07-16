"use client";

import { KeyRound, Terminal } from "lucide-react";
import { useMemo, useState } from "react";

import { CopyCommandButton } from "@/components/marketing/copy-command-button";
import { RotateTokenButton } from "@/components/rotate-token-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AccountRegistryTokenProps {
  appUrl: string;
  initialRegistryToken: string | null;
  unavailableMessage: string;
}

export function AccountRegistryToken({
  appUrl,
  initialRegistryToken,
  unavailableMessage,
}: AccountRegistryTokenProps) {
  const [registryToken, setRegistryToken] = useState(initialRegistryToken);
  const configSnippet = useMemo(
    () => `{
  "registries": {
    "codeblocks": {
      "url": "${appUrl}/r/pro/{name}",
      "headers": {
        "Authorization": "Bearer ${registryToken ?? "<no token available>"}"
      }
    }
  }
}`,
    [appUrl, registryToken],
  );

  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <KeyRound aria-hidden="true" className="size-5" />
            Registry token
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-xl bg-surface p-3 font-mono text-xs text-muted-foreground shadow-[var(--neo-inset-sm)]">
            {registryToken ?? unavailableMessage}
          </div>
          {registryToken ? (
            <>
              <div className="mt-4 flex flex-wrap items-start gap-3">
                <CopyCommandButton
                  command={registryToken}
                  label="Copy registry token"
                />
                <RotateTokenButton onRotated={setRegistryToken} />
              </div>
              <p className="mt-3 text-xs leading-6 text-muted-foreground">
                Rotating your token immediately invalidates the old one for Pro
                registry installs.
              </p>
            </>
          ) : null}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Terminal aria-hidden="true" className="size-5" />
            components.json
          </CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="overflow-x-auto rounded-xl bg-surface p-4 text-xs text-muted-foreground shadow-[var(--neo-inset-sm)]">
            <code>{configSnippet}</code>
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
