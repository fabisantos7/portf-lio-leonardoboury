export function CubeLogo({ size = 35 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      aria-hidden="true"
      className="drop-shadow-[0_0_10px_rgba(0,255,102,0.35)] transition-transform duration-500 group-hover:rotate-90"
    >
      <g
        stroke="#00ff66"
        strokeWidth="2.4"
        strokeLinejoin="round"
        fill="none"
      >
        <path d="M32 10 L52 21 L32 32 L12 21 Z" fill="rgba(0,255,102,0.18)" />
        <path d="M12 21 L12 43 L32 54 L32 32 Z" fill="rgba(0,255,102,0.10)" />
        <path d="M52 21 L52 43 L32 54 L32 32 Z" fill="rgba(0,255,102,0.05)" />
      </g>
    </svg>
  );
}
