import { listen } from "facet";

import { Editing } from "../facets/editing";
import { Addition } from "../facets/addition";

export const newItemsAreConfirmedWhenSaved = (ctr: any) => {
  listen(Editing.get(ctr), "save", function (item: any) {
    const addition = Addition.get(ctr);
    if (item.id === undefined) {
      throw Error("No id in item");
    }
    if (addition.item && item.id === addition.item.id) {
      Addition.get(ctr).confirm();
    }
  });
  listen(Editing.get(ctr), "cancel", function () {
    if (Addition.get(ctr).item) {
      Addition.get(ctr).cancel();
    }
  });
};
