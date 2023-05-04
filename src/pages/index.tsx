import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { DatabaseRepository } from "@/utils/databaseRepository";
import ProjectCard from "@/components/ProjectCard";
import EntryCard from "@/components/EntryCard";

export default function Home() {
  const projects = [{ name: "World Domination" }];
  const entries = [
    { name: "Creating drucker base", time: "07:16", createdAt: "04/05/2023" },
  ];
  const db = new DatabaseRepository();
  function handleStartTime() {
    db.startTimer();
    alert(Date.now());
  }

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
          </h2>
          {projects.map((project) => {
            return (
              <ProjectCard
                name={project.name}
                key={project.name}
                handleClick={() => alert(project.name)}
              />
            );
          })}
          {entries.map((entry) => {
            return (
              <EntryCard
                name={entry.name}
                key={entry.name}
                time={entry.time}
                createdAt={entry.createdAt}
              />
            );
          })}
        </main>
      </div>
    </>
  );
}
