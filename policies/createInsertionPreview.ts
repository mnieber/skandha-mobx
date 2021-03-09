import { DragSourceT, Insertion } from "../facets/Insertion";
import { findMap } from "../internal/utils";
import { getPreview } from "../lib/getPreview";
import { ClassMemberT } from "facility";
import { createPatch } from "../lib/patch";

export const createInsertionPreview = (
  dragSources: DragSourceT[],
  [toFacetClass, toMember]: ClassMemberT
) =>
  createPatch(toFacetClass, [null], (ctr) => ({
    get [toMember]() {
      const drag = findMap((dragSource) => dragSource(ctr), dragSources);
      const inputItems = Insertion.get(ctr).inputItems;
      const preview = drag
        ? getPreview(
            inputItems ?? [],
            drag.targetItemId,
            drag.isBefore,
            drag.payload
          )
        : inputItems ?? [];
      return preview;
    },
  }));
