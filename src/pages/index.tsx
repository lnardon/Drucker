import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import Modal from "react-modal";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
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
import { TagInterface } from "@/interfaces/TagInterface";

Modal.setAppElement("#__next");
const clock = new Clock();
let interval: undefined | NodeJS.Timer = undefined;

export default function Home() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState<ProjectInterface[]>([]);
  const [entries, setEntries] = useState<EntryInterface[]>([]);
  const [currentProject, setCurrentProject] = useState<ProjectInterface>();
  const [timerTime, setTimerTime] = useState(0);
  const [modalIsOpen, setIsOpen] = useState(false);

  const projectsRepository = new ProjectsRepository();
  const entriesRepository = new EntriesRepository();

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function handleStartTimer() {
    clock.startTimer();
    setTimerTime(clock.getElapsedTimeInSeconds());
    interval = setInterval(() => {
      setTimerTime(clock.getElapsedTimeInSeconds());
    }, 1000);
  }

  async function handleEndTimer(
    name: string,
    description: string,
    projectId: string,
    entryTags: TagInterface[]
  ) {
    clock.endTimer();
    setTimerTime(0);
    let rawData = await entriesRepository.createEntry(
      name,
      description,
      timerTime,
      projectId,
      entryTags
    );
    let parsedData = await rawData.json();
    setEntries((oldEntries: EntryInterface[]) => [parsedData, ...oldEntries]);
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
      setProjects((oldProjects) => [...oldProjects, parsedData]);
    }
  }

  async function handleProjectDeletion(id: string) {
    const confirmation = prompt(
      "To confirm the deletion please type the name of the project and then press the OK button or the Cancel button to close this window."
    );
    if (confirmation) {
      await projectsRepository.deleteProject(id);
      setProjects((old) => old.filter((project) => project.id !== id));
    }
  }

  function onAuthSuccess() {
    setIsUserLoggedIn(true);
  }

  function handleClearTimer() {
    clearInterval(interval);
    clock.resetTimer();
  }

  useEffect(() => {
    projectsRepository
      .getAllProjects()
      .then((data) => data.json())
      .then((parsedData) => setProjects(parsedData));

    return () => {
      clearInterval(interval);
    };
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
                {timerTime > 0
                  ? convertSecondsToFullTime(timerTime)
                  : "Start Timer"}
              </button>
            </header>
            <main className={styles.main}>
              <div className={styles.breadcrumbsContainer}>
                <h2
                  className={styles.subtitle}
                  onClick={() => setCurrentProject(undefined)}
                >
                  <Image
                    src={
                      currentProject
                        ? "/assets/open-box.png"
                        : "/assets/closed-box.png"
                    }
                    alt=""
                    width={3.5 * 16}
                    height={3.5 * 16}
                    className={styles.projectsIcon}
                  />
                  {currentProject ? (
                    <span
                      className={styles.breadcrumbsProjectName}
                    >{`> ${currentProject.name}`}</span>
                  ) : (
                    <span>Projects</span>
                  )}
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
                    <Image
                      src="/assets/delete.png"
                      alt="close"
                      width={32}
                      height={32}
                    />
                  </button>
                  <CreateEntry
                    handleStartTimer={handleStartTimer}
                    handleStopTimer={() => {
                      clearInterval(interval);
                      clock.stopTimer();
                    }}
                    handleEndTimer={handleEndTimer}
                    clearTimer={handleClearTimer}
                    timer={timerTime}
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
