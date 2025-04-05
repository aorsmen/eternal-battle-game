import { useState } from "react";
import { Slide, Box, Tabs, Tab, Stack } from "@mui/material";
import {
  DetailsPanelWrapper,
  BiographySection,
  AppearanceSection,
  CustomTabPanel,
  a11yProps,
  StatsSection,
  SkillsSection,
  ImageWrapper,
} from "./styled.components";
import useMainContext from "../../../../hooks/useMainContext";
import DetailsPanelHeader from "../DetailsPanelHeader";

const DetailsPanel = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const { nodeDetails, getHeroById } = useMainContext();
  const nodeData = getHeroById(nodeDetails);
  const isDetailsOpen = nodeData !== null;
  const nodeTitle = nodeData?.name || "";

  if (nodeData?.biography.fullName === "") {
    nodeData.biography.fullName = nodeTitle;
  }

  const tabChangeHandler = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Slide direction="left" in={isDetailsOpen} mountOnEnter unmountOnExit>
      <DetailsPanelWrapper>
        {isDetailsOpen && (
          <>
            <DetailsPanelHeader title={nodeTitle} />
            <ImageWrapper src={nodeData.images.lg} alt={nodeData.name} />
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  variant="fullWidth"
                  value={tabIndex}
                  onChange={tabChangeHandler}
                >
                  <Tab label="Stats & Skills" {...a11yProps(0)} />
                  <Tab label="Biography" {...a11yProps(1)} />
                  <Tab label="Appearence" {...a11yProps(2)} />
                </Tabs>
              </Box>
              <CustomTabPanel value={tabIndex} index={0}>
                <Stack direction="row">
                  <StatsSection data={nodeData.powerstats} sx={{ flex: 1 }} />
                  <SkillsSection data={nodeData.skills} sx={{ flex: 1 }} />
                </Stack>
              </CustomTabPanel>
              <CustomTabPanel value={tabIndex} index={1}>
                <BiographySection data={nodeData.biography} />
              </CustomTabPanel>
              <CustomTabPanel value={tabIndex} index={2}>
                <AppearanceSection data={nodeData.appearance} />
              </CustomTabPanel>
            </Box>
          </>
        )}
      </DetailsPanelWrapper>
    </Slide>
  );
};

export default DetailsPanel;
