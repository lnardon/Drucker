import EntryCard from "../EntryCard";
import { convertSecondsToFullTime } from "@/utils/convertSecondsToFullTime";
import { convert8601 } from "@/utils/converters";
import { EntryInterface } from "@/interfaces/EntryInterface";
import styles from "./styles.module.css";

const EntriesTable: React.FC<{ entries: EntryInterface[] }> = ({ entries }) => {
  return (
    <div className={styles.container}>
      <div className={styles.tableHeader}>
        <h1>Name</h1>
        <h1>Tags</h1>
        <h1>Date</h1>
        <h1>Time</h1>
      </div>
      {entries?.map((entry: EntryInterface) => {
        return (
          <EntryCard
            name={entry.name}
            key={entry.name}
            time={convertSecondsToFullTime(entry.time)}
            createdAt={convert8601(entry.createdAt)}
            tags={entry.tags}
          />
        );
      })}
    </div>
  );
};

export default EntriesTable;
