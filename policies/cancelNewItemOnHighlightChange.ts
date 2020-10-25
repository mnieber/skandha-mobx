import { reaction } from "mobx";

import { Addition } from "../facets/Addition";
import { Highlight } from "../facets/Highlight";

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
