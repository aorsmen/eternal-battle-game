import { useState } from "react";
import { HeroDataType } from "../../types/main.types";
import { Typography } from "@mui/material";
import {
  HeroCardWrapper,
  HeroCardHeader,
  HeroCardBody,
  HeroCardFooter,
  InfoWrapper,
  ImageWrapper,
  ImagePreview,
  AlignmentWrapper,
} from "./styled.components";
import "./HeroCard.css";

const HeroCard = ({ data }: { data: HeroDataType }) => {
  const [imgPreview, setImgPreview] = useState(false);
  const { name, images, biography, values, work } = data;

  return (
    <HeroCardWrapper alignment={biography.alignment}>
      <HeroCardHeader name={name} />
      <HeroCardBody>
        <ImageWrapper alt={name} src={images.md} plc={images.xs} />
        <ImagePreview
          alt={name}
          src={images.md}
          show={imgPreview}
          alignment={biography.alignment}
          onClose={() => setImgPreview(false)}
          onOpen={() => setImgPreview(true)}
        />
        <AlignmentWrapper alignment={biography.alignment} />
        <InfoWrapper text={work.occupation} />
      </HeroCardBody>
      <HeroCardFooter>
        <Typography
          sx={{ lineHeight: 1 }}
        >{`${values.attack}/${values.defense}`}</Typography>
      </HeroCardFooter>
    </HeroCardWrapper>
  );
};

export default HeroCard;
