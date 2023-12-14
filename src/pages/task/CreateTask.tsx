import {
  FileInput,
  MultiSelect,
  Select,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useProjectStore } from "@src/app/projectStore";
import { useTaskStore, useTaskTypeStore } from "@src/app/taskStore";
import { useUserStore } from "@src/app/userStore";
import { CustomButton, CustomModal, ImagePill } from "@src/components";
import { CreateTaskInput, createTaskFormInput } from "@src/models";
import apiProvider from "@src/network/ApiProvider";
import { TaskTypes } from "@src/utils/enums";
import { zodResolver } from "mantine-form-zod-resolver";
import { useEffect, useState } from "react";

function CreateTask() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { fetchData: fetchTaskTypes, data: taskTypes } = useTaskTypeStore();
  const { fetchData: fetchProjects, data: projects } = useProjectStore();
  const { fetchData: fetchTaskAssignees, data: users } = useUserStore();
  const { fetchData } = useTaskStore();
  const [files, setFiles] = useState<File[] | undefined>();

  const form = useForm<CreateTaskInput>({
    initialValues: {
      title: "",
      description: "",
      projectId: "0",
      typeId: TaskTypes.Task || TaskTypes.Bug,
      taskAssigneeId: [],
    },
    validate: zodResolver(createTaskFormInput),
  });

  function resetForm() {
    setIsModalOpen(!isModalOpen);
    form.reset();
    setFiles(undefined);
  }

  const onSubmit = async (values: typeof form.values) => {
    const data = new FormData();

    data.append("projectId", values.projectId);
    data.append("typeId", values.typeId);
    data.append("title", values.title);
    data.append("description", values.description);
    values?.taskAssigneeId.forEach((item, index) => {
      data.append(`taskAssigneeId[${index}]`, String(item));
    });

    if (files) {
      files?.map((file: File) => {
        data.append("file", file);
      });
    }

    const isRequestSuccess = await apiProvider.createTask(data);

    if (isRequestSuccess) {
      resetForm();
      fetchData();
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      fetchProjects();
      fetchTaskTypes();
      fetchTaskAssignees();
    }
  }, [isModalOpen]);

  return (
    <section>
      <CustomModal
        title="Create Task"
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
              withAsterisk
              {...form.getInputProps("projectId")}
            />
            <Select
              size="md"
              radius="md"
              label="Select Task type"
              placeholder="Task Type"
              data={taskTypes?.data.map((type) => ({
                value: type?.id.toString(),
                label: type?.type,
              }))}
              withAsterisk
              {...form.getInputProps("typeId")}
            />
            <TextInput
              size="md"
              radius="md"
              label="Title"
              placeholder="Enter Title"
              withAsterisk
              {...form.getInputProps("title")}
            />
            <Textarea
              size="md"
              radius="md"
              label="Description"
              placeholder="Enter Description"
              withAsterisk
              autosize
              minRows={1}
              maxRows={3}
              {...form.getInputProps("description")}
            />

            <MultiSelect
              size="md"
              radius="md"
              label="Select Task Assignee(s)"
              placeholder="Users"
              data={users?.data.map((user) => ({
                value: user.id.toString(),
                label: `${user.firstName} ${user.lastName}`,
              }))}
              withAsterisk
              {...form.getInputProps("taskAssigneeId")}
              searchable
              nothingFoundMessage="No result found..."
              hidePickedOptions
            />

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
              onClick={() => setIsModalOpen(true)}
              title="Create Task"
              bgColor="bg-green-700"
              textColor="text-white"
            />
          </form>
        }
      </CustomModal>
      <CustomButton
        type="button"
        onClick={() => setIsModalOpen(true)}
        title="Create Task"
        bgColor="bg-green-700"
        textColor="text-white"
      />
    </section>
  );
}

export default CreateTask;
