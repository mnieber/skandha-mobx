import { makeObservable, extendObservable, reaction } from "mobx";
import {
  getFacetMemberNames,
  facetClassName,
  get,
  ClassMemberT,
} from "facility";
import { symbols } from "./internal/symbols";
import { zip, getOrCreate } from "./internal/utils";
import { createPatch } from "./lib/patch";

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

export const mapData = (
  [fromFacetClass, fromMember]: ClassMemberT,
  [toFacetClass, toMember]: ClassMemberT,
  transform?: Function
) =>
  createPatch(toFacetClass, [fromFacetClass], (fromFacet: any) => ({
    get [toMember]() {
      // TODO: check that fromMember is found
      const data = fromFacet[fromMember];
      return transform ? transform(data) : data;
    },
  }));

export const mapDatas = (
  sources: Array<ClassMemberT>,
  [toFacetClass, toMember]: ClassMemberT,
  transform: Function
) => {
  const fromFacetClasses = sources.map((x) => x[0]);
  const fromMembers = sources.map((x) => x[1]);

  return createPatch(
    toFacetClass,
    fromFacetClasses,
    (...fromFacets: Array<any>) => ({
      get [toMember]() {
        const datas = zip(fromFacets, fromMembers).map(
          ([facet, member]: any) => {
            // TODO: check that fromMember is found
            return facet[member];
          }
        );
        return transform(...datas);
      },
    })
  );
};

export const makeCtrObservable = (ctr: any) => {
  getFacetMemberNames(ctr).forEach((facetName) => {
    const facet = ctr[facetName];
    try {
      makeObservable(facet);
    } catch {}
  });

  try {
    makeObservable(ctr);
  } catch {}

  getFacetMemberNames(ctr).forEach((facetName) => {
    const facet = ctr[facetName];
    const patches = getOrCreate(facet, symbols.patches, () => []);
    patches.forEach(({ members }) => {
      extendObservable(facet, members);
    });
  });

  const reactions = getOrCreate(ctr, symbols.reactions, () => []);
  reactions.forEach(({ collector, executor, options }) => {
    reaction(collector, executor, options);
  });
};

export const declareReaction = (
  ctr: any,
  collector: CallableFunction,
  executor: CallableFunction,
  options?: any
) => {
  const reactions = getOrCreate(ctr, symbols.reactions, () => []);
  reactions.push({ collector, executor, options });
};
