export class EntriesRepository {
  async getAllEntries() {
    const allEntries = await fetch("/api/projects");
    return allEntries;
  }

  async createEntry(name: string, time: number, projectId: string) {
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

  async deleteEntry(entryId: string) {
    const deletedEntry = await fetch("/api/projects");
    return deletedEntry;
  }
}
