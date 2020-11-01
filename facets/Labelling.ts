import { observable } from "mobx";
import { input, operation, exec } from "facet";
import { ClassMemberT } from "facet/types";

import { lookUp } from "../internal/utils";
import { mapDatas, relayData } from "..";

export type IdsByLabelT = { [label: string]: Array<any> };
export type ItemsByLabelT = { [label: string]: Array<any> };
export type LabelValueT = { label: string; id: any; flag: boolean };

export class Labelling {
  @observable idsByLabel: IdsByLabelT = {};
  ids = (label: string) => this.idsByLabel[label] || [];

  @input itemsByLabel?: ItemsByLabelT;

  @operation setLabel({ label, id, flag }: LabelValueT) {
    this.idsByLabel[label] = this.idsByLabel[label] || [];
    if (flag && !this.idsByLabel[label].includes(id)) {
      this.idsByLabel[label].push(id);
      exec("saveIds")(label, this.idsByLabel[label]);
    }
    if (!flag && this.idsByLabel[label].includes(id)) {
      this.idsByLabel[label] = this.idsByLabel[label].filter((x) => x !== id);
      exec("saveIds")(label, this.idsByLabel[label]);
    }
  }

  static get = (ctr: any): Labelling => ctr.labelling;
}

export const initLabelling = (self: Labelling): Labelling => {
  return self;
};

export const labellingActsOnItems = ([Collection, itemById]: any) => {
  return mapDatas(
    [
      [Collection, itemById],
      [Labelling, "idsByLabel"],
    ],
    [Labelling, "itemsByLabel"],
    (itemById: any, idsByLabel: any) =>
      Object.fromEntries(
        Object.entries(idsByLabel).map(([label, ids]) =>
          lookUp(ids as any, itemById)
        )
      )
  );
};

export const labellingReceivesIds = (
  [Collection, ids]: ClassMemberT,
  label: string,
  transform?: Function
) =>
  relayData(
    [Collection, ids],
    [Labelling, "idsByLabel"],
    transform,
    (ids: any, idsByLabel: any) => {
      idsByLabel[label] = ids;
    }
  );
