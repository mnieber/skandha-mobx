import { observable } from "mobx";
import { operation, data, exec } from "facet";

export class Addition<ValueT = any> {
  @observable @data item: ValueT | undefined;
  @observable @data parentId: any;

  @operation add(values: any) {
    this.item = exec("createItem");
  }
  @operation confirm() {
    exec("confirm");
    exec("reset");
  }
  @operation cancel() {
    exec("reset");
  }

  static get = (ctr: any): Addition => ctr.addition;
}

export function handleResetNewItem(this: Addition) {
  this.item = undefined;
  this.parentId = undefined;
}
