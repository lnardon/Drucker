import { EntryInterface } from "./EntryInterface";

export interface ProjectInterface {
  id: string;
  name: string;
  description?: string;
  entries?: EntryInterface[];
}
