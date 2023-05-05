import ProjectCard from "../ProjectCard";
import styles from "./styles.module.css";

const ProjectsTable: React.FC<any> = ({
  projects,
  handleProjectOpen,
  handleProjectDeletion,
}) => {
  return (
    <div className={styles.container}>
      {projects.map((project: any) => {
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
