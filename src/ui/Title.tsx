import React from "react";

interface TitleProps {
  level: "h2" | "h3";
  text: string;
  className?: string;
}

const Title: React.FC<TitleProps> = ({ level, text, className }) => {
  const Component = level === "h2" ? "h2" : "h3";

  return <Component className={className}>{text}</Component>;
};

export default Title;