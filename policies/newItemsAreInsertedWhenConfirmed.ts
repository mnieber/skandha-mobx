import { getCtr } from "facet";

import { Addition } from "../facets/Addition";
import { Insertion } from "../facets/Insertion";
import { DragSourceFromNewItem } from "./DragSourceFromNewItem";

export function newItemsAreInsertedWhenConfirmed(this: Addition) {
  const ctr = getCtr(this);
  const drag = DragSourceFromNewItem(ctr);
  if (drag) {
    Insertion.get(ctr).insertItems(drag);
  }
}
