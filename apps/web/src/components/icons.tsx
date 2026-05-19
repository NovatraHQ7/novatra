export function Icon({
  name,
  className,
}: {
  name:
    | "arrowRight"
    | "bolt"
    | "check"
    | "chevronRight"
    | "creditCard"
    | "exchange"
    | "globe"
    | "google"
    | "logout"
    | "plus"
    | "receipt"
    | "search"
    | "shield"
    | "sparkles"
    | "user"
    | "wallet";
  className?: string;
}) {
  const common = { className: className ?? "h-4 w-4", fill: "none" as const };
  switch (name) {
    case "sparkles":
      return (
        <svg viewBox="0 0 24 24" {...common} stroke="currentColor">
          <path
            strokeWidth="1.8"
            strokeLinecap="round"
            d="M12 2l1.2 4.4L18 8l-4.8 1.6L12 14l-1.2-4.4L6 8l4.8-1.6L12 2Z"
          />
          <path
            strokeWidth="1.8"
            strokeLinecap="round"
            d="M5 12l.8 2.9L9 16l-3.2 1.1L5 20l-.8-2.9L1 16l3.2-1.1L5 12Z"
            opacity="0.8"
          />
        </svg>
      );
    case "bolt":
      return (
        <svg viewBox="0 0 24 24" {...common} stroke="currentColor">
          <path
            strokeWidth="1.8"
            strokeLinejoin="round"
            d="M13 2L3 14h8l-1 8 11-14h-8l0-6Z"
          />
        </svg>
      );
    case "globe":
      return (
        <svg viewBox="0 0 24 24" {...common} stroke="currentColor">
          <circle cx="12" cy="12" r="9" strokeWidth="1.8" />
          <path
            strokeWidth="1.8"
            strokeLinecap="round"
            d="M3.5 12h17M12 3c3.2 3.4 3.2 14.6 0 18M12 3c-3.2 3.4-3.2 14.6 0 18"
            opacity="0.9"
          />
        </svg>
      );
    case "shield":
      return (
        <svg viewBox="0 0 24 24" {...common} stroke="currentColor">
          <path
            strokeWidth="1.8"
            strokeLinejoin="round"
            d="M12 2 20 5v7c0 5-3.4 9.4-8 10-4.6-.6-8-5-8-10V5l8-3Z"
          />
        </svg>
      );
    case "exchange":
      return (
        <svg viewBox="0 0 24 24" {...common} stroke="currentColor">
          <path
            strokeWidth="1.8"
            strokeLinecap="round"
            d="M7 7h13l-3-3M17 17H4l3 3"
          />
        </svg>
      );
    case "creditCard":
      return (
        <svg viewBox="0 0 24 24" {...common} stroke="currentColor">
          <rect x="3" y="6" width="18" height="12" rx="2.5" strokeWidth="1.8" />
          <path strokeWidth="1.8" d="M3 10h18" opacity="0.9" />
        </svg>
      );
    case "wallet":
      return (
        <svg viewBox="0 0 24 24" {...common} stroke="currentColor">
          <path
            strokeWidth="1.8"
            strokeLinejoin="round"
            d="M4 7.5A3.5 3.5 0 0 1 7.5 4H20v4H7.8c-.6 0-1.1.5-1.1 1.1v0c0 .6.5 1.1 1.1 1.1H20v7.2A2.5 2.5 0 0 1 17.5 20H7.5A3.5 3.5 0 0 1 4 16.5v-9Z"
          />
          <path
            strokeWidth="1.8"
            strokeLinecap="round"
            d="M17 13.5h3"
            opacity="0.9"
          />
        </svg>
      );
    case "arrowRight":
      return (
        <svg viewBox="0 0 24 24" {...common} stroke="currentColor">
          <path
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 12h12m0 0-5-5m5 5-5 5"
          />
        </svg>
      );
    case "chevronRight":
      return (
        <svg viewBox="0 0 24 24" {...common} stroke="currentColor">
          <path
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 6l6 6-6 6"
          />
        </svg>
      );
    case "check":
      return (
        <svg viewBox="0 0 24 24" {...common} stroke="currentColor">
          <path
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20 6 9 17l-5-5"
          />
        </svg>
      );
    case "plus":
      return (
        <svg viewBox="0 0 24 24" {...common} stroke="currentColor">
          <path strokeWidth="1.8" strokeLinecap="round" d="M12 5v14M5 12h14" />
        </svg>
      );
    case "search":
      return (
        <svg viewBox="0 0 24 24" {...common} stroke="currentColor">
          <path
            strokeWidth="1.8"
            strokeLinecap="round"
            d="M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z"
          />
          <path strokeWidth="1.8" strokeLinecap="round" d="M21 21l-3.8-3.8" />
        </svg>
      );
    case "receipt":
      return (
        <svg viewBox="0 0 24 24" {...common} stroke="currentColor">
          <path
            strokeWidth="1.8"
            strokeLinejoin="round"
            d="M7 3h10v18l-2-1-2 1-2-1-2 1-2-1-2 1V3Z"
          />
          <path strokeWidth="1.8" strokeLinecap="round" d="M9 8h6M9 12h6" />
        </svg>
      );
    case "user":
      return (
        <svg viewBox="0 0 24 24" {...common} stroke="currentColor">
          <path
            strokeWidth="1.8"
            strokeLinecap="round"
            d="M20 21a8 8 0 1 0-16 0"
          />
          <path
            strokeWidth="1.8"
            strokeLinecap="round"
            d="M12 13a4.5 4.5 0 1 0-4.5-4.5A4.5 4.5 0 0 0 12 13Z"
          />
        </svg>
      );
    case "logout":
      return (
        <svg viewBox="0 0 24 24" {...common} stroke="currentColor">
          <path
            strokeWidth="1.8"
            strokeLinecap="round"
            d="M10 7V5a2 2 0 0 1 2-2h7v18h-7a2 2 0 0 1-2-2v-2"
          />
          <path
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12H3m0 0 3-3m-3 3 3 3"
          />
        </svg>
      );
    case "google":
      return (
        <svg viewBox="0 0 24 24" className={className ?? "h-4 w-4"}>
          <path
            fill="currentColor"
            d="M21.35 11.1H12v2.9h5.35c-.5 2.8-2.9 4.1-5.35 4.1a6.1 6.1 0 1 1 0-12.2c1.7 0 3.1.7 4.1 1.7l2.1-2.1A9.2 9.2 0 1 0 12 21.2c5.2 0 9-3.7 9-9 0-.6-.1-1.1-.2-1.7Z"
          />
        </svg>
      );
  }
}

