export class EntriesRepository {
  async getAllEntries() {
    const allEntries = await fetch("/api/projects");
    return allEntries;
  }

  async createEntry() {
    const createdEntry = await fetch("/api/projects");
    return createdEntry;
  }

  async deleteEntry(entryId: string) {
    const deletedEntry = await fetch("/api/projects");
    return deletedEntry;
  }
}
