import { observable } from "mobx";
import { data, operation, output } from "facility";
import { mapDatas } from "..";

export class Highlight {
  @data @observable id: string | undefined;
  @output item: any;

  @operation highlightItem(id: string) {
    this.id = id;
  }

  static get = (ctr: any): Highlight => ctr.highlight;
}

export const highlightActsOnItems = ([Collection, itemById]: any) =>
  mapDatas(
    [
      [Collection, itemById],
      [Highlight, "id"],
    ],
    [Highlight, "item"],
    (itemById: any, id: any) => itemById[id]
  );

export const initHighlight = (self: Highlight): Highlight => {
  return self;
};
