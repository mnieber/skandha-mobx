import { getCtr } from "facet";
import { Editing } from "../facets/Editing";

export function editingSetEnabled(this: any) {
  const ctr = getCtr(this);
  const editing = Editing.get(ctr);
  if (!editing.isEditing) {
    editing.enable();
  }
}

export function editingSetDisabled(this: any) {
  const ctr = getCtr(this);
  const editing = Editing.get(ctr);
  if (editing.isEditing) {
    editing.cancel();
  }
}
