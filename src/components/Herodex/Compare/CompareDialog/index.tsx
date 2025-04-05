import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
  Stack,
  Typography,
  ButtonBase,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import useMainContext from "../../../../hooks/useMainContext";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { HeroDataType } from "../../../../types/main.types";
import HeroAvatar from "../../HeroAvatar";
import {
  graphColors,
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
import { BROWN } from "../../../../config/general";

const CompareDialog = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [statGraphs, setStatGraphs] = useState<StatGraphDataType[]>([]);
  const [skillGraphs, setSkillGraphs] = useState<SkillGraphDataType[]>([]);
  const [heroGraphs, setHeroGraphs] = useState<HeroDataType[]>([]);
  const [graphOrder, setGraphOrder] = useState<string[]>([]);
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
  }, []);

  return (
    <Dialog onClose={onClose} open={isOpen} maxWidth="lg" fullWidth>
      <DialogTitle sx={{ m: 0, p: 2, background: BROWN, color: "#fff" }}>
        Compare
      </DialogTitle>
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: "#fff",
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <Stack direction="row">
          <Stack spacing={2} sx={{ height: "650px" }}>
            {heroGraphs.map((hero, inx) => (
              <ButtonBase
                key={hero.id}
                sx={{ flexDirection: "column" }}
                onClick={() => graphOrderHandler(hero.id)}
              >
                <HeroAvatar
                  size={120}
                  alt={hero?.name || ""}
                  src={hero?.images.md || ""}
                  variant="rounded"
                />
                <Typography
                  sx={{
                    fontSize: "12px",
                    marginBlock: "10px 0",
                    textAlign: "center",
                  }}
                >
                  {hero?.name}
                </Typography>
              </ButtonBase>
            ))}
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            sx={{ flex: 1 }}
            spacing={5}
          >
            <Box
              sx={{
                maxWidth: "450px",
                maxHeight: "450px",
                width: "100%",
                height: "100%",
              }}
            >
              <Typography sx={{ textAlign: "center" }}>STATS</Typography>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart
                  cx="50%"
                  cy="50%"
                  outerRadius="80%"
                  data={statGraphs}
                >
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis />
                  {graphOrder.map((heroId) => {
                    const inx = heroGraphs.findIndex((hr) => hr.id === heroId);
                    const hero = heroGraphs[inx];

                    return (
                      <Radar
                        key={hero?.id}
                        name={hero?.name}
                        dataKey={statGraphKeys[inx]}
                        stroke={graphColors[inx].stroke}
                        fill={graphColors[inx].fill}
                        fillOpacity={0.6}
                      />
                    );
                  })}
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </Box>
            <Box
              sx={{
                maxWidth: "450px",
                maxHeight: "450px",
                width: "100%",
                height: "100%",
              }}
            >
              <Typography sx={{ textAlign: "center" }}>SKILLS</Typography>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart
                  cx="50%"
                  cy="50%"
                  outerRadius="80%"
                  data={skillGraphs}
                >
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis />
                  {graphOrder.map((heroId) => {
                    const inx = heroGraphs.findIndex((hr) => hr.id === heroId);
                    const hero = heroGraphs[inx];

                    return (
                      <Radar
                        key={hero?.id}
                        name={hero?.name}
                        dataKey={skillGraphKeys[inx]}
                        stroke={graphColors[inx].stroke}
                        fill={graphColors[inx].fill}
                        fillOpacity={0.6}
                      />
                    );
                  })}
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </Box>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default CompareDialog;
