import {
  CreditsPageContentType,
  HomePageContentType,
} from "@/types/pages.types";

export const GITHUB_URL = "https://github.com/aorsmen/eternal-battle-game";

export const CREDITS_CONTENT: CreditsPageContentType[] = [
  {
    id: "development",
    title: "Game design & development",
    type: "people",
    text: ["Altug Orsmen"],
  },
  {
    id: "technology",
    title: "Built with",
    type: "tags",
    text: [
      "React.js",
      "React Router",
      "TanStack React Query",
      "Material UI",
      "GSAP",
      "Recharts",
    ],
  },
  {
    id: "thanks",
    title: "Special thanks",
    type: "people",
    text: ["Tuna Orsmen"],
  },
];

export const HOME_PAGE_CONTENT: HomePageContentType[] = [
  {
    text: "BATTLE",
    link: "/battle",
    primary: true,
  },
  {
    text: "HERODEX",
    link: "/herodex",
  },
  {
    text: "CREDITS",
    link: "/credits",
  },
];
