import { DragSourceT, Insertion } from "../facets/Insertion";

type DragSourceFromCtr = (ctr: any) => DragSourceT;

export const insertionPreviewUsesDragSources = (
  dragSources: DragSourceFromCtr[]
) => (ctr: any) => {
  Insertion.get(ctr).dragSources = dragSources.map((x) => x(ctr));
};
