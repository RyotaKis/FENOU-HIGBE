import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import type { IconType } from "react-icons";

export const SOCIALS = [
  { label: "Facebook", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "TikTok", href: "#" },
];

const ICONS: Record<string, IconType> = {
  Facebook: FaFacebookF,
  Instagram: FaInstagram,
  TikTok: FaTiktok,
};

type SocialLinksProps = {
  variant?: "light" | "dark";
  size?: "sm" | "md";
  className?: string;
};

export function SocialLinks({
  variant = "light",
  size = "sm",
  className,
}: SocialLinksProps) {
  const dim = size === "sm" ? "h-8 w-8 text-xs" : "h-9 w-9 text-sm";
  const style =
    variant === "dark"
      ? "border-white/20 text-white/70 hover:border-brand-yellow hover:text-brand-yellow"
      : "border-neutral-200 text-neutral-500 hover:border-brand-orange hover:text-brand-orange";

  return (
    <ul className={`flex gap-3 ${className ?? ""}`}>
      {SOCIALS.map((s) => {
        const Icon = ICONS[s.label];
        return (
          <li key={s.label}>
            <a
              href={s.href}
              aria-label={s.label}
              className={`flex items-center justify-center border transition-colors ${dim} ${style}`}
            >
              <Icon />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
