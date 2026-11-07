import { useContext } from "react";
import { HerodexContext } from "@/store/Herodex";
import { HerodexContextType } from "@/types/main.types";

const useHerodexContext = (): HerodexContextType => {
  const {
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
    compareFull,
    setQuery,
    setSide,
    setSort,
    setPage,
    toggleCompare,
    clearCompare,
    getHeroById,
  } = useContext(HerodexContext);

  return {
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
    compareFull,
    setQuery,
    setSide,
    setSort,
    setPage,
    toggleCompare,
    clearCompare,
    getHeroById,
  };
};

export default useHerodexContext;
