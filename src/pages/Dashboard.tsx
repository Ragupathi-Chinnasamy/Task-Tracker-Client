import { Skeleton } from "@mantine/core";
import { DashBoardCard } from "@src/components";
import { DashBoardStats } from "@src/models";
import apiProvider from "@src/network/ApiProvider";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState<DashBoardStats | null>(
    null
  );

  async function fetchDashBoardData() {
    const response = await apiProvider.fetchDashBoardData();
    if (response?.isSuccess) {
      setDashboardData(response.data);
    }
  }

  useEffect(() => {
    fetchDashBoardData();
  }, []);

  return (
    <section className="grid grid-cols-7 gap-10">
      {dashboardData ? (
        Object.entries(dashboardData!).map(([key, value]) => (
          <DashBoardCard count={value} title={key.toUpperCase()} key={key} />
        ))
      ) : (
        <Skeleton width={"50%"} height={8} radius="xl" />
      )}
    </section>
  );
}
