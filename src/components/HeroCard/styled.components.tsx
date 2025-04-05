import { Stack, Typography, Box, Paper, Fade } from "@mui/material";
import { BROWN, YELLOW_LIGHT, YELLOW_DARK } from "../../config/general";
import { LazyLoadImage } from "react-lazy-load-image-component";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";

export const HeroCardWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Stack
      sx={{
        width: "270px",
        height: "370px",
        position: "relative",
        backgroundColor: YELLOW_DARK,
        borderRadius: "5px",
        border: `10px solid ${BROWN}`,
      }}
    >
      {children}
    </Stack>
  );
};

export const HeroCardHeader = ({ name }: { name: string }) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="flex-start"
      sx={{
        padding: "5px 10px",
        borderRadius: "5px 5px 0 0",
      }}
    >
      <Typography sx={{ fontSize: "14px" }}>{name}</Typography>
    </Stack>
  );
};

export const HeroCardBody = ({ children }: { children: React.ReactNode }) => {
  return <Stack sx={{ paddingInline: "10px", flex: 1 }}>{children}</Stack>;
};

export const HeroCardFooter = ({ children }: { children: React.ReactNode }) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="flex-end"
      sx={{ padding: "10px" }}
    >
      {children}
    </Stack>
  );
};

export const InfoWrapper = ({ text }: { text: string }) => {
  return (
    <Box
      sx={{
        borderRadius: "4px",
        backgroundColor: YELLOW_LIGHT,
        flex: 1,
        padding: "10px",
      }}
    >
      {text !== "-" && (
        <Typography sx={{ fontSize: "12px", fontStyle: "italic" }}>
          {text}
        </Typography>
      )}
    </Box>
  );
};

export const ImageWrapper = ({
  alt,
  src,
  plc,
}: {
  alt: string;
  src: string;
  plc: string;
}) => {
  return (
    <Box
      sx={{
        overflow: "hidden",
        borderRadius: "5px",
        height: "175px",
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          left: 0,
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <LazyLoadImage
          alt={alt}
          height={345}
          src={src}
          width={230}
          placeholderSrc={plc}
        />
      </Box>
    </Box>
  );
};

export const ImagePreview = ({
  alt,
  src,
  show,
  onOpen,
  onClose,
}: {
  alt: string;
  src: string;
  show: boolean;
  onOpen: () => void;
  onClose: () => void;
}) => {
  return (
    <>
      <VisibilityIcon
        fontSize="small"
        sx={{ position: "absolute", top: "7px", right: "10px", color: BROWN }}
        onClick={onOpen}
      />
      <Fade in={show}>
        <Paper
          sx={{
            height: "350px",
            width: "250px",
            position: "absolute",
            left: 0,
            top: 0,
          }}
          onClick={onClose}
          onMouseLeave={onClose}
        >
          <LazyLoadImage alt={alt} height={350} src={src} width={250} />
          <CloseIcon
            fontSize="small"
            sx={{ position: "absolute", top: "10px", right: "10px" }}
          />
        </Paper>
      </Fade>
    </>
  );
};
