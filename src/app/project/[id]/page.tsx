import ProjectDetailClient from "./project-detail-client";
import { supabase } from "@/utils/supabase";
import { Project } from "@/utils/portfolioService";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // Fetch project from Supabase
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    console.error("Error fetching project:", error);
    return <ProjectDetailClient id={id} initialProject={null} />;
  }

  return <ProjectDetailClient id={id} initialProject={data as Project} />;
}

