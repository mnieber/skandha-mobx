import { getCtr } from "facility";
import { Addition } from "../facets/Addition";
import { Highlight } from "../facets/Highlight";

export function cancelNewItemOnHighlightChange(facet: Highlight, id: string) {
  const ctr = getCtr(facet);
  const addedItemId = Addition.get(ctr).item?.id;
  if (addedItemId && addedItemId !== id) {
    Addition.get(ctr).cancel();
  }
}
