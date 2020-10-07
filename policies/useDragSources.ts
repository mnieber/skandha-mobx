import { DragSource, DragAndDrop } from "../facets/DragAndDrop";

export const useDragSources = (dragSources: DragSource<any>[]) => (
  ctr: any
) => {
  dragSources.forEach((dragSource) => dragSource.install(ctr));
  DragAndDrop.get(ctr).dragSources = dragSources;
};
