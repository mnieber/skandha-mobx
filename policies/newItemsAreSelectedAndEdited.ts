import { listen } from "facet";

import { Addition } from "../facets/Addition";
import { Editing } from "../facets/Editing";
import { Selection } from "../facets/Selection";

export const newItemsAreSelectedAndEdited = (ctr: any) => {
  listen(Addition.get(ctr), "add", function (data: any) {
    const selection = Selection.get(ctr);
    selection.selectItem({
      itemId: Addition.get(ctr).item.id,
    });
    Editing.get(ctr).setIsEditing(true);
  });
  listen(Addition.get(ctr), "cancel", function (data: any) {
    Editing.get(ctr).setIsEditing(false);
  });
};
