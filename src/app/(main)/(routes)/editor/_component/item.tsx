"use client";

import { ChevronDown, ChevronRight, LucideIcon } from "lucide-react";

interface ItemProps {
  label: string;
  onClick: () => void;
  icon: LucideIcon;
  documentIcon?: string;
  level?: number;
  onExpand?: () => void;
  expanded?: boolean;
  active?: boolean;
}

const Item = ({
  label,
  onClick,
  icon: Icon,
  documentIcon,
  level = 1,
  onExpand,
  expanded,
  active,
}: ItemProps) => {
  const ChevronIcon = expanded ? ChevronDown : ChevronRight;
  return (
    <div
      onClick={onClick}
      role="button"
      style={{
        paddingLeft: level ? `${level * 12 + 12}px` : "12px",
      }}
      className={` mt-1 group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-secondary-content/5 flex items-center font-medium ${
        active ? "bg-secondary-content/5 text-white" : ""
      }`}
    >
      <Icon className="shrink-0 h-[18px] mr-1" />
      <span className="truncate">{label}</span>
    </div>
  );
};

export default Item;
