import { getCtr } from "facility";
import { Highlight } from "../facets/Highlight";
import { Addition } from "../facets/Addition";

export function highlightNewItem(facet: Addition) {
  const ctr = getCtr(facet);
  Highlight.get(ctr).highlightItem(facet.item.id);
}
