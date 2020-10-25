import { listen } from "facet";
import { computed } from "mobx";
import { DragAndDrop, DragSource, DragT } from "../facets/DragAndDrop";
import { Addition } from "../facets/Addition";

export const topOfTheList = "<topOfTheList>";

interface PropsT {
  showPreview: boolean;
  performDropOnConfirmNewItem?: boolean;
}

export class DragSourceFromNewItem extends DragSource<PropsT> {
  ctr: any;

  install(ctr: any) {
    this.ctr = ctr;

    if (!!this.props.performDropOnConfirmNewItem) {
      listen(Addition.get(ctr), "confirm", () => DragAndDrop.get(ctr).drop(), {
        after: false,
      });
    }
  }

  @computed get drag(): DragT | undefined {
    const parentId = Addition.get(this.ctr).parentId;
    const item = Addition.get(this.ctr).item;
    return item && parentId
      ? {
          payload: {
            data: [item],
            showPreview: this.props.showPreview,
          },
          position: {
            targetItemId: parentId === topOfTheList ? undefined : parentId,
            isBefore: false,
          },
        }
      : undefined;
  }
}
