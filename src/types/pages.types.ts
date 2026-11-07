// "people" sections show large names; "tags" sections show a row of chips
export type CreditsPageContentType = {
  id: string;
  title: string;
  type: "people" | "tags";
  text: string[];
};

export type HomePageContentType = {
  text: string;
  link: string;
  primary?: boolean;
};
