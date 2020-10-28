import { observable } from "mobx";
import { data, operation, output } from "facet";

import { installHandlers } from "../lib/install";
import { mapDatas } from "..";

export class Highlight {
  @data @observable id: any;

  @output item: any;

  @operation highlightItem(id: any) {}

  static get = (ctr: any): Highlight => ctr.highlight;
}

function _handleHighlight2(this: Highlight, id: any) {
  this.id = id;
}

// const _handleHighlight = (self: Highlight) => (id: any) => {
//   self.id = id;
// };

export const initHighlight = (self: Highlight): Highlight => {
  installHandlers(
    {
      highlightItem: _handleHighlight2,
    },
    self
  );
  return self;
};

export const highlightActsOnItems = ([Collection, itemById]: any) =>
  mapDatas(
    [
      [Collection, itemById],
      [Highlight, "id"],
    ],
    [Highlight, "item"],
    (itemById: any, id: any) => itemById[id]
  );
