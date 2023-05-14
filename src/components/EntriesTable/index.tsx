import EntryCard from "../EntryCard";
import { convertSecondsToFullTime } from "@/utils/convertSecondsToFullTime";
import { convert8601 } from "@/utils/converters";
import { EntryInterface } from "@/interfaces/EntryInterface";
import styles from "./styles.module.css";
import AnalyticsBox from "../AnalyticsBox";
import TagBadge from "../TagBadge";
import HeatMap from "../HeatMap";
import LoadingEntryCard from "../LoadingEntryCard";

const mostUsedTags = [
  { name: "DB" },
  { name: "Backend" },
  { name: "Frontend" },
  { name: "UX" },
  { name: "DevOps (INFRA)" },
];

const EntriesTable: React.FC<{
  entries: EntryInterface[];
  isLoading: boolean;
}> = ({ entries, isLoading }) => {
  return (
    <>
      <div className={styles.analyticsContainer}>
        <AnalyticsBox content={() => <h1>SKRT</h1>} />
        <AnalyticsBox content={() => <HeatMap />} />
        <AnalyticsBox
          content={() => {
            return (
              <>
                {mostUsedTags.map((tag, index) => (
                  <TagBadge key={tag.name + index} name={tag.name} />
                ))}
              </>
            );
          }}
        />
        <AnalyticsBox
          content={() => (
            <h1>
              {convertSecondsToFullTime(
                entries.reduce((n, { time }) => n + time, 0)
              )}
            </h1>
          )}
        />
      </div>
      <div className={styles.container}>
        <div className={styles.tableHeader}>
          <h1>Name</h1>
          <h1>Tags</h1>
          <h1>Date</h1>
          <h1>Time</h1>
        </div>
        {isLoading
          ? [0, 0, 0, 0, 0, 0, 0, 0].map((on, index) => {
              return (
                <LoadingEntryCard
                  key={Date.now() * Math.random()}
                  index={index}
                />
              );
            })
          : entries?.map((entry: EntryInterface) => {
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
    </>
  );
};

export default EntriesTable;
