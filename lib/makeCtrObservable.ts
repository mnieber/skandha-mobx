import {
  autorun,
  observable,
  action,
  makeObservable,
  computed,
  isObservableProp,
  isComputedProp,
} from "mobx";
import {
  getFacetMemberNames,
  getDataMemberNames,
  getOperationMemberNames,
} from "facility";

export const makeCtrObservable = (ctr: any) => {
  getFacetMemberNames(ctr).forEach((facetName) => {
    const facet = ctr[facetName];
    try {
      makeFacetObservable(facet);
    } catch {}
  });

  try {
    makeObservable(ctr);
  } catch {}
};

export const makeFacetObservable = (facet: any) => {
  addActionsToFacet(facet);
  try {
    makeObservable(facet);
  } catch {}

  const observableMembers = {};
  getDataMemberNames(facet).forEach((dataMemberName) => {
    if (
      !isObservableProp(facet, dataMemberName) &&
      !isComputedProp(facet, dataMemberName)
    ) {
      const descriptor =
        Object.getOwnPropertyDescriptor(facet, dataMemberName) ??
        Object.getOwnPropertyDescriptor(
          facet.constructor.prototype,
          dataMemberName
        );
      observableMembers[dataMemberName] =
        !descriptor || descriptor.get ? computed : observable;
    }
  });

  try {
    makeObservable(facet, observableMembers);
  } catch {}
};

const addActionsToFacet = (facet: any) => {
  getOperationMemberNames(facet).forEach((opName) => {
    facet[opName] = action(facet[opName]);
  });
};
