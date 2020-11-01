import { getCtr } from "facet";

import { Insertion, DropPositionT } from "../facets/Insertion";
import { DragAndDrop } from "../facets/DragAndDrop";
import { Selection } from "../facets/Selection";

export function selectionIsInsertedOnDragAndDrop(
  this: DragAndDrop,
  dropPosition: DropPositionT
) {
  const ctr = getCtr(this);
  Insertion.get(ctr).insertItems({
    ...dropPosition,
    payload: Selection.get(ctr).items,
  });
}
