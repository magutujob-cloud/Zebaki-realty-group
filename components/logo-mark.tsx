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
        src="/logo.svg"
        alt={`${BRAND.name} logo`}
        width={48}
        height={48}
        className="h-12 w-12 rounded-2xl"
        priority
      />
      {!compact ? (
        <div>
          <p className="font-semibold text-slate-950">{BRAND.name}</p>
          <p className="text-sm text-slate-500">{BRAND.tagline}</p>
        </div>
      ) : null}
    </Link>
  );
}
