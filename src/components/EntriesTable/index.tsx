import { useState, useEffect } from "react";

import styles from "./styles.module.css";
import EntryCard from "../EntryCard";
import { convertSecondsToFullTime } from "@/utils/convertSecondsToFullTime";
import { convert8601 } from "@/utils/converters";
import { EntryInterface } from "@/interfaces/EntryInterface";
import LoadingEntryCard from "../LoadingEntryCard";
import { ProjectsRepository } from "@/utils/repositories/projects";

const EntriesTable: React.FC<{
  projectsRepository: ProjectsRepository;
  projectID: string;
}> = ({ projectsRepository, projectID }) => {
  const [page, setPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [entries, setEntries] = useState<EntryInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getEntries() {
      setIsLoading(true);
      let rawData = await projectsRepository.getProjectEntries(
        projectID,
        entriesPerPage,
        page
      );
      let parsedData = await rawData.json();

      while (parsedData.length < 10) {
        parsedData.push({ name: "-", createdAt: null, time: null, tags: [] });
      }

      setEntries(parsedData);
      setIsLoading(false);
    }
    getEntries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entriesPerPage, page]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.tableHeader}>
          <h1>Name</h1>
          <h1>Tags</h1>
          <h1>Date</h1>
          <h1>Time</h1>
        </div>
        {isLoading
          ? [0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((on, index) => {
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
                  time={
                    typeof entry.time === "number"
                      ? convertSecondsToFullTime(entry.time)
                      : "-"
                  }
                  createdAt={
                    typeof entry.createdAt === "string"
                      ? convert8601(entry.createdAt)
                      : "-"
                  }
                  tags={entry.tags || []}
                />
              );
            })}
      </div>
      <div className={styles.pagination}>
        {/* <select onChange={(e) => setEntriesPerPage(Number(e.target.value))}>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </select> */}
        <div className={styles.controls}>
          <button
            className={styles.pageBtn}
            onClick={() => setPage(page - 1)}
            disabled={page === 1 || isLoading}
          >
            Previous
          </button>
          <span className={styles.pageNumber}>{page}</span>
          <button
            className={styles.pageBtn}
            onClick={() => {
              setPage(page + 1);
            }}
            disabled={isLoading}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default EntriesTable;
