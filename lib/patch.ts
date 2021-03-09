import { symbols } from "../internal/symbols";
import { facetName, isDataMember, get } from "facility";
import { getOrCreate, zip } from "../internal/utils";

export function patchFacet(facet: any, members: any) {
  const facetClass = facet.constructor;

  for (const prop in members) {
    if (!prop.startsWith("_")) {
      if (!isDataMember(facetClass, prop)) {
        console.error(
          `Patching a property ${prop} that wasn't decorated with ` +
            `@data, @input or @output in ${facetName(facet)}`
        );
      }
    }

    delete facet[prop];
  }

  // We have to apply the patch after makeObservable was called in
  // makeCtrObservable, so therefore we now only store the patch
  const patches = getOrCreate(facet, symbols.patches, () => []);
  patches.push({ members });
}

export function createPatch(
  patchedFacetClass: any,
  otherFacetClasses: Array<any>,
  callback: (...x: any) => any
) {
  return (ctr: any) => {
    const otherFacets = otherFacetClasses.map((facetClass) =>
      facetClass ? get(facetClass, ctr) : ctr
    );
    // @ts-ignore
    const patch = callback.bind(this)(...otherFacets);

    if (patch && patchedFacetClass) {
      patchFacet(get(patchedFacetClass, ctr), patch);
    }
  };
}

export function createPatches(
  patchedFacetClasses: Array<any>,
  otherFacetClasses: Array<any>,
  callback: (...x: any) => Array<any>
) {
  return (ctr: any) => {
    const patchedFacets = patchedFacetClasses.map((facetClass) =>
      get(facetClass, ctr)
    );
    const otherFacets = otherFacetClasses.map((facetClass) =>
      facetClass ? get(facetClass, ctr) : ctr
    );
    const patches = callback(...otherFacets);

    console.assert(patchedFacets.length === patches.length);

    zip(patchedFacets, patches).forEach(([facet, patch]: any) => {
      patchFacet(facet, patch);
    });
  };
}
