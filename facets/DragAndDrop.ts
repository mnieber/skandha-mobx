import { observable, computed } from "mobx";
import { data, input, output, operation } from "facet";

import { findMap } from "../internal/utils";

import { mapData, patchFacet, relayDatas } from "..";

export class DragSource<PropsT> {
  props: PropsT;

  constructor(props: PropsT) {
    this.props = props;
  }

  install(ctr: any) {}

  get drag(): DragT | undefined {
    return undefined;
  }
}

export type DragT = {
  payload: PayloadT;
  position?: DropPositionT;
};

export type DropPositionT = {
  targetItemId: any;
  isBefore: boolean;
};

export type PayloadT = {
  showPreview: boolean;
  data: any;
};

export class DragAndDrop {
  @computed @data get drag() {
    const drag = findMap((plSrc: any) => plSrc.drag, this.dragSources);
    return drag;
  }

  @observable @input dragSources: DragSource<any>[] = [];
  @observable @input inputItems?: Array<any>;
  @observable @output preview?: Array<any>;
  @observable @data hoverPosition?: DropPositionT;

  @operation drop() {}
  @operation cancel() {}

  static get = (ctr: any): DragAndDrop => ctr.dragAndDrop;
}

function _getPreview(
  items: Array<any>,
  targetItemId: any,
  isBefore: boolean,
  payload: Array<any>
): Array<any> {
  return !payload.length
    ? items
    : items.reduce(
        (acc, item) => {
          if (item.id === targetItemId && isBefore) {
            acc.push(...payload);
          }
          if (!payload.find((x) => x.id === item.id)) {
            acc.push(item);
          }
          if (item.id === targetItemId && !isBefore) {
            acc.push(...payload);
          }
          return acc;
        },
        targetItemId ? [] : [...payload]
      );
}

export function getPreview(
  inputItems: Array<any>,
  dropPosition?: DropPositionT,
  payload?: PayloadT
) {
  return inputItems && payload && dropPosition
    ? _getPreview(
        inputItems,
        dropPosition.targetItemId,
        dropPosition.isBefore,
        payload.data
      )
    : inputItems;
}

const _handleGetPreview = (self: DragAndDrop) => {
  patchFacet(self, {
    get preview() {
      const result = self.drag?.payload
        ? getPreview(
            self.inputItems ?? [],
            self.drag?.position ?? self.hoverPosition,
            self.drag?.payload
          )
        : self.inputItems;
      return result;
    },
  });
};

export const initDragAndDrop = (self: DragAndDrop) => {
  _handleGetPreview(self);
  return self;
};

export const dragAndDropActsOnItems = ([Collection, items]: any) =>
  mapData([Collection, items], [DragAndDrop, "inputItems"]);

export const draggingCreatesThePreview = ({
  preview: [Collection, previewMember],
}: any) =>
  relayDatas(
    [
      [DragAndDrop, "inputItems"],
      [DragAndDrop, "preview"],
      [DragAndDrop, "drag"],
    ],
    [Collection, previewMember],
    (inputItems, preview, drag: DragT) => {
      return drag?.payload.showPreview ? preview : inputItems;
    }
  );
