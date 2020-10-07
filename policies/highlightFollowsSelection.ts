import { listen } from "facet";

import { Selection } from "../facets/selection";
import { Highlight } from "../facets/highlight";

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
