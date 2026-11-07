import React, { createContext, useCallback, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router";
import { APIS } from "@/config/api";
import { COMPARE_LIMIT, HERODEX_PAGE_SIZE } from "@/config/hero";
import {
  calculateSkills,
  calculateValues,
  getHeroRole,
  matchesRosterSearch,
  parseCompareIds,
} from "@/helpers/hero";
import useDebounce from "@/hooks/useDebounce";
import {
  HeroDataType,
  HerodexContextType,
  HerodexSideFilterType,
  HerodexSortType,
  RosterHeroType,
} from "@/types/main.types";

const SEARCH_DEBOUNCE_MS = 300;

const initState: HerodexContextType = {
  roster: [],
  isLoading: false,
  query: "",
  side: "all",
  sort: "name",
  shown: [],
  page: 1,
  pageCount: 1,
  pageItems: [],
  counts: { all: 0, heroes: 0, villains: 0 },
  compareIds: [],
  picked: [],
  compareFull: false,
  setQuery: () => {},
  setSide: () => {},
  setSort: () => {},
  setPage: () => {},
  toggleCompare: () => {},
  clearCompare: () => {},
  getHeroById: () => null,
};

export const HerodexContext = createContext(initState);

// Only heroes and villains are playable, so neutral characters are left out
const toPlayableHeroes = (data: HeroDataType[]): HeroDataType[] =>
  data
    .filter(
      (hero) =>
        hero.biography.alignment === "good" ||
        hero.biography.alignment === "bad"
    )
    .map((hero) => {
      const skills = calculateSkills(hero.powerstats);
      return {
        ...hero,
        id: String(hero.id),
        skills,
        values: calculateValues(skills),
      };
    });

const toRosterHero = (hero: HeroDataType): RosterHeroType => ({
  id: hero.id,
  name: hero.name,
  role: getHeroRole(hero),
  aliases: (hero.biography.aliases ?? []).filter((alias) => alias !== "-"),
  side: hero.biography.alignment === "good" ? "heroes" : "villains",
  images: hero.images,
  values: hero.values,
});

const sortHeroes = (sort: HerodexSortType) => {
  return (a: RosterHeroType, b: RosterHeroType) => {
    if (sort === "nameDesc") return b.name.localeCompare(a.name);
    if (sort !== "name") {
      const diff = b.values[sort] - a.values[sort];
      if (diff !== 0) return diff;
    }
    return a.name.localeCompare(b.name);
  };
};

// Shared by the roster (/herodex) and character pages (/herodex/:id), so
// filters and compare picks survive moving between them
const HerodexContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [query, setQuery] = useState(initState.query);
  const [side, setSide] = useState<HerodexSideFilterType>(initState.side);
  const [sort, setSort] = useState<HerodexSortType>(initState.sort);
  const location = useLocation();
  // Opening a shared compare link (/herodex/compare?ids=1,2) starts with
  // those picks
  const [pickedIds, setCompareIds] = useState<string[]>(() =>
    location.pathname.endsWith("/compare")
      ? parseCompareIds(new URLSearchParams(location.search).get("ids"))
      : initState.compareIds
  );
  const debouncedQuery = useDebounce(query, SEARCH_DEBOUNCE_MS);
  const search = debouncedQuery.trim().toLowerCase();

  // The page belongs to one search/side/sort combination, so changing any of
  // them starts again from page 1 without an extra render
  const filterKey = `${search}|${side}|${sort}`;
  const [pageState, setPageState] = useState({ key: filterKey, page: 1 });

  const { data, isLoading } = useQuery({
    queryKey: ["hero-data"],
    queryFn: async () => {
      const response = await fetch(APIS.heroData);
      return await response.json();
    },
  });

  const heroes = useMemo(
    () => (Array.isArray(data) ? toPlayableHeroes(data) : []),
    [data]
  );

  const heroesById = useMemo(
    () => new Map(heroes.map((hero) => [hero.id, hero])),
    [heroes]
  );

  const roster = useMemo(() => heroes.map(toRosterHero), [heroes]);

  // Ids from a link may not exist; drop them once the data is in
  const compareIds = useMemo(
    () =>
      heroes.length > 0
        ? pickedIds.filter((id) => heroesById.has(id))
        : pickedIds,
    [pickedIds, heroes, heroesById]
  );

  const counts = useMemo(
    () => ({
      all: roster.length,
      heroes: roster.filter((hero) => hero.side === "heroes").length,
      villains: roster.filter((hero) => hero.side === "villains").length,
    }),
    [roster]
  );

  const shown = useMemo(() => {
    return roster
      .filter(
        (hero) =>
          (side === "all" || hero.side === side) &&
          matchesRosterSearch(hero, search)
      )
      .sort(sortHeroes(sort));
  }, [roster, search, side, sort]);

  const pageCount = Math.max(1, Math.ceil(shown.length / HERODEX_PAGE_SIZE));
  const page =
    pageState.key === filterKey ? Math.min(pageState.page, pageCount) : 1;

  const pageItems = useMemo(
    () => shown.slice((page - 1) * HERODEX_PAGE_SIZE, page * HERODEX_PAGE_SIZE),
    [shown, page]
  );

  const setPage = useCallback(
    (value: number) => setPageState({ key: filterKey, page: value }),
    [filterKey]
  );

  const picked = useMemo(
    () =>
      compareIds
        .map((id) => roster.find((hero) => hero.id === id))
        .filter((hero): hero is RosterHeroType => hero !== undefined),
    [compareIds, roster]
  );

  const toggleCompare = useCallback(
    (id: string) => {
      setCompareIds((prev) => {
        const current =
          heroesById.size > 0
            ? prev.filter((item) => heroesById.has(item))
            : prev;
        if (current.includes(id)) return current.filter((item) => item !== id);
        if (current.length >= COMPARE_LIMIT) return current;
        return [...current, id];
      });
    },
    [heroesById]
  );

  const clearCompare = useCallback(() => setCompareIds([]), []);

  const getHeroById = useCallback(
    (id: string) => heroesById.get(id) ?? null,
    [heroesById]
  );

  return (
    <HerodexContext.Provider
      value={{
        roster,
        isLoading,
        query,
        side,
        sort,
        shown,
        page,
        pageCount,
        pageItems,
        counts,
        compareIds,
        picked,
        compareFull: compareIds.length >= COMPARE_LIMIT,
        setQuery,
        setSide,
        setSort,
        setPage,
        toggleCompare,
        clearCompare,
        getHeroById,
      }}
    >
      {children}
    </HerodexContext.Provider>
  );
};

export default HerodexContextProvider;
