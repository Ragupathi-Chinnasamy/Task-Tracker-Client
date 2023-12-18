import { TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useProjectStore } from "@src/app/projectStore";
import { CustomButton, CustomModal } from "@src/components";
import { projectFormInput } from "@src/models";
import apiProvider from "@src/network/ApiProvider";
import { zodResolver } from "mantine-form-zod-resolver";
import { useState } from "react";

export default function CreateProject() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { fetchData } = useProjectStore();

  const form = useForm({
    initialValues: {
      title: "",
      description: "",
    },
    validate: zodResolver(projectFormInput),
  });

  function resetForm() {
    setIsModalOpen(!isModalOpen);
    form.reset();
  }

  async function onSubmit(values: typeof form.values) {
    const isRequestSuccess = await apiProvider.createProject(values);
    if (isRequestSuccess) {
      resetForm();
      fetchData();
    }
  }

  return (
    <section>
      <CustomModal
        title="Create Project"
        isModalOpen={isModalOpen}
        onClose={resetForm}
        modalSize="lg"
      >
        {
          <form
            onSubmit={form.onSubmit(onSubmit)}
            className="space-y-4 text-gray-600 pb-5 px-5"
          >
            <TextInput
              size="md"
              radius="md"
              label="Title"
              placeholder="Enter Title"
              withAsterisk
              {...form.getInputProps("title")}
            />
            <TextInput
              size="md"
              radius="md"
              label="Description"
              placeholder="Enter Description"
              withAsterisk
              {...form.getInputProps("description")}
            />
            <div className="w-full">
              <CustomButton
                width="w-full"
                type="submit"
                title="Create Project"
                bgColor="bg-primary"
                textColor="text-white"
              />
            </div>
          </form>
        }
      </CustomModal>
      <CustomButton
        type="button"
        onClick={() => setIsModalOpen(!isModalOpen)}
        title="Create Project"
        bgColor="bg-primary"
        textColor="text-white"
      />
    </section>
  );
}
