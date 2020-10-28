import { handle } from "facet";

import { Insertion } from "../facets/Insertion";
import { DragAndDrop } from "../facets/DragAndDrop";
import { Selection } from "../facets/Selection";
import { DragSourceFromNewItem } from "./DragSourceFromNewItem";
import { DropPositionT } from "facet-mobx/facets/Insertion";

export const selectionIsInsertedOnDragAndDrop = (ctr: any) => {
  handle(
    DragAndDrop.get(ctr),
    "drop",
    function (dropPosition: DropPositionT) {
      Insertion.get(ctr).insertItems({
        ...dropPosition,
        payload: Selection.get(ctr).items,
      });

      const drag = DragSourceFromNewItem(ctr);
      if (drag) {
        Insertion.get(ctr).insertItems(drag);
      }
    },
    { after: false }
  );
};
