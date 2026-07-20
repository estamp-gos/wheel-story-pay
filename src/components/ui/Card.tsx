import { type ReactNode } from "react";

export function Card({
  children,
  className = "",
  hover = false,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border border-border bg-surface p-6 shadow-sm transition-all duration-200 ${
        hover
          ? "hover:-translate-y-1 hover:shadow-md cursor-default"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
