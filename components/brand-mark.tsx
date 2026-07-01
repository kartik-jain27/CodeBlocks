import Image from "next/image";

export function BrandMark() {
  return (
    <span className="relative flex size-8 shrink-0 overflow-hidden rounded-xl shadow-[var(--logo-shadow)]">
      <Image
        src="/brand/codeblocks-day.jpg"
        alt=""
        aria-hidden="true"
        className="brand-mark-image brand-mark-image--day"
        height={32}
        width={32}
      />
      <Image
        src="/brand/codeblocks-night.png"
        alt=""
        aria-hidden="true"
        className="brand-mark-image brand-mark-image--night"
        height={32}
        width={32}
      />
    </span>
  );
}
