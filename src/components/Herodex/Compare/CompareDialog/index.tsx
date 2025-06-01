import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  Box,
  Stack,
  useMediaQuery,
  useTheme,
  Tabs,
  Tab,
} from "@mui/material";
import useMainContext from "../../../../hooks/useMainContext";
import { HeroDataType } from "../../../../types/main.types";
import {
  heroStats,
  heroSkills,
  statGraphKeys,
  skillGraphKeys,
} from "../../../../config/hero";
import {
  StatGraphDataType,
  StatsNamesType,
  SkillGraphDataType,
  SkillNamesType,
} from "../../../../types/main.types";
import {
  CustomTabPanel,
  GraphObject,
  DialogHeader,
  HeroThumb,
} from "./styled.components";

const CompareDialog = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"));
  const [statGraphs, setStatGraphs] = useState<StatGraphDataType[]>([]);
  const [skillGraphs, setSkillGraphs] = useState<SkillGraphDataType[]>([]);
  const [heroGraphs, setHeroGraphs] = useState<HeroDataType[]>([]);
  const [graphOrder, setGraphOrder] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  const { compareList, getHeroById } = useMainContext();

  const graphOrderHandler = (heroId: string) => {
    setGraphOrder((prev) => {
      const hero = prev.find((id) => id === heroId);
      const newList = prev.filter((id) => id !== heroId);

      if (hero) {
        newList.push(hero);
      }

      return newList;
    });
  };

  const tabChangeHandler = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    if (compareList.length > 0) {
      const heroData: HeroDataType[] = [];
      compareList.forEach((id) => {
        const hd = getHeroById(id);

        if (hd !== null) {
          heroData.push(hd);
        }
      });

      const initOrder = heroData.map((hr) => hr.id);

      setHeroGraphs(heroData);
      setGraphOrder(initOrder);

      const heroStatKeys = Object.keys(heroStats);
      const heroSkillKeys = Object.keys(heroSkills);
      const statGraphData: StatGraphDataType[] = heroStatKeys.map((pw) => {
        const key = pw as StatsNamesType;
        return { subject: heroStats[key], def: key, fullMark: 100 };
      });
      const skillGraphData: SkillGraphDataType[] = heroSkillKeys.map((pw) => {
        const key = pw as SkillNamesType;
        return { subject: heroSkills[key], def: key, fullMark: 100 };
      });

      heroData.forEach((hr, hrInx) => {
        const statKey = statGraphKeys[hrInx];
        const skillKey = skillGraphKeys[hrInx];

        statGraphData.forEach((gr, grInx) => {
          statGraphData[grInx] = {
            ...gr,
            [statKey]: hr?.powerstats[gr.def] || 0,
          };
        });

        skillGraphData.forEach((gr, grInx) => {
          skillGraphData[grInx] = {
            ...gr,
            [skillKey]: hr?.skills[gr.def] || 0,
          };
        });
      });

      setStatGraphs(statGraphData);
      setSkillGraphs(skillGraphData);
    }
  }, [compareList]);

  return (
    <Dialog
      onClose={onClose}
      open={isOpen}
      maxWidth="lg"
      fullWidth
      data-testid="compare-dialog"
    >
      <DialogHeader onClose={onClose} />
      <DialogContent dividers>
        <Stack direction={matches ? "row" : "column"}>
          <Stack
            spacing={2}
            direction={!matches ? "row" : "column"}
            sx={matches ? { height: "650px" } : {}}
          >
            {heroGraphs.map((hero, inx) => (
              <HeroThumb
                key={hero.id}
                name={hero?.name || ""}
                image={hero?.images.md || ""}
                index={inx}
                isMobile={!matches}
                onClick={() => graphOrderHandler(hero.id)}
              />
            ))}
          </Stack>
          <Box
            sx={
              matches
                ? { flex: 1, marginLeft: "40px" }
                : {
                    marginTop: "10px",
                  }
            }
          >
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={activeTab}
                onChange={tabChangeHandler}
                aria-label="Stat & Skill Graphs"
              >
                <Tab label="STATS" />
                <Tab label="SKILLS" />
              </Tabs>
            </Box>
            <CustomTabPanel value={activeTab} index={0}>
              <GraphObject
                title="Stats"
                graphData={statGraphs}
                graphOrder={graphOrder}
                heroGraphs={heroGraphs}
              />
            </CustomTabPanel>
            <CustomTabPanel value={activeTab} index={1}>
              <GraphObject
                title="Skills"
                graphData={skillGraphs}
                graphOrder={graphOrder}
                heroGraphs={heroGraphs}
              />
            </CustomTabPanel>
          </Box>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default CompareDialog;
