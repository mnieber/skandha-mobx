import { observable } from "mobx";
import { operation, data } from "facet";

import { installHandlers } from "../lib/install";

export class Addition {
  @observable @data item: any;
  @observable @data parentId: any;

  @operation add(values: any) {}
  @operation confirm() {}
  @operation cancel() {}

  static get = (ctr: any): Addition => ctr.addition;
}

const handleCancelNewItem = (self: Addition) => () => {
  self.item = undefined;
  self.parentId = undefined;
};

const handleConfirmNewItem = (self: Addition) => () => {
  self.item = undefined;
  self.parentId = undefined;
};

type CreateItemT = (values: any) => any;

const handleAddNewItem = (createItem: CreateItemT) => (self: Addition) => (
  values: any
) => {
  self.item = createItem(values);
};

interface PropsT {
  createItem: CreateItemT;
}

export const initAddition = (self: Addition, props: PropsT): Addition => {
  installHandlers(
    {
      add: handleAddNewItem(props.createItem),
      cancel: handleCancelNewItem,
      confirm: handleConfirmNewItem,
    },
    self
  );
  return self;
};
