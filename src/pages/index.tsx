import Head from "next/head";
import { useState, useEffect } from "react";

import styles from "@/styles/Home.module.css";
import { ProjectsRepository } from "@/utils/repositories/projects";
import EntriesTable from "@/components/EntriesTable";
import ProjectsTable from "@/components/ProjectsTable";
import { ProjectInterface } from "@/interfaces/ProjectInterface";

export default function Home() {
  const [projects, setProjects] = useState<any[]>([]);
  const [entries, setEntries] = useState<any>([]);
  const [currentProject, setCurrentProject] = useState<any>();

  const projectsRepository = new ProjectsRepository();

  function handleStartTime() {
    alert(Date.now());
  }

  async function handleProjectOpen(project: ProjectInterface) {
    let rawData = await projectsRepository.getProjectEntries(project.id);
    let parsedData = await rawData.json();
    setEntries(parsedData);
    setCurrentProject(project);
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
        <title>Drucker</title>
        <meta name="description" content="Track time spent on projects." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <header className={styles.header}>
          <span className={styles.title}>Drucker</span>
          <button className={styles.createBtn} onClick={handleStartTime}>
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
            />
          )}
        </main>
      </div>
    </>
  );
}
