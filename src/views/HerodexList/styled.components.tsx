import { Box, Stack } from "@mui/material";
import { HerodexSideFilterType, HerodexSortType } from "@/types/main.types";
import {
  EB_BG,
  EB_BODY_FONT,
  EB_BORDER,
  EB_DISPLAY_FONT,
  EB_GOLD,
  EB_HERO,
  EB_LABEL_FONT,
  EB_SURFACE,
  EB_TEXT,
  EB_TEXT_MUTED,
  EB_TEXT_PLACEHOLDER,
  EB_TEXT_SUBTLE,
  EB_VILLAIN,
} from "@/config/general";

const VISUALLY_HIDDEN = {
  position: "absolute",
  width: "1px",
  height: "1px",
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
  whiteSpace: "nowrap",
} as const;

export const PageHeader = () => {
  return (
    <Stack component="header" sx={{ gap: "8px" }}>
      <Box
        component="h1"
        sx={{
          margin: 0,
          fontFamily: EB_DISPLAY_FONT,
          fontWeight: 400,
          fontSize: "clamp(48px, 7vw, 80px)",
          lineHeight: 0.95,
          letterSpacing: "0.02em",
          textTransform: "uppercase",
        }}
      >
        Herodex
      </Box>
      <Box
        component="p"
        sx={{ margin: 0, fontSize: "18px", color: EB_TEXT_MUTED }}
      >
        Every hero and villain in the deck. Open a card for full details, or
        pick up to four to compare.
      </Box>
    </Stack>
  );
};

export const SearchField = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  return (
    <Box
      component="label"
      htmlFor="herodex-search"
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        height: "52px",
        boxSizing: "border-box",
        padding: "0 16px",
        borderRadius: "12px",
        border: `2px solid ${EB_BORDER}`,
        background: EB_SURFACE,
        flex: "1 1 320px",
        minWidth: 0,
        position: "relative",
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
        id="herodex-search"
        type="search"
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
          fontSize: "18px",
          outline: "none",
          "&::placeholder": { color: EB_TEXT_PLACEHOLDER, opacity: 1 },
        }}
      />
    </Box>
  );
};

const SIDE_OPTIONS: {
  value: HerodexSideFilterType;
  label: string;
  activeBg: string;
}[] = [
  { value: "all", label: "All", activeBg: EB_GOLD },
  { value: "heroes", label: "Heroes", activeBg: EB_HERO },
  { value: "villains", label: "Villains", activeBg: EB_VILLAIN },
];

export const SideFilter = ({
  value,
  counts,
  onChange,
}: {
  value: HerodexSideFilterType;
  counts: { [key in HerodexSideFilterType]: number };
  onChange: (value: HerodexSideFilterType) => void;
}) => {
  return (
    <Box
      role="radiogroup"
      aria-label="Side"
      sx={{
        display: "flex",
        gap: "4px",
        padding: "4px",
        borderRadius: "12px",
        background: EB_SURFACE,
        border: `2px solid ${EB_BORDER}`,
      }}
    >
      {SIDE_OPTIONS.map((option) => {
        const active = value === option.value;

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
              display: "flex",
              alignItems: "center",
              gap: "8px",
              "&:hover": { color: active ? EB_BG : "#FFFFFF" },
              "&:focus-visible": {
                outline: `3px solid ${EB_GOLD}`,
                outlineOffset: "2px",
              },
            }}
          >
            {option.label}
            <Box
              component="small"
              sx={{
                fontFamily: EB_BODY_FONT,
                fontWeight: 600,
                fontSize: "13px",
                opacity: 0.8,
              }}
            >
              {counts[option.value]}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export const SortSelect = ({
  value,
  onChange,
}: {
  value: HerodexSortType;
  onChange: (value: HerodexSortType) => void;
}) => {
  return (
    <Stack direction="row" sx={{ alignItems: "center", gap: "10px" }}>
      <Box
        component="label"
        htmlFor="herodex-sort"
        sx={{
          fontFamily: EB_LABEL_FONT,
          fontWeight: 700,
          fontSize: "15px",
          letterSpacing: "0.12em",
          color: EB_TEXT_SUBTLE,
          textTransform: "uppercase",
        }}
      >
        Sort by
      </Box>
      <Box
        component="select"
        id="herodex-sort"
        value={value}
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
          onChange(event.target.value as HerodexSortType)
        }
        sx={{
          height: "52px",
          padding: "0 14px",
          borderRadius: "12px",
          border: `2px solid ${EB_BORDER}`,
          background: EB_SURFACE,
          color: EB_TEXT,
          fontFamily: EB_BODY_FONT,
          fontSize: "16px",
          cursor: "pointer",
          "&:focus": { outline: `3px solid ${EB_GOLD}`, outlineOffset: "1px" },
        }}
      >
        <option value="name">Name A–Z</option>
        <option value="nameDesc">Name Z–A</option>
        <option value="attack">Highest attack</option>
        <option value="defense">Highest defence</option>
      </Box>
    </Stack>
  );
};

export const EmptyState = () => {
  return (
    <Stack
      sx={{
        padding: "48px 24px",
        borderRadius: "14px",
        border: `2px dashed ${EB_BORDER}`,
        textAlign: "center",
        gap: "8px",
        alignItems: "center",
      }}
    >
      <Box
        component="span"
        sx={{ fontFamily: EB_DISPLAY_FONT, fontSize: "28px" }}
      >
        No characters found
      </Box>
      <Box component="span" sx={{ color: EB_TEXT_SUBTLE }}>
        Try another name, or switch the side filter back to All.
      </Box>
    </Stack>
  );
};

export const PageMain = ({ children }: { children: React.ReactNode }) => (
  <Box component="main" sx={{ flex: 1, padding: "28px 24px 48px" }}>
    <Stack sx={{ maxWidth: "1240px", marginInline: "auto", gap: "28px" }}>
      {children}
    </Stack>
  </Box>
);

export const FilterBar = ({ children }: { children: React.ReactNode }) => (
  <Box
    component="section"
    aria-label="Find characters"
    sx={{
      display: "flex",
      flexWrap: "wrap",
      gap: "14px",
      alignItems: "center",
    }}
  >
    {children}
  </Box>
);

// Shows the range once the results run over more than one page
export const ResultCount = ({
  total,
  from,
  to,
}: {
  total: number;
  from: number;
  to: number;
}) => (
  <Box
    component="p"
    role="status"
    sx={{ margin: "-8px 0 0", fontSize: "15px", color: EB_TEXT_SUBTLE }}
  >
    {to - from + 1 < total
      ? `Showing ${from}–${to} of ${total} characters`
      : `Showing ${total} characters`}
  </Box>
);

export const RosterGrid = ({ children }: { children: React.ReactNode }) => (
  <Box
    component="section"
    aria-label="Characters"
    sx={{
      display: "grid",
      gridTemplateColumns: {
        xs: "repeat(auto-fill, minmax(150px, 1fr))",
        sm: "repeat(auto-fill, minmax(180px, 1fr))",
      },
      gap: "16px",
    }}
  >
    {children}
  </Box>
);
