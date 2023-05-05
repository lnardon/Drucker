import EntryCard from "../EntryCard";

import styles from "./styles.module.css";

const EntriesTable: React.FC<any> = ({ entries }) => {
  return (
    <div className={styles.container}>
      {entries[0]?.entries?.map((entry: any) => {
        return (
          <EntryCard
            name={entry.name}
            key={entry.name}
            time={entry.time}
            createdAt={entry.createdAt}
          />
        );
      })}
    </div>
  );
};

export default EntriesTable;
