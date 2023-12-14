function Button({
  type,
  title,
  onClick,
  bgColor,
  textColor,
  width,
}: {
  type: "button" | "submit";
  title: string;
  onClick?: () => void;
  bgColor: string;
  textColor: string;
  width?: string;
}) {
  return (
    <button
      type={type}
      className={`border-none rounded-md px-4 py-2 ${bgColor} ${textColor} ${
        width && width
      } font-semibold shadow-sm cursor-pointer active:scale-95`}
      onClick={onClick}
    >
      {title}
    </button>
  );
}

export default Button;
