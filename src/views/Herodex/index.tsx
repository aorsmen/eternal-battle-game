import { Outlet, useMatch } from "react-router";
import HerodexContextProvider from "@/store/Herodex";
import useHerodexContext from "@/hooks/useHerodexContext";
import CompareTray from "@/components/Herodex/CompareTray";
import { PageShell } from "./styled.components";

// Reads the context, so it has to sit inside the provider
const HerodexShell = () => {
  const { picked, toggleCompare, clearCompare } = useHerodexContext();
  // The compare page lists the picks itself
  const onComparePage = useMatch("/herodex/compare") !== null;

  return (
    <PageShell>
      <Outlet />
      {picked.length > 0 && !onComparePage && (
        <CompareTray
          picked={picked}
          onRemove={toggleCompare}
          onClear={clearCompare}
        />
      )}
    </PageShell>
  );
};

// Layout for the roster (/herodex) and character pages (/herodex/:id): they
// share filters and compare picks, and the compare tray sits under both
const Herodex = () => {
  return (
    <HerodexContextProvider>
      <HerodexShell />
    </HerodexContextProvider>
  );
};

export default Herodex;
