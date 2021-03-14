import { observable, action, makeObservable, computed } from "mobx";
import {
  getFacetMemberNames,
  getDataMemberNames,
  getPatchedMemberNames,
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
    observableMembers[dataMemberName] = observable;
  });

  const patchedMemberNames = getPatchedMemberNames(facet);
  patchedMemberNames.forEach((memberName) => {
    observableMembers[memberName] = computed;
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
