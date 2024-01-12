"use client";
import { Input } from "../input";
import { BaseInput } from "./BaseInput";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";

type PasswordInputProps = {
  className?: string;
  placeholder?: string;
  label?: string;
  type?: "text" | "email" | "password" | "number";
  id?: string;
};

export function PasswordInput({
  label,
  placeholder,
  type,
  id,
  className,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <div className="w-full flex flex-col gap-y-2">
      {label && (
        <label htmlFor={id} className=" font-medium text-sm">
          {label}
        </label>
      )}

      <div className="bg-border pr-4 border-none flex-center gap-x-4 rounded-md ${className}">
        <BaseInput
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          className="bg-none !p-0 flex-1"
        />
        <button type="button" className="!p-0" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <FiEyeOff /> : <FiEye />}
        </button>
      </div>
    </div>
  );
}
