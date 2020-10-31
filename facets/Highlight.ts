import { observable } from "mobx";
import { data, operation, output } from "facet";
import { mapDatas } from "..";

export class Highlight {
  @data @observable id: string | undefined;
  @data @observable bar: number | undefined;

  @output item: any;

  @operation highlightItem(id: string) {}

  static get = (ctr: any): Highlight => ctr.highlight;
}

export function handleHighlightItem(this: Highlight, id: string) {
  this.id = id;
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
