import { getCtr } from "facility";

import { Addition } from "../facets/Addition";
import { Filtering } from "../facets/Filtering";

export function filteringIsDisabledOnNewItem(this: Addition) {
  const ctr = getCtr(this);
  Filtering.get(ctr).setEnabled(false);
}
