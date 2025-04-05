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
} from "./styled.components";
import "./HeroCard.css";

const HeroCard = ({ data }: { data: HeroDataType }) => {
  const [imgPreview, setImgPreview] = useState(false);
  const { name, images, biography, values, work } = data;

  return (
    <HeroCardWrapper>
      <HeroCardHeader name={name} />
      <HeroCardBody>
        <ImageWrapper alt={name} src={images.md} plc={images.xs} />
        <ImagePreview
          alt={name}
          src={images.md}
          show={imgPreview}
          onClose={() => setImgPreview(false)}
          onOpen={() => setImgPreview(true)}
        />
        <Typography
          sx={{ fontSize: "12px", marginBlock: "5px", textAlign: "left" }}
        >
          {`${biography.alignment === "good" ? "Hero" : "Villain"}`}
        </Typography>
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
