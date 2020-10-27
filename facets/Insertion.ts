import { observable } from "mobx";
import { input, output, data, operation } from "facet";
import { patchFacet } from "facet-mobx";
import { installHandlers } from "../lib/install";
import { getPreview } from "../internal/getPreview";
import { mapData } from "..";
import { findMap } from "../internal/utils";

export type DragSourceT = (ctr: any) => DragT | undefined;

export type DragT = {
  payload: any;
  isBefore: boolean;
  targetItemId: string;
};

export class Insertion {
  @observable @input inputItems?: Array<any>;
  @observable @data dragSources: DragSourceT[] = [];
  @observable @output preview?: Array<any>;

  @operation insertItems(drag: DragT) {}

  static get = (ctr: any): Insertion => ctr.insertion;
}

type InsertItemsT = (drag: DragT, preview: any[]) => any;

const _handleInsertItems = (insertItems: InsertItemsT) => (self: Insertion) => (
  drag: DragT
) => {
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

const _handleGetPreview = (self: Insertion) => {
  patchFacet(self, {
    get preview() {
      const drag = findMap((dragSource) => dragSource(), this.dragSources);

      return drag
        ? getPreview(
            self.inputItems ?? [],
            drag.targetItemId,
            drag.isBefore,
            drag.payload
          )
        : self.inputItems;
    },
  });
};

interface PropsT {
  insertItems: InsertItemsT;
}

export const initInsertion = (self: Insertion, props: PropsT) => {
  installHandlers({ insertItems: _handleInsertItems(props.insertItems) }, self);
  _handleGetPreview(self);
  return self;
};

export const insertionActsOnItems = ([Collection, items]: any) =>
  mapData([Collection, items], [Insertion, "inputItems"]);
