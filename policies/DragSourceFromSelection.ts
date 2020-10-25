import { computed } from "mobx";
import { DragSource, DragT } from "../facets/DragAndDrop";
import { Selection } from "../facets/Selection";

interface PropsT {
  showPreview: boolean;
}

export class DragSourceFromSelection extends DragSource<PropsT> {
  ctr: any;

  install(ctr: any) {
    this.ctr = ctr;
  }

  @computed get drag(): DragT | undefined {
    const items = Selection.get(this.ctr).items ?? [];

    return items.length
      ? {
          payload: {
            data: items,
            showPreview: this.props.showPreview,
          },
          position: undefined, // use hover position
        }
      : undefined;
  }
}
