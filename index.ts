import { observable, action, makeObservable, computed, reaction } from "mobx";
import {
  getFacetMemberNames,
  getDataMemberNames,
  getPatchedMemberNames,
  facetClassName,
  get,
  ClassMemberT,
  getOperationMemberNames,
} from "facility";

export const relayData = (
  [fromFacetClass, fromMember]: ClassMemberT,
  [toFacetClass, toMember]: ClassMemberT,
  transform?: Function,
  setter?: Function
) => (ctr: any) =>
  reaction(
    () => get(fromFacetClass, ctr)[fromMember],
    (data) => {
      const result = transform ? transform(data) : data;
      if (setter) {
        setter(result, get(toFacetClass, ctr)[toMember]);
      } else {
        get(toFacetClass, ctr)[toMember] = result;
      }
    },
    {
      name: `relayData from ${facetClassName(
        fromFacetClass
      )}.${fromMember} to ${facetClassName(toFacetClass)}.${toMember}`,
    }
  );

export const relayDatas = (
  sources: Array<ClassMemberT>,
  [toFacetClass, toMember]: ClassMemberT,
  transform: Function,
  setter?: Function
) => (ctr: any) =>
  reaction(
    () =>
      sources.map(
        ([fromFacetClass, fromMember]) => get(fromFacetClass, ctr)[fromMember]
      ),
    (datas) => {
      const result = transform(...datas);
      if (setter) {
        setter(result, get(toFacetClass, ctr)[toMember]);
      } else {
        get(toFacetClass, ctr)[toMember] = result;
      }
    }
  );

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
