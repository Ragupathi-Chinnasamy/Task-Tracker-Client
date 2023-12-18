import { TextInput, PasswordInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { CustomButton, Footer } from "@src/components";
import { AuthContext } from "@src/context/AuthContext";
import apiProvider from "@src/network/ApiProvider";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "mantine-form-zod-resolver";
import { loginScema } from "@src/models/auth";

const Login = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: zodResolver(loginScema),
  });

  async function onSubmit(val: typeof form.values) {
    const response = await apiProvider.login({
      email: val.email,
      password: val.password,
    });

    if (response?.status) {
      const data = response?.data;
      authContext?.login(data);
      navigate("/dashboard");
    }
  }

  return (
    <main className="min-h-screen w-full flex flex-col relative justify-center login-pattern">
      <section className="flex justify-center items-center w-full text-gray-600 ">
        <div className="bg-gray-100/90 px-16 py-12 rounded-lg shadow-md w-3/12">
          <div className="text-3xl font-extrabold tracking-wide leading-10 bg-gradient-to-tl from-teal-700 to-purple-800 text-transparent bg-clip-text text-center">
            Todo-Tracker
          </div>
          <form className="w-full space-y-2" onSubmit={form.onSubmit(onSubmit)}>
            <TextInput
              size="md"
              radius="md"
              label="Email"
              placeholder="Enter Email"
              withAsterisk
              {...form.getInputProps("email")}
            />
            <PasswordInput
              size="md"
              radius="md"
              label="Password"
              withAsterisk
              placeholder="Enter Password"
              {...form.getInputProps("password")}
              className="pb-5"
            />
            <CustomButton
              width="w-full"
              type="submit"
              title="Login"
              bgColor="bg-primary"
              textColor="text-white"
            />
          </form>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Login;
