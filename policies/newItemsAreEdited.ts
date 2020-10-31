import { getCtr } from "facet";
import { Editing } from "../facets/Editing";

export function editingSetEnabled(this: any) {
  const ctr = getCtr(this);
  Editing.get(ctr).setIsEditing(true);
}

export function editingSetDisabled(this: any) {
  const ctr = getCtr(this);
  Editing.get(ctr).setIsEditing(false);
}
