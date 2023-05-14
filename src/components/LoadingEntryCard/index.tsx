import styles from "./styles.module.css";

const LoadingEntryCard: React.FC<{ index: number }> = ({ index }) => {
  return (
    <div
      style={{ animationDelay: `${75 * index}ms` }}
      className={styles.container}
    ></div>
  );
};

export default LoadingEntryCard;
