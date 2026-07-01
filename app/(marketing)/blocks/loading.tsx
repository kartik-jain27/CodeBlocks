export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="h-8 w-28 animate-pulse rounded-md bg-surface-hover" />
      <div className="mt-5 h-14 max-w-2xl animate-pulse rounded-md bg-surface-hover" />
      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-80 animate-pulse rounded-lg shadow-[var(--neo-raised-sm)] bg-surface"
          />
        ))}
      </div>
    </div>
  );
}
