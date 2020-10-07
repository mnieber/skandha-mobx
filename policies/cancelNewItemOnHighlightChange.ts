import { reaction } from "mobx";

import { Addition } from "../facets/addition";
import { Highlight } from "../facets/highlight";

export const cancelNewItemOnHighlightChange = (ctr: any) =>
  reaction(
    () => Highlight.get(ctr).id,
    (highlightedItemId) => {
      const addedItemId = Addition.get(ctr).item?.id;
      if (addedItemId && addedItemId !== highlightedItemId) {
        Addition.get(ctr).cancel();
      }
    }
  );
