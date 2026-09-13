const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const MAX_LENGTHS = {
  nom: 100,
  email: 254,
  message: 3000,
} as const;

export function isValidEmail(value: unknown): value is string {
  return (
    typeof value === "string" &&
    value.length <= MAX_LENGTHS.email &&
    EMAIL_RE.test(value)
  );
}

export function isValidText(value: unknown, maxLength: number): value is string {
  return (
    typeof value === "string" &&
    value.trim().length > 0 &&
    value.length <= maxLength
  );
}
