import { HerodexSideType } from "@/types/main.types";

// Mask for heroes, horned helmet for villains
const SideIcon = ({
  side,
  size = 18,
  color = "currentColor",
  strokeWidth = 2,
}: {
  side: HerodexSideType;
  size?: number;
  color?: string;
  strokeWidth?: number;
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
      strokeLinecap="round"
      aria-hidden="true"
      data-testid={`side-icon-${side}`}
    >
      {side === "heroes" ? (
        <path d="M2 10c0-2.2 1.8-3.5 4-3.5h12c2.2 0 4 1.3 4 3.5 0 4-2.8 7-5.8 7-2 0-3-2-4.2-2s-2.2 2-4.2 2C4.8 17 2 14 2 10z" />
      ) : (
        <path d="M3 3l4 5h10l4-5v7.5C21 16.5 16.8 21 12 21S3 16.5 3 10.5z" />
      )}
    </svg>
  );
};

export default SideIcon;
