import { observable } from "mobx";
import { input, operation } from "facet";
import { installHandlers } from "../lib/install";
import { getPreview } from "../internal/getPreview";
import { mapData } from "..";

export type DragSourceT = (ctr: any) => DragT | undefined;

export type DropPositionT = {
  isBefore: boolean;
  targetItemId: string;
};

export type DragT = DropPositionT & {
  payload: any;
};

export class Insertion {
  @observable @input inputItems?: Array<any>;
  @operation insertItems(drag: DragT) {}

  static get = (ctr: any): Insertion => ctr.insertion;
}

type InsertItemsT = (drag: DragT, preview: any[]) => any;

const _handleInsertItems = (insertItems: InsertItemsT) =>
  function (this: Insertion, drag: DragT) {
    debugger;
    if (this.inputItems) {
      const preview = getPreview(
        this.inputItems,
        drag.targetItemId,
        drag.isBefore,
        drag.payload
      );
      insertItems(drag, preview);
    }
  };

interface PropsT {
  insertItems: InsertItemsT;
}

export const initInsertion = (self: Insertion, props: PropsT) => {
  installHandlers({ insertItems: _handleInsertItems(props.insertItems) }, self);
  return self;
};

export const insertionActsOnItems = ([Collection, items]: any) =>
  mapData([Collection, items], [Insertion, "inputItems"]);
