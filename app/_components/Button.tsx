import React from "react";

interface IButton {
  children: React.ReactNode;
  variant?: variantTypes;
  onClick?: () => void;
  type?: "submit" | "button";
  disabled?: boolean;
}
type variantTypes = "primary" | "outline-primary" | "outline";

const Button = (props: IButton) => {
  return (
    <button
      disabled={props.disabled || false}
      onClick={props.onClick}
      type={props.type}
      className={`text-sm py-2.5 border disabled:bg-gray-200 disabled:border-gray-200 disabled:cursor-not-allowed font-semibold text-center w-full rounded-sm ${getVariant(
        props.variant || "primary"
      )}`}
    >
      {props.children}
    </button>
  );
};

function getVariant(variant: variantTypes) {
  let color;
  switch (variant) {
    case "primary":
      color = "bg-[var(--primary)] border-[var(--primary)] text-white disabled";
      break;
    case "outline":
      color = "border-gray-200 text-gray-500";
      break;
    case "outline-primary":
      color = "border-[var(--primary)] text-[var(--primary)]";
      break;

    default:
      break;
  }

  return color;
}

export default Button;
