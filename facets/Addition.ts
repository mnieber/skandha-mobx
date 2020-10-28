import { observable } from "mobx";
import { operation, data } from "facet";

import { installHandlers } from "../lib/install";

export class Addition<ValueT = any> {
  @observable @data item: ValueT | undefined;
  @observable @data parentId: any;

  @operation add(values: any) {}
  @operation confirm() {}
  @operation cancel() {}

  static get = (ctr: any): Addition => ctr.addition;
}

function handleCancelNewItem(this: Addition) {
  this.item = undefined;
  this.parentId = undefined;
}

function handleConfirmNewItem(this: Addition) {
  this.item = undefined;
  this.parentId = undefined;
}

type CreateItemT = (values: any) => any;

const handleAddNewItem = (createItem: CreateItemT) =>
  function (this: Addition, values: any) {
    this.item = createItem(values);
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
