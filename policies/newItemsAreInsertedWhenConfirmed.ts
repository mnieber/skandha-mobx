import { listen } from "facet";

import { Addition } from "../facets/Addition";
import { Insertion } from "../facets/Insertion";
import { DragSourceFromNewItem } from "./DragSourceFromNewItem";

export const newItemsAreInsertedWhenConfirmed = (ctr: any) => {
  listen(
    Addition.get(ctr),
    "confirm",
    function () {
      const drag = DragSourceFromNewItem(ctr);
      if (drag) {
        Insertion.get(ctr).insertItems(drag);
      }
    },
    { after: false }
  );
};
