import { Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRoleStore } from "@src/app/roleStore";
import { useUserStore } from "@src/app/userStore";
import { CustomButton, CustomModal } from "@src/components";
import { UserRes, updateUserFormInput } from "@src/models/user-model";
import apiProvider from "@src/network/ApiProvider";
import { Role } from "@src/utils/enums";
import { zodResolver } from "mantine-form-zod-resolver";
import { useEffect, useState } from "react";

export default function UpdateUser({ data }: { data: UserRes }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: roles, fetchData } = useRoleStore();
  const { fetchData: fetchUserData } = useUserStore();

  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      roleId: Role.Admin || Role.User,
    },
    validate: zodResolver(updateUserFormInput),
  });

  function resetForm() {
    setIsModalOpen(!isModalOpen);
    form.reset();
  }

  async function onSubmit(values: typeof form.values) {
    const isRequestSuccess = await apiProvider.updateUser({
      ...values,
      userId: data.id,
    });

    if (isRequestSuccess) {
      resetForm();
      fetchUserData();
    }
  }

  function setFormData() {
    form.setValues({
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      mobile: data.mobile,
      roleId: String(data.roleId) as Role,
    });
  }

  useEffect(() => {
    if (isModalOpen) {
      fetchData();
      setFormData();
    }
  }, [isModalOpen]);

  return (
    <section>
      <CustomModal
        title="Update User"
        isModalOpen={isModalOpen}
        onClose={resetForm}
        modalSize="lg"
      >
        {
          <form
            onSubmit={form.onSubmit(onSubmit)}
            className="space-y-4 text-gray-600 pb-5 px-5 w-full"
          >
            <div className="flex space-x-2 justify-between">
              <TextInput
                size="md"
                radius="md"
                label="First Name"
                placeholder="Enter First Name"
                withAsterisk
                {...form.getInputProps("firstName")}
                className="w-2/4"
              />
              <TextInput
                size="md"
                radius="md"
                label="Last Name"
                placeholder="Enter Last Name"
                withAsterisk
                {...form.getInputProps("lastName")}
              />
            </div>
            <Select
              size="md"
              label="Select Role"
              placeholder="Roles"
              data={roles?.data.map((role) => ({
                value: role.id.toString(),
                label: role.role,
              }))}
              {...form.getInputProps("roleId")}
            />
            <TextInput
              size="md"
              radius="md"
              label="Email"
              placeholder="Enter email"
              withAsterisk
              {...form.getInputProps("email")}
            />
            <TextInput
              size="md"
              radius="md"
              label="Mobile Number"
              placeholder="Enter Mobile Number"
              withAsterisk
              {...form.getInputProps("mobile")}
            />
            <div className="w-full">
              <CustomButton
                width="w-full"
                type="submit"
                title="Update User"
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
