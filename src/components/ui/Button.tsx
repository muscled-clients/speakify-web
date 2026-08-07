import { type ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
  size?: "default" | "lg";
  className?: string;
}

export function Button({
  children,
  href = "#",
  variant = "primary",
  size = "default",
  className = "",
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-200 cursor-pointer";
  const variants = {
    primary:
      "bg-blue-500 text-white hover:bg-blue-400 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40",
    secondary:
      "bg-zinc-800 text-zinc-100 border border-zinc-700 hover:bg-zinc-700 hover:border-zinc-600",
  };
  const sizes = {
    default: "px-5 py-2.5 text-sm",
    lg: "px-7 py-3.5 text-base",
  };

  return (
    <a href={href} className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </a>
  );
}
