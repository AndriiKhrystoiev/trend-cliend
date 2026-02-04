"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, X } from "lucide-react";
import { cn } from "@/lib/utils";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSubmit?: (data: LoginFormData) => Promise<void>;
  onClose?: () => void;
  showCloseButton?: boolean;
  variant?: "desktop" | "tablet" | "mobile";
}

function LoadingSpinner() {
  return (
    <div className="relative size-12">
      {/* Gray track */}
      <svg
        className="size-12"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="24"
          cy="24"
          r="20"
          stroke="#E5E7EB"
          strokeWidth="4"
          fill="none"
        />
      </svg>
      {/* Blue animated arc */}
      <svg
        className="absolute inset-0 size-12 animate-spin"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="24"
          cy="24"
          r="20"
          stroke="#2335a8"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          strokeDasharray="31.4 94.2"
        />
      </svg>
    </div>
  );
}

export function LoginForm({
  onSubmit,
  onClose,
  showCloseButton = false,
  variant = "desktop"
}: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const usernameValue = watch("username");
  const passwordValue = watch("password");

  const handleFormSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      await onSubmit?.(data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={cn(
        "relative w-full bg-white shadow-[0px_32px_168.9px_0px_rgba(163,198,243,0.28)]",
        variant === "desktop" && "p-12",
        variant === "tablet" && "p-8 rounded-lg",
        variant === "mobile" && "p-6 rounded-t-lg"
      )}
    >
      <div className="flex flex-col gap-5">
        {/* Loading Spinner - Above Header */}
        {isLoading && (
          <div className="flex justify-start">
            <LoadingSpinner />
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col gap-2 text-[#242a37]">
          <div className="flex items-center justify-between">
            <h1 className="text-[28px] font-semibold leading-[1.3]">
              Welcome!
            </h1>
            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                className="flex size-8 items-center justify-center rounded text-[#9ca3b4] hover:bg-gray-100 hover:text-[#373e4f]"
              >
                <X className="size-5" />
              </button>
            )}
          </div>
          <p
            className={cn(
              "font-normal leading-[1.4]",
              variant === "desktop" ? "text-base leading-[1.5]" : "text-sm"
            )}
          >
            Please log in to your account to get started.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-5">
          <div className="flex flex-col gap-4">
            {/* Username Field */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium leading-[1.12] text-[#242a37]">
                Username
              </label>
              <div
                className={cn(
                  "flex h-11 items-center gap-2 rounded border bg-white px-3",
                  errors.username
                    ? "border-red-500"
                    : "border-[#ced4e0] focus-within:border-[#5463c9] focus-within:shadow-[0px_0px_0px_3px_#c3c7ec]"
                )}
              >
                <input
                  {...register("username")}
                  type="text"
                  placeholder="Enter username"
                  disabled={isLoading}
                  className="flex-1 bg-transparent text-sm font-normal text-[#373e4f] placeholder:text-[#9ca3b4] outline-none disabled:cursor-not-allowed disabled:opacity-50"
                />
                {usernameValue && !isLoading && (
                  <button
                    type="button"
                    onClick={() => setValue("username", "")}
                    className="text-[#9ca3b4] hover:text-[#373e4f]"
                  >
                    <X className="size-5" />
                  </button>
                )}
              </div>
              {errors.username && (
                <p className="text-xs text-red-500">{errors.username.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium leading-[1.12] text-[#242a37]">
                Password
              </label>
              <div
                className={cn(
                  "flex h-11 items-center gap-2 rounded border bg-white px-3",
                  errors.password
                    ? "border-red-500"
                    : "border-[#ced4e0] focus-within:border-[#5463c9] focus-within:shadow-[0px_0px_0px_3px_#c3c7ec]"
                )}
              >
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  disabled={isLoading}
                  className="flex-1 bg-transparent text-sm font-normal text-[#373e4f] placeholder:text-[#9ca3b4] outline-none disabled:cursor-not-allowed disabled:opacity-50"
                />
                {passwordValue && !isLoading && (
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-[#9ca3b4] hover:text-[#373e4f]"
                  >
                    {showPassword ? (
                      <EyeOff className="size-5" />
                    ) : (
                      <Eye className="size-5" />
                    )}
                  </button>
                )}
              </div>
              {errors.password && (
                <p className="text-xs text-red-500">{errors.password.message}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={cn(
              "h-12 w-full rounded bg-[#2335a8] text-base font-medium text-white transition-colors",
              "hover:bg-[#1a2a8a] focus:outline-none focus:ring-2 focus:ring-[#5463c9] focus:ring-offset-2",
              "disabled:cursor-not-allowed disabled:opacity-70"
            )}
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}
