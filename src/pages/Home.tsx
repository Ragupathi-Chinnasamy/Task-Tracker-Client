import { Layout } from "@src/components";
import { Outlet } from "react-router-dom";

export default function HomePage() {
  return (
    <div>
      <Layout>
        <Outlet />
      </Layout>
    </div>
  );
}
