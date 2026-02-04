"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

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

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const usernameValue = form.watch("username");
  const passwordValue = form.watch("password");

  const handleFormSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      await onSubmit?.(data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card
      className={cn(
        "w-full border-0 shadow-[0px_32px_168.9px_0px_rgba(163,198,243,0.28)]",
        variant === "desktop" && "rounded-none",
        variant === "tablet" && "rounded-lg",
        variant === "mobile" && "rounded-t-lg rounded-b-none"
      )}
    >
      <CardContent
        className={cn(
          variant === "desktop" && "p-12",
          variant === "tablet" && "p-8",
          variant === "mobile" && "p-6"
        )}
      >
        <div className="flex flex-col gap-5">
          {/* Loading Spinner */}
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
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="size-8 text-[#9ca3b4] hover:text-[#373e4f]"
                >
                  <X className="size-5" />
                </Button>
              )}
            </div>
            <p
              className={cn(
                "font-normal leading-[1.4] text-[#242a37]",
                variant === "desktop" ? "text-base leading-[1.5]" : "text-sm"
              )}
            >
              Please log in to your account to get started.
            </p>
          </div>

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFormSubmit)} className="flex flex-col gap-5">
              <div className="flex flex-col gap-4">
                {/* Username Field */}
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-[#242a37]">
                        Username
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            type="text"
                            placeholder="Enter username"
                            disabled={isLoading}
                            className={cn(
                              "h-11 border-[#ced4e0] bg-white pr-10 text-sm text-[#373e4f] placeholder:text-[#9ca3b4]",
                              "focus:border-[#5463c9] focus:ring-[3px] focus:ring-[#c3c7ec]",
                              form.formState.errors.username && "border-red-500"
                            )}
                          />
                          {usernameValue && !isLoading && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => form.setValue("username", "")}
                              className="absolute right-1 top-1/2 -translate-y-1/2 size-8 text-[#9ca3b4] hover:text-[#373e4f]"
                            >
                              <X className="size-5" />
                            </Button>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                {/* Password Field */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-[#242a37]">
                        Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter password"
                            disabled={isLoading}
                            className={cn(
                              "h-11 border-[#ced4e0] bg-white pr-10 text-sm text-[#373e4f] placeholder:text-[#9ca3b4]",
                              "focus:border-[#5463c9] focus:ring-[3px] focus:ring-[#c3c7ec]",
                              form.formState.errors.password && "border-red-500"
                            )}
                          />
                          {passwordValue && !isLoading && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-1 top-1/2 -translate-y-1/2 size-8 text-[#9ca3b4] hover:text-[#373e4f]"
                            >
                              {showPassword ? (
                                <EyeOff className="size-5" />
                              ) : (
                                <Eye className="size-5" />
                              )}
                            </Button>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="h-12 w-full bg-[#2335a8] text-base font-medium hover:bg-[#1a2a8a] focus:ring-2 focus:ring-[#5463c9] focus:ring-offset-2"
              >
                Log in
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
}
