import { Loader as MantineLoader } from "@mantine/core";

function Loader() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <MantineLoader />
    </div>
  );
}

export default Loader;
