import { Slide, Paper, Box } from "@mui/material";
import { DetailsPanelWrapper, ImageWrapper } from "./styled.components";
import useMainContext from "../../../../hooks/useMainContext";
import DetailsPanelHeader from "../DetailsPanelHeader";
import DetailsPanelTabs from "../DetailsPanelTabs";
import heroIcon from "../../../../assets/hero-dark-mini-icon.png";
import villainIcon from "../../../../assets/villain-dark-mini-icon.png";
import { LazyLoadImage } from "react-lazy-load-image-component";

const DetailsPanel = () => {
  const { nodeDetails, getHeroById } = useMainContext();
  const nodeData = getHeroById(nodeDetails);
  const isDetailsOpen = nodeData !== null;
  const nodeTitle = nodeData?.name || "";

  if (nodeData?.biography.fullName === "") {
    nodeData.biography.fullName = nodeTitle;
  }

  return (
    <Slide direction="left" in={isDetailsOpen} mountOnEnter unmountOnExit>
      <DetailsPanelWrapper>
        {isDetailsOpen && (
          <>
            <DetailsPanelHeader
              title={nodeTitle}
              alignment={nodeData.biography.alignment}
            />
            <Box sx={{ position: "relative" }}>
              <ImageWrapper src={nodeData.images.lg} alt={nodeData.name} />
              <Paper
                sx={{
                  background: "transparent",
                  backdropFilter: "blur(5px)",
                  position: "absolute",
                  bottom: "15px",
                  right: "15px",
                  width: "45px",
                  height: "45px",
                  borderRadius: "5px",
                  textAlign: "center",
                  padding: "5px",
                }}
              >
                <LazyLoadImage
                  alt={
                    nodeData.biography.alignment === "good" ? "Hero" : "Villain"
                  }
                  height={45}
                  width={45}
                  src={
                    nodeData.biography.alignment === "good"
                      ? heroIcon
                      : villainIcon
                  }
                />
              </Paper>
            </Box>
            <DetailsPanelTabs data={nodeData} />
          </>
        )}
      </DetailsPanelWrapper>
    </Slide>
  );
};

export default DetailsPanel;
