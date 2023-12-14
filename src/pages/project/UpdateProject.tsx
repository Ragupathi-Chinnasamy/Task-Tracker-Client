import { TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useProjectStore } from "@src/app/projectStore";
import { CustomButton, CustomModal } from "@src/components";
import { ProjectRes, projectFormInput } from "@src/models";
import apiProvider from "@src/network/ApiProvider";
import { zodResolver } from "mantine-form-zod-resolver";
import { useEffect, useState } from "react";

function UpdateProject({ data }: { data: ProjectRes }) {
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

  async function onSubmit(value: typeof form.values) {
    const isRequestSuccess = await apiProvider.updateProject({
      ...value,
      projectId: data.id,
    });

    if (isRequestSuccess) {
      resetForm();
      fetchData();
    }
  }

  useEffect(() => {
    function setFormData() {
      form.setValues({
        title: data.title,
        description: data.description,
      });
    }
    if (isModalOpen) {
      setFormData();
    }
  }, [isModalOpen]);

  return (
    <section>
      <CustomModal
        title="Update Project"
        isModalOpen={isModalOpen}
        onClose={resetForm}
        modalSize="lg"
      >
        {
          <form
            className="space-y-4 px-4 pb-3"
            onSubmit={form.onSubmit(onSubmit)}
          >
            <TextInput
              size="md"
              radius="md"
              label="Title"
              styles={{
                label: { color: "#4b5563" },
              }}
              placeholder="Enter Title"
              withAsterisk
              {...form.getInputProps("title")}
            />
            <TextInput
              size="md"
              radius="md"
              label="Title"
              styles={{
                label: { color: "#4b5563" },
              }}
              placeholder="Enter Title"
              withAsterisk
              {...form.getInputProps("description")}
            />
            <div className="w-full">
              <CustomButton
                width="w-full"
                type="submit"
                title="Update Project"
                bgColor="bg-blue-400/70"
                textColor="text-black"
              />
            </div>
          </form>
        }
      </CustomModal>
      <CustomButton
        type="button"
        onClick={() => setIsModalOpen(!isModalOpen)}
        title="Update"
        bgColor="bg-blue-300/70"
        textColor="text-black"
      />
    </section>
  );
}

export default UpdateProject;
