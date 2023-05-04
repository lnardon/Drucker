import styles from "./styles.module.css";

interface IProjectCard {
  name: string;
  handleClick: () => void;
}

const ProjectCard: React.FC<IProjectCard> = ({ name, handleClick }) => {
  return (
    <div className={styles.container} onClick={handleClick}>
      <p className={styles.name}>{name}</p>
    </div>
  );
};

export default ProjectCard;
