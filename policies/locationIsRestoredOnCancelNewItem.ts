import { listen } from "facet";

import { Addition } from "../facets/Addition";

export const locationIsRestoredOnCancelNewItem = (
  storeLocation: Function,
  restoreLocation: Function
) => (ctr: any) => {
  listen(Addition.get(ctr), "add", () => {
    storeLocation();
  });
  listen(Addition.get(ctr), "cancel", () => restoreLocation());
};
