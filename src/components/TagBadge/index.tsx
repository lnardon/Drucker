import styles from "./styles.module.css";

const TagBadge: React.FC<{ name: string }> = ({ name }) => {
  return (
    <div className={styles.container}>
      <span
        className={styles.color}
        style={{
          backgroundColor: `rgb(${Math.floor(Math.random() * 256)},${Math.floor(
            Math.random() * 256
          )},${Math.floor(Math.random() * 256)})`,
        }}
      ></span>
      <p className={styles.name}>{name}</p>
    </div>
  );
};

export default TagBadge;
