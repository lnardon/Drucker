export class ProjectsRepository {
  async getAllProjects() {
    const allProjects = await fetch("/api/projects");
    return allProjects;
  }

  async createProject() {
    const createdProject = await fetch("/api/projects");
    return createdProject;
  }

  async deleteProject(projectId: string) {
    const deletedProject = await fetch("/api/projects");
    return deletedProject;
  }

  async addEntry(entr: string) {
    const deletedProject = await fetch("/api/projects");
    return deletedProject;
  }

  async getProjectEntries(projectId: string) {
    const projectEntries = await fetch("/api/getEntries", {
      method: "POST",
      body: projectId,
    });
    return projectEntries;
  }
}
