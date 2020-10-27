import { mapData } from "..";
import { DragSourceT, Insertion } from "../facets/Insertion";
import { findMap } from "../internal/utils";
import { getPreview } from "../internal/getPreview";
import { ClassMemberT } from "facet/types";

type DragSourceFromCtr = (ctr: any) => DragSourceT;

export const createInsertionPreview = (
  dragSources: DragSourceFromCtr[],
  target: ClassMemberT
) =>
  mapData([Insertion, "inputItems"], target, (inputItems: any[]) => {
    const drag = findMap((dragSource) => dragSource(), dragSources);
    return drag
      ? getPreview(
          inputItems ?? [],
          drag.targetItemId,
          drag.isBefore,
          drag.payload
        )
      : inputItems;
  });
