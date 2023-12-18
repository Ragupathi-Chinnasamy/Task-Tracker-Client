import { CustomButton, CustomModal, TableSectionHeader } from "@src/components";
import Table from "@src/components/Table";
import { useEffect, useRef, useState } from "react";
import moment from "moment";
import { BASE_URL } from "@src/network/ApiClient";
import UpdateIssue from "./UpdateIssue";
import { Modal, Select } from "@mantine/core";
import CreateIssue from "./CreateIssue";
import {
  useIssueStatusStore,
  useIssueStore,
  useIssueTypeStore,
} from "@src/app/issueStore";
import { useProjectStore } from "@src/app/projectStore";
import { useUserStore } from "@src/app/userStore";

function Issues() {
  const searchRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [isImgModalOpen, setIsImgModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const { data: projects, fetchData: fetchProjects } = useProjectStore();
  const { data: users, fetchData: fetchUsers } = useUserStore();
  const { data: taskTypes, fetchData: fetchTaskTypes } = useIssueTypeStore();
  const { data: taskStatus, fetchData: fetchTaskStatus } =
    useIssueStatusStore();
  const {
    projectId,
    assigneeId,
    statusId,
    typeId,
    page,
    search,
    isLoading,
    data,
    setPage,
    setSearch,
    fetchData,
    setProjectId,
    setTaskTypeId,
    setTaskStatusId,
    setAssigneeId,
    resetState,
  } = useIssueStore();

  const onClickApplyFilter = () => {
    fetchData();
    setIsFilterModalOpen(!isFilterModalOpen);
  };

  const onClickClearFilter = () => {
    resetState();
    fetchData();
    setIsFilterModalOpen(!isFilterModalOpen);
  };

  useEffect(() => {
    fetchData();
  }, [fetchData, search]);

  useEffect(() => {
    if (isFilterModalOpen) {
      fetchProjects();
      fetchUsers();
      fetchTaskTypes();
      fetchTaskStatus();
    }
  }, [
    fetchProjects,
    fetchTaskStatus,
    fetchTaskTypes,
    fetchUsers,
    isFilterModalOpen,
  ]);

  return (
    <section>
      <CustomModal
        modalSize="md"
        title="Apply filter"
        isModalOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(!isFilterModalOpen)}
      >
        {
          <div className="space-y-4 px-4 pb-4 text-gray-600">
            <Select
              size="md"
              radius="md"
              label="Select Project"
              placeholder="Projects"
              value={projectId.toString()}
              onChange={(projectId: string | null) =>
                setProjectId(Number(projectId))
              }
              data={projects?.data.map((project) => ({
                value: project?.id.toString(),
                label: project?.title,
              }))}
            />
            <Select
              size="md"
              radius="md"
              label="Select Task type"
              placeholder="Task Type"
              value={typeId.toString()}
              onChange={(typeId: string | null) =>
                setTaskTypeId(Number(typeId))
              }
              data={taskTypes?.data.map((type) => ({
                value: type?.id.toString(),
                label: type?.type,
              }))}
            />
            <Select
              size="md"
              radius="md"
              label="Select Task status"
              placeholder="Task Status"
              value={statusId.toString()}
              onChange={(statusId: string | null) =>
                setTaskStatusId(Number(statusId))
              }
              data={taskStatus?.data.map((status) => ({
                value: status?.id.toString(),
                label: status?.status,
              }))}
            />
            <Select
              size="md"
              radius="md"
              label="Select Assigned user"
              placeholder="Task Type"
              value={assigneeId.toString()}
              onChange={(assigneeId: string | null) =>
                setAssigneeId(Number(assigneeId))
              }
              data={users?.data.map((user) => ({
                value: user?.id.toString(),
                label: `${user.firstName} ${user.lastName}`,
              }))}
            />
            <div className="flex gap-2">
              <button
                onClick={onClickClearFilter}
                className="rounded-md px-4 py-2 bg-white/60 border border-solid border-gray-300 w-1/2 font-semibold shadow-sm cursor-pointer active:scale-95 text-black/90"
              >
                Clear filter
              </button>
              <CustomButton
                width="w-1/2"
                type="submit"
                onClick={onClickApplyFilter}
                title="Apply filter"
                bgColor="bg-secondary"
                textColor="text-black"
              />
            </div>
          </div>
        }
      </CustomModal>

      <Modal
        opened={isImgModalOpen}
        onClose={() => {
          setIsImgModalOpen(!isImgModalOpen);
        }}
        centered
        size="auto"
        transitionProps={{
          transition: "fade",
          duration: 200,
          timingFunction: "linear",
        }}
      >
        <div className="border border-solid bg-gray-600 p-5 text-white">
          <p>{imageUrl}</p>
          <img
            src={`${BASE_URL}task/${imageUrl}`}
            alt="task-image"
            className="border border-solid border-gray-200 max-w-full max-h-max "
          />
        </div>
      </Modal>
      <TableSectionHeader
        createComponent={<CreateIssue />}
        filterComponent={
          <CustomButton
            type="button"
            onClick={() => setIsFilterModalOpen(!isFilterModalOpen)}
            title="Apply filter"
            bgColor="bg-secondary"
            textColor="text-black"
          />
        }
        title="Tasks"
        onSubmit={() => {
          setSearch(searchRef.current!.value);
        }}
        reference={searchRef}
      />
      <Table
        isLoading={isLoading}
        columns={[
          "S.NO",
          "PROJECT ASSOCIATED",
          "TITLE",
          "DESCRIPTION",
          "STATUS",
          "ASSIGNED TO",
          "CREATED BY",
          "MODIFIED BY",
          "RELATED IMAGES",
          "ACTION",
        ]}
        from={data?.from ?? 0}
        to={data?.to ?? 0}
        total={data?.total ?? 0}
        totalPages={data?.totalPages ?? 0}
        currentPage={page}
        onPageChanged={setPage}
      >
        {data?.data?.map((task, index) => (
          <tr key={task.title}>
            <td>{index + data.from}</td>
            <td>{task.project?.title}</td>
            <td>{task.title}</td>
            <td className="max-w-xs">{task.description}</td>
            <td>{task?.status?.status}</td>
            <td className="max-w-[300px]">
              {
                <div className="flex items-center justify-center flex-wrap gap-2">
                  {task.taskAssignees.map((assignee) => (
                    <div
                      key={assignee.user.id}
                      className="border border-solid border-gray-400 rounded-full px-2"
                    >
                      {`${assignee.user.firstName} ${assignee.user.lastName}`}
                    </div>
                  ))}
                </div>
              }
            </td>
            <td>
              <div>
                {task.createdByUser?.firstName} {task.createdByUser?.lastName}
              </div>
              <div>
                {moment(task.createdAt.toString()).format(
                  "DD MMM YYYY, h:mm a"
                )}
              </div>
            </td>
            <td className="">
              {task?.modifiedByUser ? (
                <>
                  <div>
                    {task?.modifiedByUser.firstName}{" "}
                    {task?.modifiedByUser.lastName}
                  </div>
                  <div>
                    {moment(task.updatedAt.toString()).format(
                      "DD MMM YYYY, h:mm a"
                    )}
                  </div>
                </>
              ) : (
                "None"
              )}
            </td>
            <td className="max-w-[300px]">
              {task?.taskImages?.length > 0
                ? task?.taskImages?.map((image) => (
                    <img
                      key={image.id}
                      src={`${BASE_URL}task/${image.image}`}
                      alt="task-image"
                      className="w-[70px] h-[50px] mr-3 border border-solid border-gray-400 p-1 hover:cursor-pointer"
                      onClick={() => {
                        setIsImgModalOpen(!isImgModalOpen);
                        setImageUrl(image.image);
                      }}
                    />
                  ))
                : "None"}
            </td>

            <td>
              <UpdateIssue data={task} />
            </td>
          </tr>
        ))}
      </Table>
    </section>
  );
}

export default Issues;
