import { EntryInterface } from "./EntryInterface";

export interface TagInterface {
  id?: string;
  name?: string;
  entryId?: string;
  entries?: EntryInterface[];
}
