import { listen } from "facet";

import { Addition } from "../facets/addition";
import { Filtering } from "../facets/filtering";

export const filteringIsDisabledOnNewItem = (ctr: any) => {
  listen(Addition.get(ctr), "add", function () {
    Filtering.get(ctr).setEnabled(false);
  });
};
