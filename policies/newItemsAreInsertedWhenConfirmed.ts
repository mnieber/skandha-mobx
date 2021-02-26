import { getCtr } from "facility";

import { Addition } from "../facets/Addition";
import { Insertion } from "../facets/Insertion";
import { DragSourceFromNewItem } from "./DragSourceFromNewItem";

export function newItemsAreInsertedWhenConfirmed(facet: Addition) {
  const ctr = getCtr(facet);
  const drag = DragSourceFromNewItem(ctr);
  if (drag) {
    Insertion.get(ctr).insertItems(drag);
  }
}
