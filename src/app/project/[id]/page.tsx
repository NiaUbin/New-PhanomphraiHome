import ProjectDetailClient from "./project-detail-client";
import { notFound } from "next/navigation";
import { supabase } from "@/utils/supabase";
import { Project } from "@/utils/portfolioService";
import { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  
  const { data: project } = await supabase
    .from('projects')
    .select('title, description')
    .eq('id', id)
    .single();

  if (!project) return { title: 'ไม่พบเนื้อหา' };

  return {
    title: `${project.title}`,
    description: project.description || 'ดูรายละเอียดผลงานการออกแบบและก่อสร้างโดย PHANOMPHRAI PK',
  };
}

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

