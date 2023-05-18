import { useState, useEffect } from "react";
import { MultiSelect } from "primereact/multiselect";
import { Dropdown } from "primereact/dropdown";

import styles from "./styles.module.css";
import { convertSecondsToFullTime } from "@/utils/convertSecondsToFullTime";
import { ProjectInterface } from "@/interfaces/ProjectInterface";
import { TagsRepository } from "@/utils/repositories/tags";
import { TagInterface } from "@/interfaces/TagInterface";

const CreateEntry: React.FC<{
  handleStartTimer: () => void;
  handleStopTimer: () => void;
  handleEndTimer: (
    entryName: string,
    entryDescription: string,
    selectedProject: string,
    entryTags: string[]
  ) => void;
  clearTimer: () => void;
  timer: number;
  projects: ProjectInterface[];
}> = ({
  handleStartTimer,
  handleStopTimer,
  handleEndTimer,
  clearTimer,
  timer,
  projects = [],
}) => {
  const tagsRepository = new TagsRepository();

  const [allTags, setAllTags] = useState<TagInterface[]>([]);
  const [step, setStep] = useState(timer > 0 ? 1 : 0);
  const [entryName, setEntryName] = useState("");
  const [entryDescription, setEntryDescription] = useState("");
  const [selectedProject, setSelectedProject] = useState(projects[0]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

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
            <span
              className={styles.clearTime}
              onClick={() => {
                setStep(0);
                clearTimer();
              }}
            >
              Clear Timer
            </span>
          </>
        );
      case 2:
        handleStopTimer();
        return (
          <>
            <p className={styles.time}>{convertSecondsToFullTime(timer)}</p>
            <input
              className={styles.nameInput}
              type="text"
              name="name"
              id=""
              placeholder="Name"
              onChange={(e) => setEntryName(e.target.value)}
              value={entryName}
            />
            <Dropdown
              optionLabel="name"
              options={projects}
              placeholder="Select project"
              value={selectedProject}
              onChange={(e) => {
                setSelectedProject(e.target.value);
              }}
              className={styles.dropdown}
            />
            <MultiSelect
              emptyFilterMessage={(name) => (
                <button
                  onClick={() => handleCreateTag("tets" + Date.now())}
                >{`Create tag: ${name.value}`}</button>
              )}
              optionLabel="name"
              options={allTags}
              filter
              placeholder="Select tags"
              maxSelectedLabels={3}
              showSelectAll={false}
              value={selectedTags}
              onChange={(e) => {
                setSelectedTags(e.target.value);
              }}
              className={styles.multiselect}
            />
            {/* <textarea
              className={styles.descriptionInput}
              name="description"
              id=""
              placeholder="Description"
              onChange={(e) => setEntryDescription(e.target.value)}
              value={entryDescription}
            /> */}
            <button
              className={styles.endBtn}
              onClick={() => {
                handleEndTimer(
                  entryName,
                  entryDescription,
                  selectedProject.id,
                  selectedTags
                );
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

  async function handleCreateTag(name: string) {
    let rawData = await tagsRepository.createTag(name);
    let parsedData = await rawData.json();
    setAllTags([...allTags, parsedData]);
    setSelectedTags([...selectedTags, parsedData]);
  }

  useEffect(() => {
    (async () => {
      let rawData = await tagsRepository.getAllTags();
      let parsedData = await rawData.json();
      setAllTags(parsedData);
    })();
  }, []);

  return <div className={styles.container}>{createEntrySteps()}</div>;
};

export default CreateEntry;
