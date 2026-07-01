export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="h-8 w-24 animate-pulse rounded-md bg-surface-hover" />
      <div className="mt-5 h-14 max-w-xl animate-pulse rounded-md bg-surface-hover" />
      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-96 animate-pulse rounded-lg shadow-[var(--neo-raised-sm)] bg-surface"
          />
        ))}
      </div>
    </div>
  );
}
