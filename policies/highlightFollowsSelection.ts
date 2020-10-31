import { Selection } from "../facets/Selection";
import { Highlight } from "../facets/Highlight";

export const highlightFollowsSelection = (ctr: any) => 
  function(this: Selection, { itemId, isShift, isCtrl }: any) {
      if (!isCtrl && !isShift) {
        Highlight.get(ctr).highlightItem(itemId);
      }
    }
  }

