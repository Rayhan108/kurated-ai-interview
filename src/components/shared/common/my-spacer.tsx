import React from "react";

interface IMySpacer extends Omit<React.HTMLProps<HTMLDivElement>, "classID"> {}

export default function MySpacer({ className }: IMySpacer) {
  return <div className={`${className || "h-4"}`} />;
}
