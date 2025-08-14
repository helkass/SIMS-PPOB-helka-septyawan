"use client";
import React, { useState } from "react";
import { IconType } from "react-icons";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

interface IInputField {
  isError?: boolean;
  placeholder: string;
  Icon: IconType;
  type: "text" | "password" | "number" | "email";
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  id: string;
  required?: boolean;
  className?: string;
  errorMessage?: string;
  readonly?: boolean;
  value?: string;
  defaultValue?: string;
  label?: string;
}

const InputField = (props: IInputField) => {
  const [showInputValue, setShowInputValue] = useState<boolean>(false);
  const [value, setValue] = useState<string | number>(
    props.value || props.defaultValue || ""
  );

  function setColorIcon() {
    if (props.isError) return "text-red-500";
    if (value.toString().length > 0) return "text-black";
    return "text-gray-400";
  }

  return (
    <div className="flex flex-col gap-1">
      {props.label && (
        <label className="text-sm capitalize">{props.label}</label>
      )}
      <div
        className={`flex justify-between items-center py-1 px-2 rounded-sm border ${
          props.isError ? "border-red-500" : "border-gray-100"
        } w-full`}
      >
        <div className={`flex items-center w-full gap-2 ${props.className}`}>
          <props.Icon size={14} className={setColorIcon()} />
          <input
            type={props.type || "text"}
            onChange={(e) => {
              setValue(e.target.value);
              props.onChange?.(e);
            }}
            readOnly={props.readonly || false}
            name={props.name}
            id={props.id}
            value={props.value}
            defaultValue={props.defaultValue}
            className={`w-full p-1 focus:outline-0 text-sm focus-visible:border-none placeholder:text-xs placeholder:text-gray-400 dark:placeholder:text-gray-200`}
            placeholder={props.placeholder || "masukan data"}
            required={props.required || false}
          />
        </div>
        {props.type === "password" && (
          <span
            onClick={() => setShowInputValue(!showInputValue)}
            className={"text-gray-400"}
          >
            {showInputValue ? (
              <IoEyeOffOutline size={14} />
            ) : (
              <IoEyeOutline size={14} />
            )}
          </span>
        )}
      </div>
      {props.errorMessage && (
        <span className="text-xs self-end text-end text-red-500">
          {props.errorMessage}
        </span>
      )}
    </div>
  );
};

export default InputField;
