import React from "react";
import { IconType } from "react-icons";
import { FaCheck } from "react-icons/fa";

interface IAlert {
  subtitle: string;
  title: string;
  message?: string;
  Icon?: IconType;
  onSubmit: () => void;
  showCancelButton?: boolean;
  theme?: themeTypes;
  submitText?: string;
  cancelText?: string;
  onClose: () => void;
}

export type themeTypes = "primary" | "success" | "error" | "warning";

const Alert = ({
  subtitle,
  title,
  Icon = FaCheck,
  onSubmit,
  message,
  showCancelButton = true,
  theme = "primary",
  submitText = "OK",
  cancelText = "Batalkan",
  onClose,
}: IAlert) => {
  const color = getThemeAlert(theme);
  return (
    <div
      onClick={onClose}
      className="fixed w-screen left-0 top-0 z-[9999] h-screen bg-black/20 flex justify-center items-center"
    >
      <div className="bg-white rounded-md p-6 min-w-[320px] z-[99990] flex flex-col justify-center items-center gap-3 text-center">
        {/* logo */}
        <div
          className={`${color.backgroundColor} mt-2 w-14 h-14 rounded-full flex justify-center items-center text-white`}
        >
          <Icon size={32} />
        </div>
        <div className="pb-2">
          <span className="text-sm text-gray-400">{subtitle}</span>
          <h5 className="font-semibold text-xl">{title}</h5>
          {}
          <span className="text-sm text-gray-400">{message}</span>
        </div>
        <div className="space-y-1 w-full">
          <button
            onClick={onSubmit}
            className={`py-2 text-sm cursor-pointer hover:bg-gray-50 w-full rounded text-center font-semibold text-[var(--primary)]`}
          >
            {submitText}
          </button>
          {showCancelButton && (
            <button className="py-2 text-sm cursor-pointer text-center font-semibold text-gray-300">
              {cancelText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

function getThemeAlert(theme: themeTypes) {
  let result;
  switch (theme) {
    case "error":
      result = {
        backgroundColor: "bg-red-500",
        textColor: "text-red-500",
      };
      break;
    case "success":
      result = {
        backgroundColor: "bg-emerald-500",
        textColor: "text-emerald-500",
      };
      break;
    case "warning":
      result = {
        backgroundColor: "bg-warning-500",
        textColor: "text-warning-500",
      };
      break;

    default:
      result = {
        backgroundColor: "bg-[var(--primary)]",
        textColor: "text-[var(--primary)]",
      };
      break;
  }

  return result;
}

export default Alert;
