import { observable } from "mobx";
import { data, operation, output } from "facility";

import { patchFacet, mapData } from "..";

export class Filtering {
  @observable isEnabled: boolean = false;
  @observable filter: (x: any) => Array<any> = () => [];

  @data inputItems?: Array<any>;
  @output filteredItems?: Array<any>;

  @operation apply(filter: (x: any) => Array<any>) {
    this.filter = filter;
    this.isEnabled = true;
  }

  @operation setEnabled(flag: boolean) {
    this.isEnabled = flag;
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
