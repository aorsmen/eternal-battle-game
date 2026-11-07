import { SectionWrapper, SectionTitle } from "./styled.components";

// A titled panel box (Stats, Skills, Identity, Origin). The other building
// blocks for the detail tabs live in ./styled.components
const CharacterSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <SectionWrapper title={title}>
      <SectionTitle title={title} />
      {children}
    </SectionWrapper>
  );
};

export default CharacterSection;
