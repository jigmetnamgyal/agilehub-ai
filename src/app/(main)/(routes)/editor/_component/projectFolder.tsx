"use client";

import { useEffect, useState } from "react";
import { FileText, Folder, Plus } from "lucide-react";
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
        <div className="h-[18px] w-[18px] group">
          <Plus
            onClick={() => {
              document.getElementById("my_modal_4")?.showModal();
            }}
            className="shrink-0 h-[18px] w-[18px] rounded-sm hidden absolute group-hover:flex right-10 hover:bg-gray-600"
          />
        </div>
      </div>

      <Item
        onClick={() => {}}
        label="SSO Module"
        icon={FileText}
        active={true}
      />
      <Item
        onClick={() => {}}
        label="Normal Authentication Module"
        icon={FileText}
      />
      <Item onClick={() => {}} label="Profile Module" icon={FileText} />
    </>
  );
};

export default ProjectFolder;
