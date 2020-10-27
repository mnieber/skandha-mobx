import { observable } from "mobx";
import { input, operation } from "facet";
import { installHandlers } from "../lib/install";
import { getPreview } from "../internal/getPreview";
import { mapData } from "..";

export type DragSourceT = (ctr: any) => DragT | undefined;

export type DragT = {
  payload: any;
  isBefore: boolean;
  targetItemId: string;
};

export class Insertion {
  @observable @input inputItems?: Array<any>;
  @operation insertItems(drag: DragT) {}

  static get = (ctr: any): Insertion => ctr.insertion;
}

type InsertItemsT = (drag: DragT, preview: any[]) => any;

const _handleInsertItems = (insertItems: InsertItemsT) => (self: Insertion) => {
  return (drag: DragT) => {
    if (self.inputItems) {
      const preview = getPreview(
        self.inputItems,
        drag.targetItemId,
        drag.isBefore,
        drag.payload
      );
      insertItems(drag, preview);
    }
  };
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
