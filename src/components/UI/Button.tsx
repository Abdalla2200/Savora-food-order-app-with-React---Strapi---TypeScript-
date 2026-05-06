import type { ComponentProps, ReactNode } from "react";

type ButtonProps = {
  className?: string | null;
  size?: "sm" | "default" | "lg";
  children: ReactNode;
} & ComponentProps<"button">;

export const Button = ({
  className = "",
  size = "default",
  children,
  ...props
}: ButtonProps) => {
  const baseClasses =
    "relative overflow-hidden rounded-full font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-accent bg-accent text-white hover:bg-accent/90 shadow-lg shadow-accent/25";

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    default: "px-5 sm:px-6 py-2 sm:py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };
  const classes = `${baseClasses} ${sizeClasses[size]} ${className}`;
  return (
    <button className={classes} {...props}>
      <span className="relative flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
};
