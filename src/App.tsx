import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { Outlet } from "react-router-dom";
import { Notifications } from "@mantine/notifications";
import "@mantine/core/styles/global.css";
import "@mantine/notifications/styles.css";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <MantineProvider
      theme={{
        fontFamily: "Gabarito, sans-serif",
        headings: {
          fontFamily: "Gabarito, sans-serif",
        },
      }}
    >
      <Notifications zIndex={1000} />
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    </MantineProvider>
  );
}
