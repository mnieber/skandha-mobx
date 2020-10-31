import { getCtr } from "facet";
import { Addition } from "../facets/Addition";
import { Highlight } from "../facets/Highlight";
import { topOfTheList } from "../internal/getPreview";

export function newItemsAreAddedBelowTheHighlight(this: Addition, data: any) {
  const ctr = getCtr(this);
  this.parentId = Highlight.get(ctr).id || topOfTheList;
}
