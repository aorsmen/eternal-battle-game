import {
  Box,
  DialogTitle,
  IconButton,
  ButtonBase,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { HeroDataType } from "@/types/main.types";
import { graphColors, statGraphKeys } from "@/config/hero";
import {
  StatGraphDataType,
  SkillGraphDataType,
} from "@/types/main.types";
import { TITLE_STYLE, BROWN } from "@/config/general";
import HeroAvatar from "@/components/Herodex/HeroAvatar";

export const DialogHeader = ({ onClose }: { onClose: () => void }) => {
  return (
    <>
      <DialogTitle
        sx={{
          background: BROWN,
          color: "#fff",
          ...TITLE_STYLE,
          fontSize: "20px",
          padding: "10px 16px",
        }}
      >
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
        aria-label="Close"
      >
        <CloseIcon />
      </IconButton>
    </>
  );
};

export const HeroThumb = ({
  name,
  image,
  index,
  isMobile,
  onClick,
}: {
  name: string;
  image: string;
  index: number;
  isMobile: boolean;
  onClick: () => void;
}) => {
  return (
    <ButtonBase sx={{ flexDirection: "column" }} onClick={onClick}>
      <HeroAvatar
        size={isMobile ? 55 : 120}
        alt={name}
        src={image}
        variant="rounded"
      />
      <Typography
        sx={{
          fontSize: "12px",
          marginBlock: "10px 0",
          textAlign: "center",
          color: graphColors[index].stroke,
        }}
      >
        {name}
      </Typography>
    </ButtonBase>
  );
};

export const CustomTabPanel = ({
  children,
  index,
  value,
}: {
  children: React.ReactNode;
  index: number;
  value: number;
}) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ paddingBlock: 2 }}>{children}</Box>}
    </div>
  );
};

export const GraphObject = ({
  title,
  graphData,
  graphOrder,
  heroGraphs,
}: {
  title: string;
  graphData: (StatGraphDataType | SkillGraphDataType)[];
  graphOrder: string[];
  heroGraphs: HeroDataType[];
}) => {
  return (
    <Box
      sx={{
        maxWidth: "500px",
        maxHeight: "500px",
        width: "100%",
        height: "100%",
        marginInline: "auto",
      }}
    >
      <ResponsiveContainer
        width="100%"
        height="100%"
        minWidth={250}
        minHeight={250}
        aspect={1}
      >
        <RadarChart
          cx="50%"
          cy="50%"
          outerRadius="65%"
          data={graphData}
          title={title}
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
  );
};
