import { CircularProgress, Box } from "@mui/material";
import zIndex from "@mui/material/styles/zIndex";

const Loading = ({
  type = "fixed",
  size = 40,
}: {
  type?: "static" | "fixed";
  size?: number;
}) => {
  let style = {};

  if (type === "fixed") {
    style = {
      width: "100%",
      height: "100%",
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      zIndex: 9999,
    };
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...style,
      }}
    >
      <CircularProgress size={size} />
    </Box>
  );
};

export default Loading;
