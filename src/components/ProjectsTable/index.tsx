import { ProjectInterface } from "@/interfaces/ProjectInterface";
import ProjectCard from "../ProjectCard";
import styles from "./styles.module.css";

const ProjectsTable: React.FC<{
  projects: ProjectInterface[];
  handleProjectOpen: (project: ProjectInterface) => void;
  handleProjectDeletion: (id: string) => void;
}> = ({ projects, handleProjectOpen, handleProjectDeletion }) => {
  return (
    <div className={styles.container}>
      {projects.map((project: ProjectInterface) => {
        return (
          <ProjectCard
            name={project.name}
            key={project.name}
            handleClick={() => handleProjectOpen(project)}
            handleDelete={() => handleProjectDeletion(project.id)}
          />
        );
      })}
    </div>
  );
};

export default ProjectsTable;
