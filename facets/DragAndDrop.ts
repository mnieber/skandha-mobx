import { observable, computed } from "mobx";
import { data, input, output, operation } from "facet";

import { findMap } from "../internal/utils";
import { getPreview } from "../internal/getPreview";

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

const _handleGetPreview = (self: DragAndDrop) => {
  patchFacet(self, {
    get preview() {
      const dropPosition = self.drag?.position ?? self.hoverPosition;
      return self.drag && dropPosition
        ? getPreview(
            self.inputItems ?? [],
            dropPosition.targetItemId,
            dropPosition.isBefore,
            self.drag?.payload.data
          )
        : self.inputItems;
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
