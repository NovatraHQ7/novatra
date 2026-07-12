const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function getEmailError(value: string): string | undefined {
  const trimmed = value.trim();
  if (!trimmed) return "Email is required.";
  if (!EMAIL_PATTERN.test(trimmed)) return "Enter a valid email address.";
  return undefined;
}

export function getPasswordError(
  value: string,
  minLength = 8
): string | undefined {
  if (!value) return "Password is required.";
  if (value.length < minLength) return `Use at least ${minLength} characters.`;
  return undefined;
}

export function getRequiredError(
  value: string,
  label: string
): string | undefined {
  return value.trim() ? undefined : `${label} is required.`;
}
