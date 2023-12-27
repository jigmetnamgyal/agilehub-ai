"use client";

import { LucideIcon } from "lucide-react";

interface ItemProps {
  label: string;
  onClick: () => void;
  icon: LucideIcon;
}

const CreateProject = ({ label, onClick, icon: Icon }: ItemProps) => {
  return (
    <div
      onClick={onClick}
      role="button"
      style={{ paddingLeft: "12px" }}
      className="group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-secondary-content/5 flex items-center font-medium"
    >
      <Icon className="shrink-0 h-[18px] mr-2 text-gray-300" />
      <span className="truncate text-gray-300">{label}</span>
    </div>
  );
};

export default CreateProject;
