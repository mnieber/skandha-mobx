import { listen } from "facet";

import { Addition } from "../facets/addition";

export const locationIsRestoredOnCancelNewItem = (
  storeLocation: Function,
  restoreLocation: Function
) => (ctr: any) => {
  listen(Addition.get(ctr), "add", () => {
    storeLocation();
  });
  listen(Addition.get(ctr), "cancel", () => restoreLocation());
};
