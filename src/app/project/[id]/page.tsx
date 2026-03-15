import ProjectDetailClient from "./project-detail-client";
import { notFound } from "next/navigation";
import { supabase } from "@/utils/supabase";
import { Project } from "@/utils/portfolioService";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // Fetch project from Supabase
  const { data: project, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !project) {
    notFound();
  }

  // Fetch related projects (same category, different ID)
  const { data: relatedProjects } = await supabase
    .from('projects')
    .select('*')
    .eq('category', project.category)
    .neq('id', id)
    .limit(3);

  return (
    <ProjectDetailClient 
      id={id} 
      initialProject={project as Project} 
      relatedProjects={(relatedProjects || []) as Project[]} 
    />
  );
}

