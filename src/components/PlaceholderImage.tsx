const GRADIENTS = [
  "linear-gradient(135deg, var(--color-brand-green) 0%, var(--color-brand-green-deep) 100%)",
  "linear-gradient(135deg, var(--color-brand-orange) 0%, var(--color-brand-yellow) 100%)",
  "linear-gradient(135deg, var(--color-ink) 0%, var(--color-brand-green-deep) 100%)",
  "linear-gradient(135deg, var(--color-brand-yellow) 0%, var(--color-brand-orange) 100%)",
];

const DOT_PATTERN =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='2' cy='2' r='2' fill='%23ffffff' fill-opacity='0.18'/%3E%3C/svg%3E";

function seedIndex(seed: string, mod: number) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return hash % mod;
}

type PlaceholderImageProps = {
  /** Description used for a11y and as a dev marker — describe the real photo that should replace this. */
  description: string;
  aspectRatio?: string;
  className?: string;
  seed?: string;
};

// TODO(assets): PlaceholderImage instances should be swapped for real photography
// once the client supplies event/product images — see each call site's `description`.
export function PlaceholderImage({
  description,
  aspectRatio = "4/3",
  className,
  seed,
}: PlaceholderImageProps) {
  const gradient = GRADIENTS[seedIndex(seed ?? description, GRADIENTS.length)];

  return (
    <div
      role="img"
      aria-label={description}
      className={`relative overflow-hidden ${className ?? ""}`}
      style={{
        aspectRatio,
        backgroundImage: `${gradient}, url("${DOT_PATTERN}")`,
        backgroundSize: "cover, 40px 40px",
      }}
    />
  );
}
