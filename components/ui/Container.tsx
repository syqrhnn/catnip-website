import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  narrow?: boolean; // max-w-4xl for content pages
  id?: string;
}

/**
 * Container — responsive max-width wrapper
 * Uses the .container-catnip CSS class from globals.css
 * Max-width: 1200px with responsive padding
 */
export function Container({
  children,
  className = "",
  as: Tag = "div",
  narrow = false,
  id,
}: ContainerProps) {
  return (
    <Tag
      id={id}
      className={`container-catnip ${narrow ? "max-w-4xl" : ""} ${className}`}
    >
      {children}
    </Tag>
  );
}

/**
 * Section — full-width section wrapper with vertical padding
 */
interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  background?: "cream" | "white" | "accent" | "charcoal" | "none";
  as?: React.ElementType;
}

const backgroundClasses = {
  cream:   "bg-[#FFFDD0]",
  white:   "bg-white",
  accent:  "bg-[#F8D7DA]",
  charcoal:"bg-[#333333] text-white",
  none:    "",
};

export function Section({
  children,
  className = "",
  id,
  background = "none",
  as: Tag = "section",
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={`section-py ${backgroundClasses[background]} ${className}`}
    >
      {children}
    </Tag>
  );
}

export default Container;
