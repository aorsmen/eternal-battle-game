import {
  EB_BG,
  EB_DISPLAY_FONT,
  EB_GOLD,
  EB_HERO,
  EB_VILLAIN,
} from "@/config/general";

// The blue/red "VS" diamond from the app icon, used on Home and Credits
const VersusEmblem = ({ size = 112 }: { size?: number }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 112 112" aria-hidden="true">
      <path d="M56 6 L106 56 L56 106 Z" fill={EB_VILLAIN} />
      <path d="M56 6 L6 56 L56 106 Z" fill={EB_HERO} />
      <path
        d="M56 6 L106 56 L56 106 L6 56 Z"
        fill="none"
        stroke={EB_GOLD}
        strokeWidth="4"
      />
      <text
        x="56"
        y="70"
        textAnchor="middle"
        fontFamily={EB_DISPLAY_FONT}
        fontSize="38"
        fill={EB_BG}
      >
        VS
      </text>
    </svg>
  );
};

export default VersusEmblem;
