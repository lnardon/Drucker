import { TagInterface } from "./TagInterface";

export interface EntryInterface {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  time: number;
  tags?: TagInterface[];
  projectId: String;
}
