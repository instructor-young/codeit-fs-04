import clsx from "clsx";

function Button({
  children,
  size = "md",
  intent = "primary",
  className,
  disabled,
  ...props
}) {
  const defaultClassNames = clsx(
    "hover:brightness-90 active:brightness-75 transition"
  );

  const sizeClassNames = clsx({
    "px-3 py-1.5 text-[13px] font-medium rounded": size === "sm",
    "px-4 py-2 text-[15px] font-semibold rounded-md": size === "md",
    "px-5 py-2.5 text-[17px] font-bold rounded-lg": size === "lg",
  });

  const intentClassNames = clsx({
    "bg-red-500": intent === "primary",
    "bg-gray-300": intent === "secondary",
    "bg-white text-black": intent === "white",
    "bg-black": intent === "black",
  });

  const disabledClassNames = clsx({
    "brightness-50 cursor-not-allowed hover:brightness-50 active:brightness-50":
      disabled,
  });

  return (
    <button
      className={clsx(
        defaultClassNames,
        sizeClassNames,
        intentClassNames,
        disabledClassNames,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
