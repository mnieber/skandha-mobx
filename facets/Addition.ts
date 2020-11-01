import { observable } from "mobx";
import { operation, data, exec } from "facet";

export class Addition<ValueT = any> {
  @observable @data item: ValueT | undefined;
  @observable @data parentId: any;

  @operation add(values: any) {
    this.item = exec("createItem");
  }
  @operation confirm() {
    this._reset();
  }
  @operation cancel() {
    this._reset();
  }

  _reset() {
    this.item = undefined;
    this.parentId = undefined;
  }

  static get = (ctr: any): Addition => ctr.addition;
}
