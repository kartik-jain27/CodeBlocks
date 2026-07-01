interface WireframePreviewProps {
  category: string;
  layout?: "split" | "center" | "top";
}

export function WireframePreview({
  category,
  layout = "center",
}: WireframePreviewProps) {
  const bar = (w: string, h = "h-2") => (
    <div className={`${h} ${w} rounded-sm bg-muted-foreground/35`} />
  );
  const dot = "rounded-full bg-muted-foreground/35";

  const previews: Record<string, React.ReactNode> = {
    hero: (
      <div className="flex h-full flex-col justify-between py-7">
        <div className="flex justify-center">
          {bar("w-20", "h-2")}
        </div>
        <div className="flex justify-center gap-2">
          {bar("w-16", "h-5")}
          {bar("w-16", "h-5")}
        </div>
      </div>
    ),
    features: (
      <div className="grid h-full grid-cols-3 gap-4 border-t border-border-muted/80 px-5 pt-8">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <div className={`h-4 w-4 ${dot}`} />
            {bar("w-12", "h-2")}
            {bar("w-14", "h-1.5")}
          </div>
        ))}
      </div>
    ),
    pricing: (
      <div className="grid h-full grid-cols-3 gap-2 px-5 pb-4 pt-16">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className={`flex flex-col gap-2 rounded-md p-2 ${
              index === 1
                ? "border border-border-muted bg-muted-foreground/10"
                : ""
            }`}
          >
            {bar("w-14", "h-2")}
            {bar("w-10", "h-4")}
            {bar("w-full", "h-1.5")}
            {bar("w-full", "h-1.5")}
            {bar("w-full", "h-5")}
          </div>
        ))}
      </div>
    ),
    auth: (
      <div className="relative h-full">
        <div className="absolute inset-y-0 left-[54%] w-px bg-border-muted/90" />
        <div className="absolute right-6 top-1/2 flex w-[30%] -translate-y-1/2 flex-col gap-3">
          <div className="mx-auto h-6 w-16 rounded-full bg-muted-foreground/25" />
          {bar("w-full", "h-2.5")}
          {bar("w-full", "h-2.5")}
          {bar("w-full", "h-6")}
        </div>
      </div>
    ),
    cta: (
      <div className="relative h-full">
        <div className="absolute inset-x-0 bottom-14 grid h-9 grid-cols-[1fr_1fr] border-y border-border-muted/80">
          <div className="border-r border-border-muted/80" />
          <div className="flex items-center justify-center gap-3 px-4">
            {bar("w-16", "h-5")}
            {bar("w-16", "h-5")}
          </div>
        </div>
      </div>
    ),
    dashboard: (
      <div className="relative h-full overflow-hidden rounded-md border border-border-muted/90">
        <div className="absolute left-0 top-0 h-full w-2 border-r border-border-muted/90">
          {Array.from({ length: 7 }).map((_, index) => (
            <div
              key={index}
              className="mx-auto mt-2 h-1 w-1 rounded-full bg-muted-foreground/25"
            />
          ))}
        </div>
        <div className="ml-3 grid h-full grid-rows-[1fr_1.3fr_0.8fr]">
          <div className="grid grid-cols-4 border-b border-border-muted/90">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="border-r border-border-muted/90 p-2 last:border-r-0"
              >
                {bar("w-10", "h-1.5")}
                {bar("w-full", "h-3")}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-[3fr_1fr] border-b border-border-muted/90">
            <div className="flex items-end gap-1 px-3 pb-3">
              {["h-4", "h-5", "h-7", "h-9", "h-6", "h-5", "h-8", "h-9"].map(
                (height, index) => (
                  <div
                    key={`${height}-${index}`}
                    className={`${height} flex-1 rounded-t-sm bg-muted-foreground/25`}
                  />
                ),
              )}
            </div>
            <div className="flex items-end gap-1 border-l border-border-muted/90 px-2 pb-3">
              {["h-3", "h-5", "h-7", "h-10", "h-12", "h-14"].map(
                (height, index) => (
                  <div
                    key={`${height}-${index}`}
                    className={`${height} flex-1 rounded-t-sm bg-muted-foreground/25`}
                  />
                ),
              )}
            </div>
          </div>
          <div className="grid grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="border-r border-border-muted/90 p-2 last:border-r-0"
              >
                {bar("w-10", "h-1.5")}
                {bar("w-full", "h-2")}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    "app-shell": (
      <div className="relative h-full">
        <div className="absolute inset-y-0 right-0 w-[54%] border-l border-border-muted/90">
          <div className="absolute inset-x-0 top-0 flex h-6 items-center gap-2 border-b border-border-muted/90 px-3">
            {bar("w-12", "h-1.5")}
            <div className="ml-auto flex gap-1">
              <div className={`h-1.5 w-1.5 ${dot}`} />
              <div className={`h-1.5 w-1.5 ${dot}`} />
              <div className={`h-1.5 w-1.5 ${dot}`} />
            </div>
          </div>
          <div className="grid h-full grid-cols-[0.55fr_1.45fr] pt-6">
            <div className="border-r border-border-muted/90 p-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="mb-1.5 h-2 rounded-sm bg-muted-foreground/25"
                />
              ))}
              <div className="mt-9 h-8 rounded-sm border border-border-muted/90" />
            </div>
            <div className="p-2">
              <div className="grid grid-cols-4 gap-1.5">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-8 rounded-sm border border-border-muted/90"
                  />
                ))}
              </div>
              <div className="mt-2 h-14 rounded-md border border-border-muted/90" />
            </div>
          </div>
        </div>
      </div>
    ),
  };

  const layoutClasses = {
    split: "absolute inset-0",
    center: "absolute inset-5",
    top: "absolute inset-x-5 bottom-5 top-[5.25rem]",
  };

  return (
    <div className="relative h-full w-full overflow-hidden opacity-75 transition-opacity duration-150 group-hover:opacity-100">
      <div className={layoutClasses[layout]}>
        {previews[category] ?? (
          <div className="flex flex-col gap-1.5">
            {bar("w-3/4", "h-2")}
            {bar("w-full", "h-2")}
            {bar("w-2/3", "h-2")}
          </div>
        )}
      </div>
    </div>
  );
}
