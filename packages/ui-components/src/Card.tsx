import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export function Card({ children, className = "", onClick, hoverable = false }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={[
        "bg-white rounded-xl border border-gray-200 shadow-sm",
        hoverable ? "hover:shadow-md hover:border-gray-300 transition-all duration-150 cursor-pointer" : "",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function CardHeader({ children, className = "" }: CardHeaderProps) {
  return (
    <div className={["px-5 py-4 border-b border-gray-100", className].join(" ")}>
      {children}
    </div>
  );
}

export function CardBody({ children, className = "" }: CardHeaderProps) {
  return (
    <div className={["px-5 py-4", className].join(" ")}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className = "" }: CardHeaderProps) {
  return (
    <div className={["px-5 py-3 border-t border-gray-100 bg-gray-50 rounded-b-xl", className].join(" ")}>
      {children}
    </div>
  );
}
