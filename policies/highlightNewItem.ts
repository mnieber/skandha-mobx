import { getCtr } from "facet";
import { Highlight } from "../facets/Highlight";
import { Addition } from "../facets/Addition";

export function highlightNewItem(this: Addition) {
  const ctr = getCtr(this);
  Highlight.get(ctr).highlightItem(this.item.id);
}
