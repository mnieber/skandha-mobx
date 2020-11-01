import { getCtr } from "facet";

import { Filtering } from "../facets/Filtering";
import { Highlight } from "../facets/Highlight";

function findNeighbourIdx(
  filteredItems: Array<any>,
  allItems: Array<any>,
  beginIndex: number,
  endIndex: number,
  step: number
) {
  for (var idx = beginIndex; idx !== endIndex; idx += step) {
    if (filteredItems.includes(allItems[idx])) {
      return { result: idx };
    }
  }
  return undefined;
}

export function highlightIsCorrectedOnFilterChange(this: Filtering) {
  const ctr = getCtr(this);
  if (this.isEnabled) {
    const highlight = Highlight.get(ctr).id;
    const inputItems = this.inputItems;
    const filteredItemIds = (this.filteredItems ?? []).map((x) => x.id);
    const inputIds = (inputItems || []).map((x) => x.id);

    if (
      highlight &&
      inputIds.includes(highlight) &&
      !filteredItemIds.includes(highlight)
    ) {
      console.log("Correcting bad highlight", highlight);
      const highlightedItemIdx = inputIds.indexOf(highlight);
      const newIdx =
        findNeighbourIdx(
          filteredItemIds,
          inputIds,
          highlightedItemIdx,
          inputIds.length,
          1
        ) ||
        findNeighbourIdx(filteredItemIds, inputIds, highlightedItemIdx, -1, -1);

      if (newIdx) {
        Highlight.get(ctr).highlightItem(inputIds[newIdx.result]);
      }
    }
  }
}
