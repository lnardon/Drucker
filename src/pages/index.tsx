import Head from "next/head";
import { useState, useEffect } from "react";
import Modal from "react-modal";

import styles from "@/styles/Home.module.css";
import { ProjectsRepository } from "@/utils/repositories/projects";
import { EntriesRepository } from "@/utils/repositories/entries";
import { Clock } from "@/utils/Clock";
import { ProjectInterface } from "@/interfaces/ProjectInterface";
import EntriesTable from "@/components/EntriesTable";
import ProjectsTable from "@/components/ProjectsTable";
import CreateEntry from "@/components/CreateEntry";
import Login from "@/components/Login";
import { EntryInterface } from "@/interfaces/EntryInterface";
import { convertSecondsToFullTime } from "@/utils/convertSecondsToFullTime";

Modal.setAppElement("#__next");

const clock = new Clock();
let interval: undefined | NodeJS.Timer = undefined;
export default function Home() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState<ProjectInterface[]>([]);
  const [entries, setEntries] = useState<EntryInterface[]>([]);
  const [currentProject, setCurrentProject] = useState<ProjectInterface>();
  const [currentTimerTime, setCurrentTimerTime] = useState(0);
  const [modalIsOpen, setIsOpen] = useState(false);

  const projectsRepository = new ProjectsRepository();
  const entriesRepository = new EntriesRepository();

  function openModal() {
    setIsOpen(true);
    if (clock.getElapsedTimeInSeconds() > 0) {
      interval = setInterval(() => {
        setCurrentTimerTime(clock.getElapsedTimeInSeconds());
      }, 1000);
    }
  }
  function closeModal() {
    setIsOpen(false);
  }

  function handleStartTimer() {
    clock.startTimer();
    setCurrentTimerTime(clock.getElapsedTimeInSeconds());
    interval = setInterval(() => {
      setCurrentTimerTime(clock.getElapsedTimeInSeconds());
    }, 1000);
  }

  async function handleEndTimer(
    name: string,
    description: string,
    projectId: string
  ) {
    clock.endTimer();
    setCurrentTimerTime(0);
    let rawData = await entriesRepository.createEntry(
      name,
      description,
      currentTimerTime,
      projectId
    );
    let parsedData = await rawData.json();
    setEntries((old: EntryInterface[]) => [...old, parsedData]);
    setIsOpen(false);
  }

  async function handleProjectOpen(project: ProjectInterface) {
    setIsLoading(true);
    setEntries([]);
    setCurrentProject(project);
    let rawData = await projectsRepository.getProjectEntries(project.id);
    let parsedData = await rawData.json();
    setEntries(parsedData);
    setCurrentProject(project);
    setIsLoading(false);
  }

  async function handleProjectCreation() {
    const name = prompt("Type an unique name for your new project.");
    if (name) {
      let rawData = await projectsRepository.createProject(name);
      let parsedData = await rawData.json();
      setProjects((old) => [...old, parsedData]);
    }
  }

  async function handleProjectDeletion(id: string) {
    const confirmation = prompt(
      "To confirm the deletion please type the name of the project and then press the OK button or the Cancel button to close this window."
    );
    if (confirmation) {
      let rawData = await projectsRepository.deleteProject(id);
      setProjects((old) => old.filter((project) => project.id !== id));
    }
  }

  function onAuthSuccess() {
    setIsUserLoggedIn(true);
  }

  useEffect(() => {
    (async () => {
      let rawData = await projectsRepository.getAllProjects();
      let parsedData = await rawData.json();
      setProjects(parsedData);
    })();
  }, []);

  return (
    <>
      <Head>
        <title>DRCKR</title>
        <meta name="description" content="Track time spent on projects." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/timer.png" />
      </Head>
      <div className={styles.container}>
        {isUserLoggedIn ? (
          <div className={styles.content}>
            <header className={styles.header}>
              <span
                className={styles.title}
                onClick={() => setCurrentProject(undefined)}
              >
                DRCKR
              </span>
              <button className={styles.createBtn} onClick={openModal}>
                {currentTimerTime > 0
                  ? convertSecondsToFullTime(currentTimerTime)
                  : "Start Timer"}
              </button>
            </header>
            <main className={styles.main}>
              <div className={styles.breadcrumbsContainer}>
                <h2 className={styles.subtitle}>
                  <span>&#x1f3c6;</span> Projects
                  <span>{currentProject && ` > ${currentProject.name}`}</span>
                </h2>
                {!currentProject && (
                  <button
                    className={styles.createFolderBtn}
                    onClick={handleProjectCreation}
                  >
                    + Create Project
                  </button>
                )}
              </div>
              {currentProject ? (
                <EntriesTable entries={entries} isLoading={isLoading} />
              ) : (
                <ProjectsTable
                  projects={projects}
                  handleProjectOpen={handleProjectOpen}
                  handleProjectDeletion={handleProjectDeletion}
                />
              )}
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
              >
                <>
                  <button
                    className={styles.closeBtn}
                    onClick={() => setIsOpen(false)}
                  >
                    X
                  </button>
                  <CreateEntry
                    handleStartTimer={handleStartTimer}
                    handleStopTimer={() => {
                      clock.stopTimer();
                      clearInterval(interval);
                    }}
                    handleEndTimer={handleEndTimer}
                    timer={currentTimerTime}
                    projects={projects}
                  />
                </>
              </Modal>
            </main>
          </div>
        ) : (
          <Login onAuthSuccess={onAuthSuccess} />
        )}
      </div>
    </>
  );
}
