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

Modal.setAppElement("#__next");

const clock = new Clock();
let interval: undefined | NodeJS.Timer = undefined;
export default function Home() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [projects, setProjects] = useState<ProjectInterface[]>([]);
  const [entries, setEntries] = useState<EntryInterface[]>([]);
  const [currentProject, setCurrentProject] = useState<ProjectInterface>();
  const [currentTimerTime, setCurrentTimerTime] = useState(0);
  const [modalIsOpen, setIsOpen] = useState(false);

  const projectsRepository = new ProjectsRepository();
  const entriesRepository = new EntriesRepository();

  function openModal() {
    console.log(clock.getElapsedTimeInSeconds());
    setIsOpen(true);
    if (clock.getElapsedTimeInSeconds() != 0) {
      interval = setInterval(() => {
        setCurrentTimerTime(clock.getElapsedTimeInSeconds());
      }, 1000);
    }
  }
  function closeModal() {
    setIsOpen(false);
    clearInterval(interval);
  }

  function handleStartTimer() {
    clock.startTimer();
    setCurrentTimerTime(clock.getElapsedTimeInSeconds());
  }

  async function handleEndTimer(name: string, projectId: string) {
    let rawData = await entriesRepository.createEntry(
      name,
      currentTimerTime,
      projectId
    );
    let parsedData = await rawData.json();
    setEntries((old: EntryInterface[]) => [...old, parsedData]);
    setIsOpen(false);
  }

  async function handleProjectOpen(project: ProjectInterface) {
    let rawData = await projectsRepository.getProjectEntries(project.id);
    let parsedData = await rawData.json();
    setEntries(parsedData);
    setCurrentProject(project);
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
                Start Timer
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
                <EntriesTable entries={entries} />
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
                <CreateEntry
                  handleStartTimer={handleStartTimer}
                  handleEndTimer={handleEndTimer}
                  timer={currentTimerTime}
                  projects={projects}
                />
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
