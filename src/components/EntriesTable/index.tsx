import EntryCard from "../EntryCard";
import { convertSecondsToFullTime } from "@/utils/convertSecondsToFullTime";
import styles from "./styles.module.css";

const EntriesTable: React.FC<any> = ({ entries }) => {
  return (
    <div className={styles.container}>
      <div className={styles.tableHeader}>
        <h1>Name</h1>
        <h1>Tags</h1>
        <h1>Date</h1>
        <h1>Time</h1>
      </div>
      {entries[0]?.entries?.map((entry: any) => {
        return (
          <EntryCard
            name={entry.name}
            key={entry.name}
            time={convertSecondsToFullTime(entry.time)}
            createdAt={entry.createdAt}
          />
        );
      })}
    </div>
  );
};

export default EntriesTable;
