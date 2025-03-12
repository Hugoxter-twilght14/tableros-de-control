import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="font-extrabold text-2xl text-[#00FFFF]">
      <Image src="/iconos/inelac-logo.webp" alt="Logo inelac" title="inelac" width={220} height={220}/>
    </Link>
  );
}
