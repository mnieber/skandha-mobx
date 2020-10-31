import { observable } from "mobx";
import { data, operation, output, opAction } from "facet";
import { mapDatas } from "..";

export class Highlight {
  @data @observable id: string | undefined;
  @data @observable bar: number | undefined;

  @output item: any;

  @operation highlightItem(id: string) {}

  static get = (ctr: any): Highlight => ctr.highlight;
}

export const handleHighlightItem = opAction("Highlight.highlightItem")(
  function (this: Highlight, id: string) {
    this.id = id;
  }
);

export const highlightActsOnItems = ([Collection, itemById]: any) =>
  mapDatas(
    [
      [Collection, itemById],
      [Highlight, "id"],
    ],
    [Highlight, "item"],
    (itemById: any, id: any) => itemById[id]
  );
