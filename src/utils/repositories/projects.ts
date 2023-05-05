export class ProjectsRepository {
  async getAllProjects() {
    const allProjects = await fetch("/api/projects");
    return allProjects;
  }

  async createProject(name: string) {
    const createdProject = await fetch("/api/createProject", {
      method: "POST",
      body: name,
    });
    return createdProject;
  }

  async deleteProject(projectId: string) {
    const deletedProject = await fetch("/api/deleteProject", {
      method: "POST",
      body: projectId,
    });
    return deletedProject;
  }

  async addEntry(projectId: string, name: string, time: number) {
    const createdEntry = await fetch("/api/createEntry", {
      method: "POST",
      body: JSON.stringify({
        projectId,
        name,
        time,
      }),
    });
    return createdEntry;
  }

  async getProjectEntries(projectId: string) {
    const projectEntries = await fetch("/api/getEntries", {
      method: "POST",
      body: projectId,
    });
    return projectEntries;
  }
}
