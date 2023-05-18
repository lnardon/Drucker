import { TagInterface } from "@/interfaces/TagInterface";
import TagBadge from "../TagBadge";
import styles from "./styles.module.css";

const EntryCard: React.FC<{
  createdAt: string;
  name: string;
  time: string;
  tags: TagInterface[];
}> = ({ createdAt, name, time, tags }) => {
  return (
    <div className={styles.container}>
      <span>{name}</span>
      <div className={styles.tags}>
        {tags.map((tag: TagInterface) => {
          return <TagBadge key={name} name={tag.name} />;
        })}
      </div>
      <span>{createdAt}</span>
      <span>{time}</span>
    </div>
  );
};

export default EntryCard;
