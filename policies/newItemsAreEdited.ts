import { listen } from "facet";

import { Addition } from "../facets/Addition";
import { Editing } from "../facets/Editing";

export const newItemsAreEdited = (ctr: any) => {
  listen(Addition.get(ctr), "add", function (data: any) {
    Editing.get(ctr).setIsEditing(true);
  });
  listen(Addition.get(ctr), "cancel", function (data: any) {
    Editing.get(ctr).setIsEditing(false);
  });
};
