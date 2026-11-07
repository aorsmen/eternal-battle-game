import { Box, Stack } from "@mui/material";
import {
  EB_BG,
  EB_BORDER,
  EB_BORDER_STRONG,
  EB_GOLD,
  EB_LABEL_FONT,
  EB_SURFACE,
  EB_TEXT_MUTED,
  EB_TEXT_PLACEHOLDER,
  EB_TEXT_SUBTLE,
} from "@/config/general";

const BUTTON_STYLE = {
  appearance: "none",
  cursor: "pointer",
  minWidth: "44px",
  minHeight: "44px",
  padding: "0 12px",
  borderRadius: "10px",
  border: `2px solid ${EB_BORDER}`,
  background: EB_SURFACE,
  color: EB_TEXT_MUTED,
  fontFamily: EB_LABEL_FONT,
  fontWeight: 700,
  fontSize: "18px",
  letterSpacing: "0.04em",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "6px",
  "&:hover:not(:disabled)": { borderColor: EB_BORDER_STRONG, color: "#FFFFFF" },
  "&:focus-visible": {
    outline: `3px solid ${EB_GOLD}`,
    outlineOffset: "2px",
  },
} as const;

export const PaginationNav = ({ children }: { children: React.ReactNode }) => (
  <Stack
    component="nav"
    aria-label="Pagination"
    direction="row"
    sx={{
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      flexWrap: "wrap",
    }}
  >
    {children}
  </Stack>
);

export const StepButton = ({
  direction,
  disabled,
  onClick,
}: {
  direction: "previous" | "next";
  disabled: boolean;
  onClick: () => void;
}) => {
  const isNext = direction === "next";

  return (
    <Box
      component="button"
      type="button"
      aria-label={isNext ? "Next page" : "Previous page"}
      disabled={disabled}
      onClick={onClick}
      sx={{
        ...BUTTON_STYLE,
        textTransform: "uppercase",
        flexDirection: isNext ? "row-reverse" : "row",
        "&:disabled": {
          cursor: "not-allowed",
          color: EB_TEXT_PLACEHOLDER,
          opacity: 0.6,
        },
      }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d={isNext ? "M9 5l7 7-7 7" : "M15 5l-7 7 7 7"} />
      </svg>
      <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
        {isNext ? "Next" : "Prev"}
      </Box>
    </Box>
  );
};

// Page numbers need more room than a phone has; PageStatus replaces them there
export const PageList = ({ children }: { children: React.ReactNode }) => (
  <Box
    component="ul"
    sx={{
      display: { xs: "none", sm: "flex" },
      alignItems: "center",
      gap: "6px",
      margin: 0,
      padding: 0,
      listStyle: "none",
    }}
  >
    {children}
  </Box>
);

export const PageButton = ({
  page,
  current,
  onClick,
}: {
  page: number;
  current: boolean;
  onClick: () => void;
}) => (
  <li>
    <Box
      component="button"
      type="button"
      aria-label={`Page ${page}`}
      aria-current={current ? "page" : undefined}
      onClick={onClick}
      sx={{
        ...BUTTON_STYLE,
        ...(current && {
          background: EB_GOLD,
          borderColor: EB_GOLD,
          color: EB_BG,
          "&:hover:not(:disabled)": { color: EB_BG },
        }),
      }}
    >
      {page}
    </Box>
  </li>
);

export const PageGap = () => (
  <Box
    component="li"
    aria-hidden="true"
    sx={{ minWidth: "24px", textAlign: "center", color: EB_TEXT_SUBTLE }}
  >
    …
  </Box>
);

export const PageStatus = ({
  page,
  pageCount,
}: {
  page: number;
  pageCount: number;
}) => (
  <Box
    component="span"
    sx={{
      display: { xs: "inline", sm: "none" },
      padding: "0 8px",
      fontFamily: EB_LABEL_FONT,
      fontWeight: 700,
      fontSize: "18px",
      color: EB_TEXT_MUTED,
    }}
  >
    Page {page} of {pageCount}
  </Box>
);
