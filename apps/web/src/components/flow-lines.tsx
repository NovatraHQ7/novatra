export function FlowLines() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 800 500"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M -50 380 C 150 280, 250 420, 420 260 S 650 140, 900 200"
        stroke="#10b981"
        strokeWidth="2"
        fill="none"
        opacity="0.35"
        strokeDasharray="14 10"
        className="nv-flow-line"
        style={{ animationDuration: "9s" }}
      />
      <path
        d="M -50 260 C 200 380, 300 120, 480 300 S 700 360, 900 260"
        stroke="#ffffff"
        strokeWidth="1"
        fill="none"
        opacity="0.12"
        strokeDasharray="10 14"
        className="nv-flow-line"
        style={{ animationDuration: "13s", animationDirection: "reverse" }}
      />
    </svg>
  );
}
