import ProjectCard from "../ProjectCard";
import styles from "./styles.module.css";

const ProjectsTable: React.FC<any> = ({ projects, handleProjectOpen }) => {
  return (
    <div className={styles.container}>
      {projects.map((project) => {
        return (
          <ProjectCard
            name={project.name}
            key={project.name}
            handleClick={() => handleProjectOpen(project)}
            handleDelete={() => alert(project.name)}
          />
        );
      })}
    </div>
  );
};

export default ProjectsTable;
