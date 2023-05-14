export class EntriesRepository {
  async getAllEntries() {
    const allEntries = await fetch("/api/getAllEntries");
    return allEntries;
  }

  async createEntry(
    name: string,
    description: string,
    time: number,
    projectId: string
  ) {
    const createdEntry = await fetch("/api/createEntry", {
      method: "POST",
      body: JSON.stringify({
        projectId,
        name,
        description,
        time,
      }),
    });
    return createdEntry;
  }

  async deleteEntry(entryId: string) {
    const deletedEntry = await fetch("/api/deleteEntry");
    return deletedEntry;
  }
}
