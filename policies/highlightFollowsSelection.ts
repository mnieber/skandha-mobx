import { listen } from "facet";

import { Selection } from "../facets/Selection";
import { Highlight } from "../facets/Highlight";

export const highlightFollowsSelection = (ctr: any) => {
  listen(
    Selection.get(ctr),
    "selectItem",
    ({ itemId, isShift, isCtrl }: any) => {
      if (!isCtrl && !isShift) {
        Highlight.get(ctr).highlightItem(itemId);
      }
    }
  );
};
