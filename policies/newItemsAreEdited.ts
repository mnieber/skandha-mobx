import { getCtr } from "facility";
import { Editing } from "../facets/Editing";

export function editingSetEnabled(facet: any) {
  const ctr = getCtr(facet);
  const editing = Editing.get(ctr);
  if (!editing.isEditing) {
    editing.enable();
  }
}

export function editingSetDisabled(facet: any) {
  const ctr = getCtr(facet);
  const editing = Editing.get(ctr);
  if (editing.isEditing) {
    editing.cancel();
  }
}
