import Image from "next/image";
import Link from "next/link";
import { BRAND } from "@/lib/constants";

type Props = {
  compact?: boolean;
};

export function LogoMark({ compact = false }: Props) {
  return (
    <Link href="/" className="flex items-center gap-3">
      <Image
        src="/serena-logo-mark.png"
        alt={`${BRAND.name} logo`}
        width={64}
        height={64}
        className={compact ? "h-10 w-10 rounded-2xl" : "h-12 w-12 rounded-2xl"}
        priority
      />
      {!compact ? (
        <div>
          <p className="font-semibold text-current">{BRAND.name}</p>
          <p className="text-sm text-violet-300/80">{BRAND.tagline}</p>
        </div>
      ) : null}
    </Link>
  );
}
