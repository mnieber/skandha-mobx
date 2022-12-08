import { action, computed, isAction, makeObservable, observable } from 'mobx';
import {
  getDataMemberNames,
  getFacetMemberNames,
  getOperationMemberNames,
} from 'skandha';
import { getAdmin } from '../internal/utils';

export const makeCtrObservable = (ctr: any) => {
  getFacetMemberNames(ctr).forEach((facetName) => {
    const facet = ctr[facetName];
    makeFacetObservable(facet);
    (getAdmin(facet).effects ?? []).forEach((f) => f());
  });

  try {
    makeObservable(ctr);
  } catch (e) {
    // We need to catch the case where ctr has no mobx annotations.
  }

  (getAdmin(ctr).effects ?? []).forEach((f) => f());
  return ctr;
};

export const makeFacetObservable = (facet: any) => {
  addActionsToFacet(facet);
  addObservablesAndComputedsToFacet(facet);
  try {
    makeObservable(facet);
  } catch (e) {
    // We need to catch the case where ctr has no mobx annotations.
  }
  return facet;
};

const addActionsToFacet = (facet: any) => {
  getOperationMemberNames(facet).forEach((opName) => {
    if (!isAction(facet[opName])) {
      facet[opName] = action(facet[opName]);
    }
  });
};

const addObservablesAndComputedsToFacet = (facet: any) => {
  getDataMemberNames(facet).forEach((dataMemberName) => {
    const descriptor =
      Object.getOwnPropertyDescriptor(facet, dataMemberName) ??
      Object.getOwnPropertyDescriptor(
        facet.constructor.prototype,
        dataMemberName
      );
    if (!descriptor || descriptor.get) {
      computed(facet, dataMemberName);
    } else {
      observable(facet, dataMemberName);
    }
  });
};

export const onMakeCtrObservable = (ctr: any, f) => {
  const ctrAdmin = getAdmin(ctr);
  ctrAdmin.effects = ctrAdmin.effects ?? [];
  ctrAdmin.effects.push(f);
};

export const onMakeFacetObservable = (facet: any, f) => {
  const facetAdmin = getAdmin(facet);
  facetAdmin.effects = facetAdmin.effects ?? [];
  facetAdmin.effects.push(f);
};
