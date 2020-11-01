import { getCtr } from "facet";

import { Editing } from "../facets/Editing";
import { Addition } from "../facets/Addition";

export function newItemsAreConfirmedOnEditingSave(this: Editing, values: any) {
  const ctr = getCtr(this);
  const addition = Addition.get(ctr);
  if (values.id === undefined) {
    throw Error("No id in item");
  }
  if (values.id === addition?.item.id) {
    Addition.get(ctr).confirm();
  }
}

export function newItemsAreCancelledOnEditingCancel(this: Editing) {
  const ctr = getCtr(this);
  if (Addition.get(ctr).item) {
    Addition.get(ctr).cancel();
  }
}
