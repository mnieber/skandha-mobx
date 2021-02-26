import { getCtr } from "facility";

import { Addition } from "../facets/Addition";
import { Filtering } from "../facets/Filtering";

export function filteringIsDisabledOnNewItem(facet: Addition) {
  const ctr = getCtr(facet);
  Filtering.get(ctr).setEnabled(false);
}
