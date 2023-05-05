import styles from "./styles.module.css";

interface IProjectCard {
  name: string;
  handleClick: () => void;
  handleDelete: () => void;
}

const ProjectCard: React.FC<IProjectCard> = ({
  name,
  handleClick,
  handleDelete,
}) => {
  return (
    <div className={styles.container} onClick={handleClick}>
      <p className={styles.name}>{name}</p>
      <button className={styles.deleteBtn} onClick={handleDelete}>
        X
      </button>
    </div>
  );
};

export default ProjectCard;
