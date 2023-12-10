"use client";

import { ChevronRight, Folder } from "lucide-react";
import Item from "./item";

const ProjectFolder = () => {
  return (
    <>
      <div
        role="button"
        className="pl-[12px] group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-secondary-content/5 flex items-center font-medium"
      >
        <Folder className="shrink-0 h-[18px] mr-2" />
        <span className="truncate">Jaggle Ai</span>
      </div>

      <Item
        onClick={() => {}}
        label="New Project"
        icon={ChevronRight}
        active={true}
      />
      <Item onClick={() => {}} label="New Project" icon={ChevronRight} />
      <Item onClick={() => {}} label="New Project" icon={ChevronRight} />
    </>
  );
};

export default ProjectFolder;
