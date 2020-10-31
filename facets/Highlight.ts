import { observable } from "mobx";
import {
  data,
  operation,
  output,
  opAction,
  // installActions,
  installActions,
} from "facet";

import { mapDatas } from "..";

export class Highlight {
  @data @observable id: string | undefined;
  @data @observable bar: number | undefined;

  @output item: any;

  @operation highlightItem(id: string) {}
  @operation foo(x: number) {}

  static get = (ctr: any): Highlight => ctr.highlight;
}

export const _handleHighlight = opAction("Highlight.highlightItem")(function (
  this: Highlight,
  id: string
) {
  debugger;
  this.id = id;
});

export const _doIt = function (this: Highlight, id: string) {
  debugger;
  console.log("ID", id);
};

export const _handleFoo = opAction("Highlight.foo")(function (
  this: Highlight,
  x: number
) {
  this.bar = x;
});

export const initHighlight = (self: Highlight): Highlight => {
  installActions(self, {
    highlightItem: [_handleHighlight, _doIt],
    foo: [_handleFoo],
  });
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
