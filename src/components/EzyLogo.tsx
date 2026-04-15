interface EzyLogoProps {
  size?: number;
  className?: string;
}

export const EzyLogo = ({ size = 32, className = "" }: EzyLogoProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="ezy-gold" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#c8890e" />
        <stop offset="50%" stopColor="#e8aa2a" />
        <stop offset="100%" stopColor="#f5d060" />
      </linearGradient>
      <linearGradient id="ezy-gold-inner" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#0d0d14" />
        <stop offset="100%" stopColor="#1a1510" />
      </linearGradient>
    </defs>
    {/* Outer ring / border */}
    <rect width="32" height="32" rx="8" fill="url(#ezy-gold)" />
    {/* Inner dark background */}
    <rect x="1.5" y="1.5" width="29" height="29" rx="7" fill="url(#ezy-gold-inner)" />
    {/* Top glare */}
    <rect x="1.5" y="1.5" width="29" height="12" rx="7" fill="url(#ezy-gold)" opacity="0.08" />
    {/* Left arrow (input) */}
    <path d="M5 16L10.5 11.5V14H17V18H10.5V20.5Z" fill="url(#ezy-gold)" opacity="0.95" />
    {/* Right arrow (output) */}
    <path d="M27 16L21.5 11.5V14H15V18H21.5V20.5Z" fill="url(#ezy-gold)" opacity="0.55" />
  </svg>
);
