import { Fragment } from "react";
import TopBar from "@/components/UI/TopBar";
import { CREDITS_CONTENT, GITHUB_URL } from "@/config/pages";
import {
  CreditsMain,
  CreditsHeader,
  CreditsSection,
  SectionDivider,
  CreditsActions,
  SourceLink,
  PlayLink,
} from "./styled.components";

const Credits = () => {
  return (
    <CreditsMain>
      <TopBar />
      <CreditsHeader />
      {CREDITS_CONTENT.map((section, index) => (
        <Fragment key={section.id}>
          {index > 0 && <SectionDivider />}
          <CreditsSection section={section} />
        </Fragment>
      ))}
      <CreditsActions>
        <SourceLink href={GITHUB_URL} />
        <PlayLink to="/battle" />
      </CreditsActions>
    </CreditsMain>
  );
};

export default Credits;
