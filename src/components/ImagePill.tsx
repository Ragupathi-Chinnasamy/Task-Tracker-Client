import { FileInputProps, Pill } from "@mantine/core";

const ImagePill: FileInputProps["valueComponent"] = ({ value }) => {
  if (value === null) {
    return null;
  }
  if (Array.isArray(value)) {
    return (
      <Pill.Group>
        {value.map((file, index) => (
          <Pill key={index} className="bg-gray-300">
            {file.name}
          </Pill>
        ))}
      </Pill.Group>
    );
  }
  return <Pill>{value.name}</Pill>;
};

export default ImagePill;
