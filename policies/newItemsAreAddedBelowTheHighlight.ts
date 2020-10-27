import { listen } from "facet";

import { Addition } from "../facets/Addition";
import { Highlight } from "../facets/Highlight";
import { topOfTheList } from "../policies/DragSourceFromNewItem";

export const newItemsAreAddedBelowTheHighlight = (ctr: any) => {
  listen(Addition.get(ctr), "add", function (data: any) {
    Addition.get(ctr).parentId = Highlight.get(ctr).id || topOfTheList;
  });
};
