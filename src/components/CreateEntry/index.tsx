import { useState } from "react";

import styles from "./styles.module.css";
import { convertSecondsToFullTime } from "@/utils/convertSecondsToFullTime";

const CreateEntry: React.FC<any> = ({
  handleStartTimer,
  handleEndTimer,
  timer,
  projects,
}) => {
  const [entryName, setEntryName] = useState("");
  const [selectedProject, setSelectedProject] = useState("");

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Create a Timer Entry</h3>
      <p className={styles.time}>{convertSecondsToFullTime(timer)}</p>
      <input
        className={styles.nameInput}
        type="text"
        name="name"
        id=""
        placeholder="Entry name"
        onChange={(e) => setEntryName(e.target.value)}
      />
      <select
        name="project"
        onChange={(e) => setSelectedProject(e.target.value)}
        value={selectedProject}
      >
        {projects.map((entry: any, index: number) => {
          return (
            <option key={index} value={entry.id}>
              {entry.name}
            </option>
          );
        })}
      </select>
      <button className={styles.startBtn} onClick={handleStartTimer}>
        Start
      </button>
      <button
        className={styles.endBtn}
        onClick={() => {
          handleEndTimer(entryName, selectedProject);
        }}
      >
        End Timer & Save
      </button>
    </div>
  );
};

export default CreateEntry;
