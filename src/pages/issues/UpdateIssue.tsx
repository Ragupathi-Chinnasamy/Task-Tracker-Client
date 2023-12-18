import {
  TextInput,
  FileInput,
  MultiSelect,
  Select,
  Textarea,
  Modal,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useProjectStore } from "@src/app/projectStore";
import {
  useIssueStatusStore,
  useIssueStore,
  useIssueTypeStore,
} from "@src/app/issueStore";
import { useUserStore } from "@src/app/userStore";
import { CustomButton, CustomModal, ImagePill } from "@src/components";
import UpdateButton from "@src/components/UpdateButton";
import { updateIssueFormInput } from "@src/models";
import { IssueRes } from "@src/models/issue";
import { BASE_URL } from "@src/network/ApiClient";
import apiProvider from "@src/network/ApiProvider";
import { TaskStatuses, TaskTypes } from "@src/utils/enums";
import { zodResolver } from "mantine-form-zod-resolver";
import { useEffect, useState } from "react";

export default function UpdateIssue({ data }: { data: IssueRes }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState("");
  const [isImgModalOpen, setIsImgModalOpen] = useState(false);
  const [files, setFiles] = useState<File[] | undefined>();
  const [isDeleteImgModalOpen, setIsDeleteImgModalOpen] = useState(false);
  const { fetchData: fetchTaskTypes, data: taskTypes } = useIssueTypeStore();
  const { fetchData: fetchProjects, data: projects } = useProjectStore();
  const { fetchData: fetchTaskAssignees, data: users } = useUserStore();
  const { fetchData: fetchTaskStatus, data: taskStatus } =
    useIssueStatusStore();
  const { fetchData } = useIssueStore();

  const onClickDeletImage = async (fileName: string) => {
    const isRequestSuccess = await apiProvider.deleteImage(fileName);
    if (isRequestSuccess) fetchData();
  };

  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      projectId: "0",
      typeId: TaskTypes.Task || TaskTypes.Bug,
      taskAssigneeId: ["0"],
      statusId:
        TaskStatuses.InProgress ||
        TaskStatuses.ToDo ||
        TaskStatuses.Resolved ||
        TaskStatuses.Reopened,
    },
    validate: zodResolver(updateIssueFormInput),
  });

  function resetForm() {
    setIsModalOpen(!isModalOpen);
    form.reset();
    setFiles(undefined);
  }

  const onSubmit = async (values: typeof form.values) => {
    const formData = new FormData();

    formData.append("taskId", data?.id?.toString());
    formData.append("projectId", values.projectId);
    formData.append("typeId", values.typeId);
    formData.append("statusId", values.statusId);
    formData.append("title", values.title);
    formData.append("description", values.description);
    values?.taskAssigneeId.forEach((item, index) => {
      formData.append(`taskAssigneeId[${index}]`, String(item));
    });

    if (files) {
      files?.map((file: File) => {
        formData.append("file", file);
      });
    }

    const isRequestSuccess = await apiProvider.updateTask(formData);

    if (isRequestSuccess) {
      resetForm();
      fetchData();
    }
  };

  useEffect(() => {
    function setFormData() {
      form.setValues({
        title: data.title,
        description: data.description,
        projectId: String(data?.project?.id),
        typeId: String(data?.type?.id) as TaskTypes,
        statusId: String(data?.statusId) as TaskStatuses,
        taskAssigneeId: data?.taskAssignees?.map((a) => `${a.user.id}`),
      });
    }

    if (isModalOpen) {
      fetchProjects();
      fetchTaskTypes();
      fetchTaskStatus();
      fetchTaskAssignees();
      setFormData();
    }
  }, [isModalOpen]);

  return (
    <section>
      <CustomModal
        title="Update Task"
        isModalOpen={isModalOpen}
        onClose={resetForm}
        modalSize="lg"
      >
        {
          <form
            className="space-y-4 text-gray-600 pb-5 px-5 w-full"
            onSubmit={form.onSubmit(onSubmit)}
          >
            <Select
              size="md"
              radius="md"
              label="Select Project"
              placeholder="Projects"
              data={projects?.data.map((project) => ({
                value: project?.id.toString(),
                label: project?.title,
              }))}
              defaultValue={data?.project?.title}
              {...form.getInputProps("projectId")}
            />
            <Select
              size="md"
              radius="md"
              label="Select Issue type"
              placeholder="Issue Type"
              data={taskTypes?.data.map((type) => ({
                value: type?.id.toString(),
                label: type?.type,
              }))}
              {...form.getInputProps("typeId")}
            />
            <Select
              size="md"
              radius="md"
              label="Select Issue Status"
              placeholder="Issue Status"
              data={taskStatus?.data.map((type) => ({
                value: type?.id.toString(),
                label: type?.status,
              }))}
              {...form.getInputProps("statusId")}
            />
            <TextInput
              size="md"
              radius="md"
              label="Title"
              placeholder="Enter Title"
              {...form.getInputProps("title")}
            />
            <Textarea
              size="md"
              radius="md"
              label="Description"
              placeholder="Enter Description"
              autosize
              minRows={1}
              maxRows={3}
              {...form.getInputProps("description")}
            />
            <MultiSelect
              size="md"
              radius="md"
              label="Select Issue Assignee(s)"
              placeholder="Users"
              data={users?.data.map((user) => ({
                value: user.id.toString(),
                label: `${user.firstName} ${user.lastName}`,
              }))}
              {...form.getInputProps("taskAssigneeId")}
              searchable
              nothingFoundMessage="No result found..."
              hidePickedOptions
            />
            <div>
              <Modal
                opened={isImgModalOpen}
                onClose={() => setIsImgModalOpen(!isImgModalOpen)}
                centered
                size="auto"
                transitionProps={{
                  transition: "fade",
                  duration: 200,
                  timingFunction: "linear",
                }}
              >
                <div className="border border-solid bg-gray-400 text-white">
                  <Modal
                    opened={isDeleteImgModalOpen}
                    onClose={() =>
                      setIsDeleteImgModalOpen(!isDeleteImgModalOpen)
                    }
                    centered
                    withCloseButton={false}
                    transitionProps={{
                      transition: "fade",
                      duration: 200,
                      timingFunction: "linear",
                    }}
                  >
                    <div className="bg-gray-400 p-5 text-center">
                      <p className="text-lg">
                        Are you sure! you want to delete this image?
                      </p>
                      <div className="flex justify-center items-center gap-3">
                        <CustomButton
                          type="button"
                          onClick={() => {
                            setIsDeleteImgModalOpen(!isDeleteImgModalOpen);
                          }}
                          title="No"
                          bgColor="bg-white"
                          textColor="text-black"
                        />
                        <CustomButton
                          type="button"
                          onClick={() => {
                            onClickDeletImage(modalImageUrl);
                            setIsDeleteImgModalOpen(!isDeleteImgModalOpen);
                            setIsImgModalOpen(!isImgModalOpen);
                          }}
                          title="Yes"
                          bgColor="bg-tertiary"
                          textColor="text-white/90"
                        />
                      </div>
                    </div>
                  </Modal>
                  <div className="w-full flex justify-between pt-4 px-5">
                    <p>{modalImageUrl}</p>
                    <CustomButton
                      type="button"
                      onClick={() => {
                        setIsDeleteImgModalOpen(!isDeleteImgModalOpen);
                      }}
                      title="Delete Image"
                      bgColor="bg-tertiary"
                      textColor="text-white/90"
                    />
                  </div>
                  <img
                    src={`${BASE_URL}task/${modalImageUrl}`}
                    alt="task-image"
                    className="border-gray-200 max-w-full max-h-max shadow-lg"
                  />
                </div>
              </Modal>
              {data?.taskImages?.length > 0 && (
                <>
                  <p>Existing image(s)</p>
                  <div className="border border-solid border-gray-300 flex flex-wrap px-3 py-2 gap-3">
                    {data?.taskImages?.map((image) => (
                      <div
                        className="w-[110px] h-[80px] flex items-center justify-center"
                        key={image.image}
                      >
                        <img
                          src={`${BASE_URL}task/${image.image}`}
                          alt="task-image"
                          className="w-[100px] h-[60px] mx-auto  hover:cursor-pointer"
                          onClick={() => {
                            setIsImgModalOpen(!isImgModalOpen);
                            setModalImageUrl(image.image);
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
            <FileInput
              multiple
              size="md"
              radius="md"
              value={files}
              onChange={setFiles}
              clearable
              accept="image/png,image/jpeg"
              label="File input"
              placeholder="Select file(s) to be uploaded"
              valueComponent={ImagePill}
            />
            <CustomButton
              width="w-full"
              type="submit"
              onClick={() => setIsModalOpen(!isModalOpen)}
              title="Update Issue"
              bgColor="bg-primary"
              textColor="text-white"
            />
          </form>
        }
      </CustomModal>
      <UpdateButton onClick={() => setIsModalOpen(!isModalOpen)} />
    </section>
  );
}
