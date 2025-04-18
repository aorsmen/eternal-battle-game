import {
  Box,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  SxProps,
} from "@mui/material";
import {
  BiographyType,
  AppearanceType,
  PowerStatType,
  SkillsType,
} from "../../../../types/main.types";
import {
  biographyDataMap,
  appearanceDataMap,
  statsDataMap,
  skillsDataMap,
} from "../../../../config/hero";

export const formatValue = (value: string | string[]) => {
  return Array.isArray(value) ? (value as string[]).join(" / ") : value;
};

export const BiographySection = ({ data }: { data: BiographyType }) => {
  return (
    <Box sx={{ paddingInline: "10px", marginTop: "20px" }}>
      <Table>
        <TableBody>
          {biographyDataMap.rows.map((row) => {
            const rowValue = formatValue(data[row.key]);

            return (
              <TableRow key={row.key}>
                <TableCell
                  variant="head"
                  sx={{ padding: "10px", width: "30%" }}
                >
                  {row.label}
                </TableCell>
                <TableCell sx={{ padding: "10px" }}>{rowValue}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Box>
  );
};

export const AppearanceSection = ({ data }: { data: AppearanceType }) => {
  return (
    <Box sx={{ paddingInline: "10px", marginTop: "20px" }}>
      <Table>
        <TableBody>
          {appearanceDataMap.rows.map((row) => {
            const rowValue = formatValue(data[row.key]);

            return (
              <TableRow key={row.key}>
                <TableCell
                  variant="head"
                  sx={{ padding: "10px", width: "30%" }}
                >
                  {row.label}
                </TableCell>
                <TableCell sx={{ padding: "10px" }}>{rowValue}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Box>
  );
};

export const StatsSection = ({
  data,
  sx,
}: {
  data: PowerStatType;
  sx?: SxProps;
}) => {
  return (
    <Box sx={{ paddingInline: "10px", marginTop: "20px", ...sx }}>
      <Typography
        variant="h6"
        sx={{
          marginBottom: "10px",
          paddingInline: "10px",
          fontSize: "14px",
          fontWeight: 700,
        }}
      >
        {statsDataMap.title}
      </Typography>
      <Table>
        <TableBody>
          {statsDataMap.rows.map((row) => {
            const rowValue = data[row.key].toString();

            return (
              <TableRow key={row.key}>
                <TableCell variant="head" sx={{ padding: "10px" }}>
                  {row.label}
                </TableCell>
                <TableCell align="right" sx={{ padding: "10px" }}>
                  {rowValue}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Box>
  );
};

export const SkillsSection = ({
  data,
  sx,
}: {
  data: SkillsType;
  sx?: SxProps;
}) => {
  return (
    <Box sx={{ paddingInline: "10px", marginTop: "20px", ...sx }}>
      <Typography
        variant="h6"
        sx={{
          marginBottom: "10px",
          paddingInline: "10px",
          fontSize: "14px",
          fontWeight: 700,
        }}
      >
        {skillsDataMap.title}
      </Typography>
      <Table>
        <TableBody>
          {skillsDataMap.rows.map((row) => {
            const rowValue = data[row.key].toString();

            return (
              <TableRow key={row.key}>
                <TableCell variant="head" sx={{ padding: "10px" }}>
                  {row.label}
                </TableCell>
                <TableCell align="right" sx={{ padding: "10px" }}>
                  {rowValue}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Box>
  );
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export const CustomTabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
    </div>
  );
};

export const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};
