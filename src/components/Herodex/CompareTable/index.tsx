import { CompareSeriesType } from "@/types/main.types";
import {
  TableScroller,
  Table,
  ColumnHeader,
  RowLabel,
  ValueCell,
  NoColumns,
} from "./styled.components";

// Marks every cell holding the row's highest value; one column has no rival
const markBest = (values: number[]) => {
  const best = Math.max(...values);
  return values.map((value) => ({
    value,
    best: values.length > 1 && value === best,
  }));
};

const CompareTable = ({
  labels,
  columns,
}: {
  labels: string[];
  columns: CompareSeriesType[];
}) => {
  if (columns.length === 0) return <NoColumns />;

  const totals = columns.map((column) =>
    column.values.reduce((sum, value) => sum + value, 0)
  );

  return (
    <TableScroller>
      <Table>
        <thead>
          <tr>
            <td />
            {columns.map((column) => (
              <ColumnHeader
                key={column.id}
                name={column.name}
                color={column.color}
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {labels.map((label, row) => (
            <tr key={label}>
              <RowLabel>{label}</RowLabel>
              {markBest(columns.map((column) => column.values[row])).map(
                (cell, index) => (
                  <ValueCell
                    key={columns[index].id}
                    value={cell.value}
                    best={cell.best}
                  />
                )
              )}
            </tr>
          ))}
          <tr>
            <RowLabel bold>Total</RowLabel>
            {markBest(totals).map((cell, index) => (
              <ValueCell
                key={columns[index].id}
                value={cell.value}
                best={cell.best}
              />
            ))}
          </tr>
        </tbody>
      </Table>
    </TableScroller>
  );
};

export default CompareTable;
