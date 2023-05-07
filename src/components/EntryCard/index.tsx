import TagBadge from "../TagBadge";
import styles from "./styles.module.css";

const EntryCard: React.FC<any> = ({ createdAt, name, time, tags }) => {
  return (
    <div className={styles.container}>
      <span>{name}</span>
      <div className={styles.tags}>
        {tags.map((tag: any) => {
          return <TagBadge key={name} name={tag.name} />;
        })}
      </div>
      <span>{createdAt}</span>
      <span>{time}</span>
    </div>
  );
};

export default EntryCard;
