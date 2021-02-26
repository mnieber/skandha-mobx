import { getCtr } from "facility";
import { Selection } from "../facets/Selection";
import { Highlight } from "../facets/Highlight";

export function highlightFollowsSelection(
  facet: Selection,
  { itemId, isShift, isCtrl }: any
) {
  const ctr = getCtr(facet);
  if (!isCtrl && !isShift) {
    Highlight.get(ctr).highlightItem(itemId);
  }
}
