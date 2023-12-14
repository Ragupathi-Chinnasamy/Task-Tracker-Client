import { TextInput, PasswordInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { CustomButton, Footer } from "@src/components";
import { AuthContext } from "@src/context/AuthContext";
import apiProvider from "@src/network/ApiProvider";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "mantine-form-zod-resolver";
import { loginScema } from "@src/models/auth";
import { IconLogin } from "@tabler/icons-react";

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
    <main className="min-h-screen w-full flex flex-col relative justify-center">
      <header className="flex justify-between px-24 py-4 bg-gray-100/90 top-0 fixed w-full">
        <div className="text-3xl font-extrabold tracking-wide leading-10 bg-gradient-to-tl from-teal-700 to-purple-800 text-transparent bg-clip-text">
          Todo-Tracker
        </div>
        <div>
          <button className="border-none px-4 py-2 bg-gray-700/50 text-white rounded-md cursor-pointer active:scale-95">
            Sign Up
          </button>
        </div>
      </header>
      <section className="flex justify-center items-center w-full text-gray-600">
        <div className="bg-gray-100/90 px-16 py-12 rounded-lg shadow-md w-3/12">
          <div className="flex items-center justify-center mb-3 space-x-1">
            <p className="text-xl font-montserrat font-extrabold p-0 m-0">
              Login
            </p>
            <IconLogin />
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
              bgColor="bg-green-700"
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
