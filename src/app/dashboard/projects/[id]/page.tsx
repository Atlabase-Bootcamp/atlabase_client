import { ProjectDetailView } from "@/features/projects/components/ProjectDetailView";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function ProjectPage({ params }: PageProps) {
  const { id } = await params;

  return <ProjectDetailView projectId={id} />;
}

export default ProjectPage;
