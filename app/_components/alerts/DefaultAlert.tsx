import React from "react";

interface IDefaultAlert {
  message: string;
  variant?: "success" | "error";
}

const DefaultAlert = ({ message, variant = "success" }: IDefaultAlert) => {
  return (
    <div
      className={`rounded-md max-w-sm mx-auto w-full bg-${getVariant(
        variant
      )}-50 flex justify-center items-center py-3 `}
    >
      <span className={`text-sm text-${getVariant(variant)}-600 font-medium`}>
        {message}
      </span>
    </div>
  );
};

function getVariant(variant: string) {
  let color;
  switch (variant) {
    case "success":
      color = "emerald";
      break;
    case "error":
      color = "red";
      break;

    default:
      break;
  }

  return color;
}

export default DefaultAlert;
