import { listen } from "facet";

import { Addition } from "../facets/Addition";
import { Filtering } from "../facets/Filtering";

export const filteringIsDisabledOnNewItem = (ctr: any) => {
  listen(Addition.get(ctr), "add", function () {
    Filtering.get(ctr).setEnabled(false);
  });
};
