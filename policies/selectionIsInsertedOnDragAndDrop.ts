import { getCtr } from "facility";

import { Insertion, DropPositionT } from "../facets/Insertion";
import { DragAndDrop } from "../facets/DragAndDrop";
import { Selection } from "../facets/Selection";

export function selectionIsInsertedOnDragAndDrop(
  facet: DragAndDrop,
  dropPosition: DropPositionT
) {
  const ctr = getCtr(facet);
  Insertion.get(ctr).insertItems({
    ...dropPosition,
    payload: Selection.get(ctr).items,
  });
}
