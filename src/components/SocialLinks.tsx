import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import type { IconType } from "react-icons";
import type { SocialLink, SocialPlatform } from "@/lib/socialLinks";

const ICONS: Record<SocialPlatform, IconType> = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  tiktok: FaTiktok,
  whatsapp: FaWhatsapp,
  youtube: FaYoutube,
  linkedin: FaLinkedinIn,
};

const LABELS: Record<SocialPlatform, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  tiktok: "TikTok",
  whatsapp: "WhatsApp",
  youtube: "YouTube",
  linkedin: "LinkedIn",
};

type SocialLinksProps = {
  links: SocialLink[];
  variant?: "light" | "dark";
  size?: "sm" | "md";
  className?: string;
};

export function SocialLinks({
  links,
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
      {links.map((link) => {
        const Icon = ICONS[link.platform];
        return (
          <li key={link.platform}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={LABELS[link.platform]}
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
