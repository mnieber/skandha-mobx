import { listen } from "facet";

import { Addition } from "../facets/addition";
import { Highlight } from "../facets/highlight";
import { topOfTheList } from "../policies/DragSourceFromNewItem";

export const newItemsAreCreatedBelowTheHighlight = (ctr: any) => {
  listen(Addition.get(ctr), "add", function (data: any) {
    Addition.get(ctr).parentId = Highlight.get(ctr).id || topOfTheList;
  });
};
