export class TagsRepository {
  async getAllTags() {
    const allTags = await fetch("/api/getTags", {
      method: "GET",
    });
    return allTags;
  }

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
