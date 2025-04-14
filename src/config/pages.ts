import {
  CreditsPageContentType,
  HomePageContentType,
} from "../types/pages.types";

export const CREDITS_CONTENT: CreditsPageContentType[] = [
  {
    title: "Game Design & Development",
    text: ["Altug Orsmen"],
  },
  {
    title: "Technology Stack",
    text: [
      "React.js. React Router, Tanstack React Query",
      "Material UI, GSAP, xyflow, Recharts",
    ],
  },
  {
    title: "Special Thanks",
    text: ["Tuna Orsmen"],
  },
];

export const HOME_PAGE_CONTENT: HomePageContentType[] = [
  {
    text: "BATTLE",
    link: "/battle",
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
