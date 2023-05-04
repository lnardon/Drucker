import styles from "./styles.module.css";

const EntryCard: React.FC<any> = ({ createdAt, name, time }) => {
  return (
    <div className={styles.container}>
      <span>{name}</span>
      <span>{createdAt}</span>
      <span>{time}</span>
    </div>
  );
};

export default EntryCard;
