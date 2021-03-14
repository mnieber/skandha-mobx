import { reaction } from "mobx";
import { facetClassName, get, ClassMemberT } from "facility";

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
