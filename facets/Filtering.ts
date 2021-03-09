import { action, observable } from "mobx";
import { data, operation, output } from "facility";
import { host, stub } from "aspiration";

import { mapData } from "..";
import { patchFacet } from "../lib/patch";

type FilterT = (x: any) => Array<any>;

export class Filtering_apply {
  filter: FilterT = stub();
}

export class Filtering_setEnabled {
  flag: boolean = stub();
}

export class Filtering {
  @observable isEnabled: boolean = false;
  @observable filter: FilterT = () => [];

  @data inputItems?: Array<any>;
  @output filteredItems?: Array<any>;

  @operation @host apply(filter: FilterT) {
    return action((cbs: Filtering_apply) => {
      this.filter = filter;
      this.isEnabled = true;
    });
  }

  @operation @host setEnabled(flag: boolean) {
    return action((cbs: Filtering_setEnabled) => {
      this.isEnabled = flag;
    });
  }

  static get = (ctr: any): Filtering => ctr.filtering;
}

const _handleFiltering = (self: Filtering) => {
  patchFacet(self, {
    get filteredItems() {
      const isEnabled = this.isEnabled;
      const filter = this.filter;
      return filter && isEnabled
        ? this.filter(this.inputItems)
        : this.inputItems;
    },
  });
};

export const initFiltering = (self: Filtering): Filtering => {
  _handleFiltering(self);
  return self;
};

export const filteringActsOnItems = ([Collection, items]: any) =>
  mapData([Collection, items], [Filtering, "inputItems"]);
