import { forwardRef } from "react";
import { Box, Modal, Stack } from "@mui/material";
import { HerodexSideFilterType, RosterHeroType } from "@/types/main.types";
import { COMPARE_LIMIT } from "@/config/hero";
import {
  EB_BG,
  EB_BODY_FONT,
  EB_BORDER,
  EB_DISPLAY_FONT,
  EB_GOLD,
  EB_HERO,
  EB_HERO_ART_BG,
  EB_HERO_LIGHT,
  EB_LABEL_FONT,
  EB_SURFACE,
  EB_TEXT,
  EB_TEXT_MUTED,
  EB_TEXT_PLACEHOLDER,
  EB_TEXT_SUBTLE,
  EB_VILLAIN,
  EB_VILLAIN_ART_BG,
  EB_VILLAIN_LIGHT,
} from "@/config/general";

const VISUALLY_HIDDEN = {
  position: "absolute",
  width: "1px",
  height: "1px",
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
  whiteSpace: "nowrap",
} as const;

const FOCUS_RING = {
  "&:focus-visible": {
    outline: `3px solid ${EB_GOLD}`,
    outlineOffset: "2px",
  },
} as const;

const ELLIPSIS = {
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
} as const;

export const PickerModal = ({
  labelledBy,
  onClose,
  children,
}: {
  labelledBy: string;
  onClose: () => void;
  children: React.ReactElement;
}) => (
  <Modal
    open
    onClose={onClose}
    aria-labelledby={labelledBy}
    sx={{ "& .MuiModal-backdrop": { backgroundColor: "rgba(5, 7, 10, 0.78)" } }}
  >
    {children}
  </Modal>
);

// Modal needs a child that takes a ref and focus. Clicks pass through the
// empty space to the backdrop, which closes the picker
export const PickerLayout = forwardRef<
  HTMLDivElement,
  { children: React.ReactNode }
>(({ children, ...props }, ref) => (
  <Box
    ref={ref}
    {...props}
    sx={{
      position: "fixed",
      inset: 0,
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "center",
      padding: { xs: "24px 16px", sm: "72px 16px" },
      boxSizing: "border-box",
      outline: "none",
      pointerEvents: "none",
    }}
  >
    {children}
  </Box>
));
PickerLayout.displayName = "PickerLayout";

export const PickerDialog = ({
  labelledBy,
  children,
}: {
  labelledBy: string;
  children: React.ReactNode;
}) => (
  <Box
    component="section"
    role="dialog"
    aria-modal="true"
    aria-labelledby={labelledBy}
    sx={{
      pointerEvents: "auto",
      width: "100%",
      maxWidth: "640px",
      maxHeight: "100%",
      background: EB_SURFACE,
      border: `2px solid ${EB_GOLD}`,
      borderRadius: "20px",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      boxShadow: "0 24px 64px rgba(0, 0, 0, 0.6)",
      color: EB_TEXT,
      fontFamily: EB_BODY_FONT,
    }}
  >
    {children}
  </Box>
);

const CloseIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const PickerHeader = ({
  titleId,
  slotsLeft,
  onClose,
}: {
  titleId: string;
  slotsLeft: number;
  onClose: () => void;
}) => (
  <Stack
    direction="row"
    sx={{
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: "16px",
      padding: "22px 24px 0",
    }}
  >
    <Stack sx={{ gap: "4px" }}>
      <Box
        component="h2"
        id={titleId}
        sx={{
          margin: 0,
          fontFamily: EB_DISPLAY_FONT,
          fontWeight: 400,
          fontSize: "34px",
          letterSpacing: "0.02em",
          textTransform: "uppercase",
        }}
      >
        Add a character
      </Box>
      <Box component="span" sx={{ fontSize: "15px", color: EB_TEXT_SUBTLE }}>
        {slotsLeft} of {COMPARE_LIMIT} slots free · picking one closes this
        window
      </Box>
    </Stack>
    <Box
      component="button"
      type="button"
      aria-label="Close"
      onClick={onClose}
      sx={{
        appearance: "none",
        border: 0,
        background: "transparent",
        color: EB_TEXT_SUBTLE,
        cursor: "pointer",
        width: "44px",
        height: "44px",
        flex: "none",
        borderRadius: "999px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "&:hover": { background: EB_BORDER, color: "#FFFFFF" },
        ...FOCUS_RING,
      }}
    >
      <CloseIcon />
    </Box>
  </Stack>
);

export const PickerFilters = ({ children }: { children: React.ReactNode }) => (
  <Box
    sx={{
      display: "flex",
      flexWrap: "wrap",
      gap: "12px",
      padding: "18px 24px",
    }}
  >
    {children}
  </Box>
);

export const PickerSearch = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => (
  <Box
    component="label"
    sx={{
      display: "flex",
      alignItems: "center",
      gap: "10px",
      height: "52px",
      boxSizing: "border-box",
      padding: "0 16px",
      borderRadius: "12px",
      border: `2px solid ${EB_BORDER}`,
      background: EB_BG,
      flex: "1 1 240px",
      minWidth: 0,
      "&:focus-within": { borderColor: EB_GOLD },
    }}
  >
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke={EB_TEXT_SUBTLE}
      strokeWidth="2.2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-4-4" />
    </svg>
    <Box component="span" sx={VISUALLY_HIDDEN}>
      Search characters
    </Box>
    <Box
      component="input"
      type="search"
      autoFocus
      placeholder="Search by name, alias or role"
      value={value}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
        onChange(event.target.value)
      }
      sx={{
        flex: 1,
        minWidth: 0,
        border: 0,
        background: "transparent",
        color: EB_TEXT,
        fontFamily: EB_BODY_FONT,
        fontSize: "17px",
        outline: "none",
        "&::placeholder": { color: EB_TEXT_PLACEHOLDER },
      }}
    />
  </Box>
);

const SIDE_OPTIONS: {
  value: HerodexSideFilterType;
  label: string;
  activeBg: string;
}[] = [
  { value: "all", label: "All", activeBg: EB_GOLD },
  { value: "heroes", label: "Heroes", activeBg: EB_HERO },
  { value: "villains", label: "Villains", activeBg: EB_VILLAIN },
];

export const PickerSideFilter = ({
  value,
  onChange,
}: {
  value: HerodexSideFilterType;
  onChange: (value: HerodexSideFilterType) => void;
}) => (
  <Box
    role="radiogroup"
    aria-label="Side"
    sx={{
      display: "flex",
      gap: "4px",
      padding: "4px",
      borderRadius: "12px",
      background: EB_BG,
      alignSelf: "center",
    }}
  >
    {SIDE_OPTIONS.map((option) => {
      const active = option.value === value;
      return (
        <Box
          key={option.value}
          component="button"
          type="button"
          role="radio"
          aria-checked={active}
          onClick={() => onChange(option.value)}
          sx={{
            appearance: "none",
            border: 0,
            cursor: "pointer",
            minHeight: "40px",
            padding: "0 16px",
            borderRadius: "8px",
            background: active ? option.activeBg : "transparent",
            color: active ? EB_BG : EB_TEXT_MUTED,
            fontFamily: EB_LABEL_FONT,
            fontWeight: 700,
            fontSize: "17px",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            "&:hover": { color: active ? EB_BG : "#FFFFFF" },
            ...FOCUS_RING,
          }}
        >
          {option.label}
        </Box>
      );
    })}
  </Box>
);

export const PickerList = ({ children }: { children: React.ReactNode }) => (
  <Box
    component="ul"
    aria-label="Characters"
    sx={{
      listStyle: "none",
      margin: 0,
      padding: "0 12px 12px",
      maxHeight: "440px",
      overflowY: "auto",
      display: "flex",
      flexDirection: "column",
      gap: "4px",
    }}
  >
    {children}
  </Box>
);

const PlusIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const CheckIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12l5 5 9-10" />
  </svg>
);

export const PickerRow = ({
  hero,
  added,
  disabled,
  onAdd,
}: {
  hero: RosterHeroType;
  added: boolean;
  disabled: boolean;
  onAdd: () => void;
}) => {
  const isHero = hero.side === "heroes";

  return (
    <Box
      component="li"
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "44px minmax(0, 1fr) auto",
          sm: "44px minmax(0, 1fr) auto auto",
        },
        gap: "14px",
        alignItems: "center",
        padding: "8px 12px",
        borderRadius: "12px",
        opacity: added ? 0.55 : 1,
        "&:hover": { background: "#1F252E" },
      }}
    >
      <Box
        component="img"
        src={hero.images.xs}
        alt=""
        loading="lazy"
        sx={{
          width: "44px",
          height: "44px",
          borderRadius: "10px",
          objectFit: "cover",
          objectPosition: "top",
          background: isHero ? EB_HERO_ART_BG : EB_VILLAIN_ART_BG,
        }}
      />
      <Stack sx={{ minWidth: 0 }}>
        <Box
          component="span"
          sx={{
            ...ELLIPSIS,
            fontFamily: EB_LABEL_FONT,
            fontWeight: 700,
            fontSize: "19px",
            textTransform: "uppercase",
            letterSpacing: "0.03em",
            color: isHero ? EB_HERO_LIGHT : EB_VILLAIN_LIGHT,
          }}
        >
          {hero.name}
        </Box>
        <Box
          component="span"
          sx={{ ...ELLIPSIS, fontSize: "14px", color: EB_TEXT_SUBTLE }}
        >
          {isHero ? "Hero" : "Villain"} · {hero.role}
        </Box>
      </Stack>
      <Box
        component="span"
        sx={{
          display: { xs: "none", sm: "inline" },
          fontSize: "14px",
          color: EB_TEXT_SUBTLE,
          whiteSpace: "nowrap",
          "& b": {
            fontFamily: EB_DISPLAY_FONT,
            fontWeight: 400,
            fontSize: "18px",
            color: "#FFFFFF",
          },
        }}
      >
        ATK <b>{hero.values.attack}</b>&nbsp; DEF <b>{hero.values.defense}</b>
      </Box>
      <Box
        component="button"
        type="button"
        disabled={added || disabled}
        onClick={onAdd}
        aria-label={
          added
            ? `${hero.name} is already in compare`
            : `Add ${hero.name} to compare`
        }
        sx={{
          appearance: "none",
          cursor: "pointer",
          minHeight: "40px",
          minWidth: "88px",
          padding: "0 14px",
          borderRadius: "10px",
          border: `2px solid ${EB_GOLD}`,
          background: "transparent",
          color: EB_GOLD,
          fontFamily: EB_LABEL_FONT,
          fontWeight: 700,
          fontSize: "15px",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "6px",
          "&:hover:not(:disabled)": { background: EB_GOLD, color: EB_BG },
          "&:disabled": {
            borderColor: EB_BORDER,
            color: EB_TEXT_PLACEHOLDER,
            cursor: "default",
          },
          ...FOCUS_RING,
        }}
      >
        {added ? <CheckIcon /> : <PlusIcon />}
        {added ? "Added" : "Add"}
      </Box>
    </Box>
  );
};

export const PickerEmpty = () => (
  <Box
    component="li"
    sx={{ padding: "32px 12px", textAlign: "center", color: EB_TEXT_SUBTLE }}
  >
    No characters match that search.
  </Box>
);
