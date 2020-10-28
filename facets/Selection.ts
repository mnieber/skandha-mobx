import { observable } from "mobx";

import { data, input, operation, output, exec } from "facility";
import { lookUp, range } from "../internal/utils";
import { mapDatas } from "..";

export type ItemSelectedPropsT = {
  itemId: any;
  isShift?: boolean;
  isCtrl?: boolean;
};

export class Selection {
  @input selectableIds?: Array<any>;
  @data @observable ids: Array<any> = [];
  @data @observable anchorId: any;
  @output items?: Array<any>;

  @operation selectItem({ itemId, isShift, isCtrl }: ItemSelectedPropsT) {
    exec("selectItem");
  }

  static get = (ctr: any): Selection => ctr.selection;
}

export const initSelection = (self: Selection): Selection => {
  return self;
};

export function handleSelectItem(
  this: Selection,
  { itemId, isShift, isCtrl }: ItemSelectedPropsT
) {
  const hasItem = this.ids.includes(itemId);
  const selectableIds = this.selectableIds;

  if (!selectableIds) {
    throw Error("logical error");
  }

  if (isShift) {
    const startItemId = this.anchorId || itemId;
    const startIdx = selectableIds.indexOf(startItemId);
    const stopIdx = selectableIds.indexOf(itemId);
    const idxRange = range(
      Math.min(startIdx, stopIdx),
      1 + Math.max(startIdx, stopIdx)
    );
    this.ids = idxRange.map((idx) => selectableIds[idx]);
  } else if (isCtrl) {
    this.ids = hasItem
      ? this.ids.filter((x) => x !== itemId)
      : [...this.ids, itemId];
  } else {
    this.ids = [itemId];
  }

  // Move the anchor
  if (!(isCtrl && hasItem) && !(isShift && !!this.anchorId)) {
    this.anchorId = itemId;
  }
}

export const selectionActsOnItems = ([Collection, itemById]: any) =>
  mapDatas(
    [
      [Collection, itemById],
      [Selection, "ids"],
    ],
    [Selection, "items"],
    (itemById: any, ids: any) => lookUp(ids, itemById)
  );
