import styles from "./styles.module.css";

interface IProjectCard {
  name: string;
  index: number;
  handleClick: () => void;
  handleDelete: () => void;
}

const ProjectCard: React.FC<IProjectCard> = ({
  name,
  index,
  handleClick,
  handleDelete,
}) => {
  return (
    <div
      className={styles.container}
      onClick={handleClick}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <p className={styles.name}>{name}</p>
      <button
        className={styles.deleteBtn}
        onClick={(e) => {
          e.stopPropagation();
          handleDelete();
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.icon}
          src="./assets/delete.png"
          alt="delete icon"
        />
      </button>
    </div>
  );
};

export default ProjectCard;
