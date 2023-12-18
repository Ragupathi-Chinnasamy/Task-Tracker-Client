import { Pagination, ScrollArea } from "@mantine/core";
import TableSkeleton from "./TableSkeleton";

type TableProps = {
  isLoading: boolean;
  columns: string[];
  from: number;
  to: number;
  total: number;
  totalPages: number;
  children: React.ReactNode;
  currentPage: number;
  onPageChanged: (page: number) => void;
};

function Table({
  columns,
  isLoading,
  total,
  children,
  from,
  to,
  totalPages,
  currentPage,
  onPageChanged,
}: TableProps) {
  return (
    <section className="min-w-full">
      <ScrollArea>
        <table className="w-full table">
          <thead className="text-lg uppercase">
            <tr>
              {columns.map((heading, index) => (
                <th key={index}>{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <TableSkeleton columns={columns} />
            ) : total > 0 ? (
              <>{children}</>
            ) : (
              <tr>
                <td colSpan={columns?.length ?? 1}>No Data found</td>
              </tr>
            )}
          </tbody>
        </table>
      </ScrollArea>
      {total > 0 && (
        <div className="flex pt-4 justify-between items-center">
          <div className="text-gray-700 text-[15px]">
            Showing From {from} To {to} of {total} results
          </div>
          <Pagination
            radius="lg"
            total={isLoading ? 1 : totalPages}
            value={isLoading ? 0 : currentPage}
            color="#5D3587"
            onChange={isLoading ? () => {} : onPageChanged}
          />
        </div>
      )}
    </section>
  );
}

export default Table;
