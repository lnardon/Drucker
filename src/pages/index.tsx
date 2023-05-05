import Head from "next/head";
import { useState, useEffect } from "react";
import Modal from "react-modal";

import styles from "@/styles/Home.module.css";
import { ProjectsRepository } from "@/utils/repositories/projects";
import EntriesTable from "@/components/EntriesTable";
import ProjectsTable from "@/components/ProjectsTable";
import { ProjectInterface } from "@/interfaces/ProjectInterface";
import { Clock } from "@/utils/Clock";
import CreateEntry from "@/components/CreateEntry";
import { EntriesRepository } from "@/utils/repositories/entries";

Modal.setAppElement("#__next");

export default function Home() {
  const [projects, setProjects] = useState<any[]>([]);
  const [entries, setEntries] = useState<any>([]);
  const [currentProject, setCurrentProject] = useState<any>();
  const [currentTimerTime, setCurrentTimerTime] = useState(0);
  const [modalIsOpen, setIsOpen] = useState(false);

  const projectsRepository = new ProjectsRepository();
  const entriesRepository = new EntriesRepository();
  const clock = new Clock();

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  function handleStartTimer() {
    clock.startTimer();
    setInterval(() => {
      setCurrentTimerTime(clock.getElapsedTimeInSeconds());
    }, 1000);
  }

  async function handleEndTimer(name: string, projectId: string) {
    let rawData = await entriesRepository.createEntry(
      name,
      currentTimerTime,
      projectId
    );
    setIsOpen(false);
  }

  async function handleProjectOpen(project: ProjectInterface) {
    let rawData = await projectsRepository.getProjectEntries(project.id);
    let parsedData = await rawData.json();
    setEntries(parsedData);
    setCurrentProject(project);
  }

  async function handleProjectCreation() {
    const name = prompt("Type a unique name for your new project.");
    if (name) {
      projectsRepository.createProject(name);
    }
  }

  async function handleProjectDeletion(id: string) {
    const confirmation = prompt(
      "To confirm the deletion please type the name of the project and then press the OK button or the Cancel button to close this window."
    );
    if (confirmation) {
      let rawData = await projectsRepository.deleteProject(id);
      let parsedData = await rawData.json();
    }
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
        <header className={styles.header}>
          <span
            className={styles.title}
            onClick={() => setCurrentProject(null)}
          >
            DRCKR
          </span>
          <button className={styles.createBtn} onClick={openModal}>
            Start Timer
          </button>
        </header>
        <main className={styles.main}>
          <h2 className={styles.subtitle}>
            <span>&#x1f3c6;</span> Projects
            <span>{currentProject && ` > ${currentProject.name}`}</span>
          </h2>
          {currentProject ? (
            <EntriesTable entries={entries} />
          ) : (
            <ProjectsTable
              projects={projects}
              handleProjectOpen={handleProjectOpen}
              handleProjectDeletion={handleProjectDeletion}
            />
          )}
          <button onClick={handleProjectCreation}>Create Project</button>
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
    </>
  );
}
