import { PasswordInput, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRoleStore } from "@src/app/roleStore";
import { useUserStore } from "@src/app/userStore";
import { CustomButton, CustomModal } from "@src/components";
import { CreateUserInput, createUserFormInput } from "@src/models/user-model";
import apiProvider from "@src/network/ApiProvider";
import { Role } from "@src/utils/enums";
import { zodResolver } from "mantine-form-zod-resolver";
import { useEffect, useState } from "react";

export default function CreateUser() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: roles, fetchData } = useRoleStore();
  const { fetchData: fetchUserData } = useUserStore();

  const form = useForm<CreateUserInput>({
    validateInputOnChange: true,
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      password: "",
      roleId: Role.User || Role.Admin,
    },
    validate: zodResolver(createUserFormInput),
  });

  function resetForm() {
    setIsModalOpen(!isModalOpen);
    form.reset();
  }

  async function onSubmit(values: typeof form.values) {
    const isRequestSuccess = await apiProvider.createUser(values);
    if (isRequestSuccess) {
      resetForm();
      fetchUserData();
    }
  }

  useEffect(() => {
    if (isModalOpen) {
      fetchData();
    }
  }, [isModalOpen]);

  // useEffect(() => {
  //   fetchUserData();
  // }, [fetchUserData]);

  return (
    <section>
      <CustomModal
        title="Create User"
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
              label="Select Role"
              placeholder="Roles"
              data={roles?.data.map((role) => ({
                value: String(role.id),
                label: role.role,
              }))}
              defaultValue="User"
              size="md"
              radius="md"
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
            <PasswordInput
              size="md"
              radius="md"
              label="Password"
              withAsterisk
              placeholder="Enter Password"
              {...form.getInputProps("password")}
            />
            <div className="w-full">
              <CustomButton
                width="w-full"
                type="submit"
                title="Create User"
                bgColor="bg-primary"
                textColor="text-white/90"
              />
            </div>
          </form>
        }
      </CustomModal>
      <CustomButton
        type="button"
        onClick={() => setIsModalOpen(!isModalOpen)}
        title="Create User"
        bgColor="bg-primary"
        textColor="text-white/95"
      />
    </section>
  );
}
