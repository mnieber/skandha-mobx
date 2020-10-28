import { action } from "mobx";
import { handle } from "facet";

export function installHandlers(
  handlers: { [handlerName: string]: Function },
  facet: any
) {
  Object.entries(handlers).forEach(([k, v]) => {
    handle(facet, k, action(v.bind(facet)));
  });
}
