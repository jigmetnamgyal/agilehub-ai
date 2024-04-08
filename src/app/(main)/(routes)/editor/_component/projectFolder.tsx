"use client";

import { useEffect, useState } from "react";
import { FileText, Folder, Trash, Plus } from "lucide-react";
import Item from "./item";
import { supabaseClient } from "@/app/api/supabase";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";

const ProjectFolder = ({ project_id, pages, deleteProject, setContent }: any) => {
  const [projects, setProjects] = useState([]);
  const { getToken, userId } = useAuth();

  useEffect(() => {
    const projectList = async () => {
      const token = await getToken({ template: "jaggle_ai_supabase_jwt" });

      let { data, error } = await supabaseClient(token || "")
        .from("projects")
        .select(
          `
          id,
          user_id,
          title,
          description,
          pages (id, project_id, created_at, user_prompt, ai_generated_description, page_title)
        `,
        )
        .eq("user_id", userId);

      if (error) {
        toast.error(error.message);
      } else {
        setProjects(data as any);
      }
    };

    projectList();
  }, [pages]);


  return (
    <div>
      {projects?.map((project: any) => (
        <div key={project.id}>
          <div
            role="button"
            className="pl-[12px] group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-secondary-content/5 flex items-center font-medium"
          >
            <Folder className="shrink-0 h-[18px] mr-2" />
            <span className="truncate">{project.title}</span>
            <div className="h-[18px] w-[18px] group">
              <Plus
                onClick={() => {
                  project_id(project.id);
                  setContent("");
                  document.getElementById("my_modal_4")?.showModal();
                }}
                className="shrink-0 h-[18px] w-[18px] rounded-sm hidden absolute group-hover:flex right-8 hover:bg-gray-600"
              />

              <Trash
                onClick={() => {
                  deleteProject(project.id);
                }}
                className="shrink-0 h-[18px] w-[14px] rounded-sm hidden absolute group-hover:flex right-14 hover:bg-gray-600"
              />
            </div>
          </div>

          {project?.pages.map((page: any) => (
            <Item onClick={() => {setContent(page?.ai_generated_description)}} label={page?.page_title} icon={FileText} key={page?.id + '' + project?.id} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default ProjectFolder;
