import { Addition } from "../facets/Addition";
import { Highlight } from "../facets/Highlight";

export const cancelNewItemOnHighlightChange = (ctr: any) =>
  function (this: Highlight, id: string) {
    const addedItemId = Addition.get(ctr).item?.id;
    if (addedItemId && addedItemId !== id) {
      Addition.get(ctr).cancel();
    }
  };
