import { TableSectionHeader } from "@src/components";
import Table from "@src/components/Table";
import CreateUser from "./CreateUser";
import { useEffect, useRef } from "react";
import moment from "moment";
import UpdateUser from "./UpdateUser";
import { useUserStore } from "@src/app/userStore";

function Users() {
  const searchRef = useRef<HTMLInputElement>(null);

  const { data, fetchData, isLoading, page, search, setPage, setSearch } =
    useUserStore();

  const handleSearch = () => {
    setSearch(searchRef.current!.value);
  };

  useEffect(() => {
    fetchData();
  }, [fetchData, search]);

  return (
    <section>
      <TableSectionHeader
        title="Users"
        createComponent={<CreateUser />}
        reference={searchRef}
        onSubmit={handleSearch}
      />
      <Table
        isLoading={isLoading}
        columns={[
          "S.NO",
          "USER NAME",
          "EMAIL",
          "MOBILE NUMBER",
          "ROLE",
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
        {data?.data?.map((user, index) => (
          <tr key={user.id}>
            <td>{index + data.from}</td>
            <td>
              {user.firstName} {user.lastName}
            </td>
            <td>{user.email}</td>
            <td>{user.mobile}</td>
            <td>{user?.role?.role}</td>
            <td>
              {user?.createdByUser ? (
                <>
                  <div>
                    {user.createdByUser?.firstName}{" "}
                    {user.createdByUser?.lastName}
                  </div>
                  <div>
                    {moment(user.createdAt.toString()).format(
                      "DD MMM YYYY, h:mm a"
                    )}
                  </div>
                </>
              ) : (
                "None"
              )}
            </td>
            <td>
              {user?.modifiedByUser ? (
                <>
                  <div>
                    {user.modifiedByUser?.firstName}{" "}
                    {user.modifiedByUser?.lastName}
                  </div>
                  <div>
                    {moment(user.updatedAt.toString()).format(
                      "DD MMM YYYY, h:mm a"
                    )}
                  </div>
                </>
              ) : (
                "None"
              )}
            </td>
            <td>
              <UpdateUser data={user} />
            </td>
          </tr>
        ))}
      </Table>
    </section>
  );
}

export default Users;
