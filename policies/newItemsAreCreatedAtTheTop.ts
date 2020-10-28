import { listen } from "facet";

import { Addition } from "../facets/Addition";
import { topOfTheList } from "../internal/getPreview";

export const newItemsAreCreatedAtTheTop = (ctr: any) => {
  listen(
    Addition.get(ctr),
    "add",
    function (data: any) {
      Addition.get(ctr).parentId = topOfTheList;
    },
    { after: false }
  );
};
