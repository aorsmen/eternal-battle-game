import useHerodexContext from "@/hooks/useHerodexContext";
import TopBar from "@/components/UI/TopBar";
import Loading from "@/components/UI/Loading";
import RosterCard from "@/components/Herodex/RosterCard";
import Pagination from "@/components/Herodex/Pagination";
import { HERODEX_PAGE_SIZE } from "@/config/hero";
import {
  PageMain,
  PageHeader,
  FilterBar,
  SearchField,
  SideFilter,
  SortSelect,
  ResultCount,
  RosterGrid,
  EmptyState,
} from "./styled.components";

const HerodexList = () => {
  const {
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
    compareFull,
    setQuery,
    setSide,
    setSort,
    setPage,
    toggleCompare,
  } = useHerodexContext();

  const from = (page - 1) * HERODEX_PAGE_SIZE + 1;

  // New cards replace the old ones, so start reading them from the top
  const changePage = (value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <PageMain>
      <TopBar />
      <PageHeader />
      <FilterBar>
        <SearchField value={query} onChange={setQuery} />
        <SideFilter value={side} counts={counts} onChange={setSide} />
        <SortSelect value={sort} onChange={setSort} />
      </FilterBar>
      {isLoading ? (
        <Loading type="static" />
      ) : (
        <>
          <ResultCount
            total={shown.length}
            from={from}
            to={from + pageItems.length - 1}
          />
          {shown.length > 0 ? (
            <RosterGrid>
              {pageItems.map((hero) => (
                <RosterCard
                  key={hero.id}
                  hero={hero}
                  selected={compareIds.includes(hero.id)}
                  compareFull={compareFull}
                  onToggleCompare={toggleCompare}
                />
              ))}
            </RosterGrid>
          ) : (
            <EmptyState />
          )}
          <Pagination page={page} pageCount={pageCount} onChange={changePage} />
        </>
      )}
    </PageMain>
  );
};

export default HerodexList;
