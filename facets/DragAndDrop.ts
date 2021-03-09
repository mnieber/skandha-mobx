import { action, observable, runInAction } from "mobx";
import { operation } from "facility";
import { DropPositionT } from "./Insertion";
import { isBefore } from "../internal/utils";
import { host, stub } from "aspiration";

export class DragAndDrop_drop {
  dropPosition: DropPositionT = stub();
  drop() {}
}

export class DragAndDrop {
  @observable hoverPosition?: DropPositionT;
  @operation @host drop(dropPosition: DropPositionT) {
    return action((cbs: DragAndDrop_drop) => {
      cbs.drop();
    });
  }

  handle(itemId: any) {
    return {
      draggable: true,
      onDragStart: () => {},
      onDragOver: (e: any) => {
        e.preventDefault();
        runInAction(() => {
          this.hoverPosition = {
            targetItemId: itemId,
            isBefore: isBefore(e),
          };
        });
      },
      onDragEnd: () => {
        this.hoverPosition = undefined;
      },
      onDrop: () => {
        if (this.hoverPosition) {
          this.drop(this.hoverPosition);
          this.hoverPosition = undefined;
        }
      },
    };
  }

  static get = (ctr: any): DragAndDrop => ctr.dragAndDrop;
}

export function initDragAndDrop(self: DragAndDrop): DragAndDrop {
  return self;
}
