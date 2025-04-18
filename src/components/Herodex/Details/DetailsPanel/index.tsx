import { Slide } from "@mui/material";
import { DetailsPanelWrapper, ImageWrapper } from "./styled.components";
import useMainContext from "../../../../hooks/useMainContext";
import DetailsPanelHeader from "../DetailsPanelHeader";
import DetailsPanelTabs from "../DetailsPanelTabs";

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
            <DetailsPanelHeader title={nodeTitle} />
            <ImageWrapper src={nodeData.images.lg} alt={nodeData.name} />
            <DetailsPanelTabs data={nodeData} />
          </>
        )}
      </DetailsPanelWrapper>
    </Slide>
  );
};

export default DetailsPanel;
