// app/components/Projects.tsx
import { getProjects } from '@/lib/getProjects';
import ProjectsClient from './ProjectsClient';

export default async function Projects() {
    const { projects, lastUpdated } = await getProjects();

    return <ProjectsClient initialProjects={projects} lastUpdated={lastUpdated} />;
}
