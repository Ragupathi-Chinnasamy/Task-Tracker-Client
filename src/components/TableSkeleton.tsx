import { Skeleton } from "@mantine/core";

function TableSkeleton({ columns }: { columns: string[] }) {
  const noOfRows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <>
      {noOfRows.map((rows) => (
        <tr key={rows}>
          {columns.map((column) => (
            <td key={column} className="py-4 px-4">
              <Skeleton width={"100%"} height={10} />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

export default TableSkeleton;
