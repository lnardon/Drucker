export class TagsRepository {
  async createTag(name: string) {
    const createdTag = await fetch("/api/createTag", {
      method: "POST",
      body: name,
    });
    return createdTag;
  }

  async deleteTag(id: string) {
    const deletedTag = await fetch("/api/deleteTag", {
      method: "POST",
      body: id,
    });
    return deletedTag;
  }
}
