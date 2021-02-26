import { observable } from "mobx";
import { data, operation, output } from "facility";
import { mapDatas } from "..";
import { host, stub } from "aspiration";

export class Highlight_highlightItem {
  id: string = stub();
}

export class Highlight {
  @data @observable id: string | undefined;
  @output item: any;

  @operation @host highlightItem(id: string) {
    return (cbs: Highlight_highlightItem) => {
      this.id = id;
    };
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
