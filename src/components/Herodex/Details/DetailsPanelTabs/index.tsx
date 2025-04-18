import { useState } from "react";
import { Box, Tabs, Tab, Stack } from "@mui/material";
import {
  BiographySection,
  AppearanceSection,
  CustomTabPanel,
  a11yProps,
  StatsSection,
  SkillsSection,
} from "./styled.components";
import { HeroDataType } from "../../../../types/main.types";

const DetailsPanelTabs = ({ data }: { data: HeroDataType | null }) => {
  const [tabIndex, setTabIndex] = useState(0);

  const tabChangeHandler = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      {data !== null && (
        <>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              variant="fullWidth"
              value={tabIndex}
              onChange={tabChangeHandler}
            >
              <Tab
                label="Stats & Skills"
                sx={{ fontSize: "12px" }}
                {...a11yProps(0)}
              />
              <Tab
                label="Biography"
                sx={{ fontSize: "12px" }}
                {...a11yProps(1)}
              />
              <Tab
                label="Appearence"
                sx={{ fontSize: "12px" }}
                {...a11yProps(2)}
              />
            </Tabs>
          </Box>
          <CustomTabPanel value={tabIndex} index={0}>
            <Stack direction="row">
              <StatsSection data={data.powerstats} sx={{ flex: 1 }} />
              <SkillsSection data={data.skills} sx={{ flex: 1 }} />
            </Stack>
          </CustomTabPanel>
          <CustomTabPanel value={tabIndex} index={1}>
            <BiographySection data={data.biography} />
          </CustomTabPanel>
          <CustomTabPanel value={tabIndex} index={2}>
            <AppearanceSection data={data.appearance} />
          </CustomTabPanel>
        </>
      )}
    </Box>
  );
};

export default DetailsPanelTabs;
