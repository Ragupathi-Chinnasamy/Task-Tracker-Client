import moment from "moment";
import { useEffect, useRef } from "react";
import UpdateProject from "./UpdateProject";
import { TableSectionHeader } from "@src/components";
import Table from "@src/components/Table";
import CreateProject from "./CreateProject";
import { useProjectStore } from "@src/app/projectStore";

export default function Projects() {
  const { page, setPage, search, setSearch, data, fetchData, isLoading } =
    useProjectStore();
  const searchRef = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    setSearch(searchRef.current!.value);
  };

  useEffect(() => {
    fetchData();
  }, [search, page, fetchData]);

  return (
    <section>
      <TableSectionHeader
        createComponent={<CreateProject />}
        title="Projects"
        onSubmit={handleSearch}
        reference={searchRef}
      />
      <Table
        isLoading={isLoading}
        columns={[
          "S.NO",
          "TITLE",
          "DESCRIPTION",
          "CREATED BY",
          "MODIFIED BY",
          "ACTION",
        ]}
        from={data?.from ?? 0}
        to={data?.to ?? 0}
        total={data?.total ?? 0}
        totalPages={data?.totalPages ?? 0}
        currentPage={page}
        onPageChanged={setPage}
      >
        {data?.data?.map((project, index) => (
          <tr key={project.title}>
            <td>{index + data.from}</td>
            <td>{project.title}</td>
            <td className="max-w-xs">{project.description}</td>
            <td>
              <div>
                {project.createdUser?.firstName} {project.createdUser?.lastName}
              </div>
              <div>
                {moment(project.createdAt.toString()).format(
                  "DD MMM YYYY, h:mm a"
                )}
              </div>
            </td>
            <td>
              {project?.modifiedUser ? (
                <>
                  <div>
                    {project.modifiedUser?.firstName}{" "}
                    {project.modifiedUser?.lastName}
                  </div>
                  <div>
                    {moment(project.updatedAt.toString()).format(
                      "DD MMM YYYY, h:mm a"
                    )}
                  </div>
                </>
              ) : (
                "None"
              )}
            </td>
            <td>
              <UpdateProject data={project} />
            </td>
          </tr>
        ))}
      </Table>
    </section>
  );
}
