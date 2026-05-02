import React from "react";

type BadgeColor = "gray" | "blue" | "green" | "yellow" | "red" | "purple" | "indigo";

interface BadgeProps {
  children: React.ReactNode;
  color?: BadgeColor;
  className?: string;
}

const colorStyles: Record<BadgeColor, string> = {
  gray:   "bg-gray-100 text-gray-700",
  blue:   "bg-blue-100 text-blue-700",
  green:  "bg-green-100 text-green-700",
  yellow: "bg-yellow-100 text-yellow-800",
  red:    "bg-red-100 text-red-700",
  purple: "bg-purple-100 text-purple-700",
  indigo: "bg-indigo-100 text-indigo-700",
};

export function Badge({ children, color = "gray", className = "" }: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        colorStyles[color],
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
}
