import { getCtr } from "facility";
import { Addition } from "../facets/Addition";
import { Highlight } from "../facets/Highlight";
import { topOfTheList } from "../lib/getPreview";

export function newItemsAreAddedBelowTheHighlight(facet: Addition) {
  const ctr = getCtr(facet);
  facet.parentId = Highlight.get(ctr).id || topOfTheList;
}
