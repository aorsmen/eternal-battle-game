import { useState } from "react";
import { HeroDataType } from "@/types/main.types";
import { getHeroRole } from "@/helpers/hero";
import { useMediaQuery, useTheme } from "@mui/material";
import {
  HeroCardWrapper,
  HeroCardName,
  HeroCardArt,
  HeroCardRole,
  HeroCardStats,
  ImagePreview,
} from "./styled.components";

const HeroCard = ({ data }: { data: HeroDataType }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"));
  const windowSize = matches ? "lg" : "sm";
  const [imgPreview, setImgPreview] = useState(false);
  const { name, images, biography, values } = data;
  const role = getHeroRole(data);

  return (
    <HeroCardWrapper alignment={biography.alignment} size={windowSize}>
      <HeroCardName name={name} size={windowSize} />
      <HeroCardArt
        alt={name}
        src={images.md}
        plc={images.xs}
        alignment={biography.alignment}
      />
      <HeroCardRole text={role} size={windowSize} />
      <HeroCardStats
        attack={values.attack}
        defense={values.defense}
        size={windowSize}
      />
      <ImagePreview
        alt={name}
        src={images.md}
        show={imgPreview}
        size={windowSize}
        onClose={() => setImgPreview(false)}
        onOpen={() => setImgPreview(true)}
      />
    </HeroCardWrapper>
  );
};

export default HeroCard;
