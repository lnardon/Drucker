import { useState } from "react";

import styles from "./styles.module.css";
import { convertSecondsToFullTime } from "@/utils/convertSecondsToFullTime";
import { ProjectInterface } from "@/interfaces/ProjectInterface";

const CreateEntry: React.FC<{
  handleStartTimer: () => void;
  handleStopTimer: () => void;
  handleEndTimer: (entryName: string, selectedProject: string) => void;
  timer: number;
  projects: ProjectInterface[];
}> = ({
  handleStartTimer,
  handleStopTimer,
  handleEndTimer,
  timer,
  projects,
}) => {
  const [step, setStep] = useState(timer > 0 ? 1 : 0);
  const [entryName, setEntryName] = useState("");
  const [selectedProject, setSelectedProject] = useState("");

  function createEntrySteps() {
    switch (step) {
      case 0:
        return (
          <>
            <p className={styles.time}>-- : --</p>
            <button
              className={styles.startBtn}
              onClick={() => {
                handleStartTimer();
                setStep(1);
              }}
            >
              Start
            </button>
          </>
        );
      case 1:
        return (
          <>
            <p className={styles.time}>{convertSecondsToFullTime(timer)}</p>
            <button
              className={styles.endBtn}
              onClick={() => {
                setStep(2);
              }}
            >
              Stop
            </button>
          </>
        );
      case 2:
        handleStopTimer();
        return (
          <>
            <p className={styles.time}>{convertSecondsToFullTime(timer)}</p>a
            <input
              className={styles.nameInput}
              type="text"
              name="name"
              id=""
              placeholder="Name"
              onChange={(e) => setEntryName(e.target.value)}
            />
            <select
              name="project"
              onChange={(e) => setSelectedProject(e.target.value)}
              value={selectedProject}
              className={styles.select}
            >
              {projects.map((entry: ProjectInterface, index: number) => {
                return (
                  <option key={index} value={entry.id}>
                    {entry.name}
                  </option>
                );
              })}
            </select>
            <button
              className={styles.endBtn}
              onClick={() => {
                handleEndTimer(entryName, selectedProject);
                setStep(3);
              }}
            >
              Save
            </button>
          </>
        );
      case 3:
        return <div className={styles.savingLabel}>Saving ...</div>;
    }
  }

  return <div className={styles.container}>{createEntrySteps()}</div>;
};

export default CreateEntry;
