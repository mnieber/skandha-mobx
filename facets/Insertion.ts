import { observable } from "mobx";
import { input, operation, exec } from "facet";
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
  @operation insertItems(drag: DragT) {
    if (this.inputItems) {
      const preview: Array<any> = getPreview(
        this.inputItems,
        drag.targetItemId,
        drag.isBefore,
        drag.payload
      );
      exec("insertItems")(preview);
    }
  }

  static get = (ctr: any): Insertion => ctr.insertion;
}

export const initInsertion = (self: Insertion) => {
  return self;
};

export const insertionActsOnItems = ([Collection, items]: any) =>
  mapData([Collection, items], [Insertion, "inputItems"]);
