import { Addition } from "../facets/Addition";
import { topOfTheList } from "../internal/getPreview";

export function newItemsAreCreatedAtTheTop(this: Addition, data: any) {
  this.parentId = topOfTheList;
}
