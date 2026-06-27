import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "accent" | "flat";
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
  id?: string;
  onClick?: () => void;
}

const paddingClasses = {
  none: "",
  sm:   "p-4",
  md:   "p-6",
  lg:   "p-8",
};

export function Card({
  children,
  className = "",
  variant = "default",
  hover = true,
  padding = "md",
  id,
  onClick,
}: CardProps) {
  const baseClass =
    variant === "accent"
      ? "card-accent"
      : variant === "flat"
      ? "bg-white rounded-xl border border-gray-100"
      : "card";

  const hoverStyle = hover && variant === "default" ? "" : "[&.card]:hover:transform-none [&.card]:hover:shadow-none";

  return (
    <div
      id={id}
      className={`${baseClass} ${paddingClasses[padding]} ${className} ${onClick ? "cursor-pointer" : ""}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

/** Card sub-components */
export function CardHeader({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`mb-4 ${className}`}>{children}</div>;
}

export function CardBody({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`flex-1 ${className}`}>{children}</div>;
}

export function CardFooter({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mt-4 pt-4 border-t border-gray-100 ${className}`}>
      {children}
    </div>
  );
}

export default Card;
