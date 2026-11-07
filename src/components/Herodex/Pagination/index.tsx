import { getPageNumbers } from "@/helpers/pagination";
import {
  PaginationNav,
  StepButton,
  PageList,
  PageButton,
  PageGap,
  PageStatus,
} from "./styled.components";

const Pagination = ({
  page,
  pageCount,
  onChange,
}: {
  page: number;
  pageCount: number;
  onChange: (page: number) => void;
}) => {
  if (pageCount <= 1) return null;

  return (
    <PaginationNav>
      <StepButton
        direction="previous"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
      />
      <PageList>
        {getPageNumbers(page, pageCount).map((item, index) =>
          item === "gap" ? (
            <PageGap key={`gap-${index}`} />
          ) : (
            <PageButton
              key={item}
              page={item}
              current={item === page}
              onClick={() => onChange(item)}
            />
          )
        )}
      </PageList>
      <PageStatus page={page} pageCount={pageCount} />
      <StepButton
        direction="next"
        disabled={page >= pageCount}
        onClick={() => onChange(page + 1)}
      />
    </PaginationNav>
  );
};

export default Pagination;
