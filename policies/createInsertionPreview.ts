import { DragSourceT, Insertion } from "../facets/Insertion";
import { findMap } from "../internal/utils";
import { getPreview } from "../internal/getPreview";
import { ClassMemberT } from "facet/types";
import { createPatch } from "..";

type DragSourceFromCtr = (ctr: any) => DragSourceT;

export const createInsertionPreview = (
  dragSources: DragSourceFromCtr[],
  [toFacetClass, toMember]: ClassMemberT
) =>
  createPatch(toFacetClass, [null], (ctr) => ({
    get [toMember]() {
      const drag = findMap((dragSource) => dragSource(ctr)(), dragSources);
      const inputItems = Insertion.get(ctr).inputItems;
      const preview = drag
        ? getPreview(
            inputItems ?? [],
            drag.targetItemId,
            drag.isBefore,
            drag.payload
          )
        : inputItems;

      return preview;
    },
  }));
