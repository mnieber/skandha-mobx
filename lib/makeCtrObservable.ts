import { getAdmin } from "../internal/utils";

import {
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
    (getAdmin(facet).effects ?? []).forEach((f) => f());
  });

  try {
    makeObservable(ctr);
  } catch {}

  (getAdmin(ctr).effects ?? []).forEach((f) => f());
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

export const onMakeCtrObservable = (ctr: any, f) => {
  const ctrAdmin = getAdmin(ctr);
  const effects = (ctrAdmin.effects = ctrAdmin.effects ?? []);
  effects.push(f);
};

export const onMakeFacetObservable = (facet: any, f) => {
  const facetAdmin = getAdmin(facet);
  const effects = (facetAdmin.effects = facetAdmin.effects ?? []);
  effects.push(f);
};
