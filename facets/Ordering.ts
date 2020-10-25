import { observable, computed } from "mobx";
import { data, input, output } from "facet";

import { findMap } from "../internal/utils";
import { getPreview } from "../internal/getPreview";

import { mapData, patchFacet } from "..";

export class DragSource<PropsT> {
  props: PropsT;

  constructor(props: PropsT) {
    this.props = props;
  }

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

export class Ordering {
  @computed @data get drag() {
    const drag = findMap((plSrc: any) => plSrc.drag, this.dragSources);
    return drag;
  }

  @observable @input dragSources: DragSource<any>[] = [];
  @observable @input inputItems?: Array<any>;
  @observable @output preview?: Array<any>;

  static get = (ctr: any): Ordering => ctr.ordering;
}

const _handleGetPreview = (self: Ordering) => {
  patchFacet(self, {
    get preview() {
      return self.drag && self.drag?.position
        ? getPreview(
            self.inputItems ?? [],
            self.drag?.position.targetItemId,
            self.drag?.position.isBefore,
            self.drag.payload.data
          )
        : self.inputItems;
    },
  });
};

export const initOrdering = (self: Ordering) => {
  _handleGetPreview(self);
  return self;
};

export const orderingActsOnItems = ([Collection, items]: any) =>
  mapData([Collection, items], [Ordering, "inputItems"]);
