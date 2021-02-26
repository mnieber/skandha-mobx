import { Addition } from "../facets/Addition";
import { topOfTheList } from "../internal/getPreview";

export function newItemsAreCreatedAtTheTop(facet: Addition) {
  facet.parentId = topOfTheList;
}
