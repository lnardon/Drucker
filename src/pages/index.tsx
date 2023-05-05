import Head from "next/head";
import { useState, useEffect } from "react";
import styles from "@/styles/Home.module.css";
import { ProjectsRepository } from "@/utils/repositories/projects";
import { EntriesRepository } from "@/utils/repositories/entries";
import ProjectCard from "@/components/ProjectCard";
import EntryCard from "@/components/EntryCard";
import EntriesTable from "@/components/EntriesTable";
import ProjectsTable from "@/components/ProjectsTable";

export default function Home() {
  const [projects, setProjects] = useState<any[]>([]);
  const [entries, setEntries] = useState<any[]>([
    { name: "Creating drucker base", time: "07:16", createdAt: "04/05/2023" },
  ]);
  const [currentProject, setCurrentProject] = useState<any>();

  const projectsRepository = new ProjectsRepository();
  const entriesRepository = new EntriesRepository();

  function handleStartTime() {
    alert(Date.now());
  }

  function handleProjectOpen(project) {
    setCurrentProject(project);
  }

  useEffect(() => {
    (async () => {
      let rawData = await projectsRepository.getAllProjects();
      let parsedData = await rawData.json();
      setProjects(parsedData);
    })();
  });

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
