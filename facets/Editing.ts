import { observable } from "mobx";
import { operation, exec } from "facet";

export class Editing {
  @observable isEditing: boolean = false;

  @operation save(values: any) {
    exec("saveItem");
    this.setIsEditing(false);
  }
  @operation cancel() {
    this.setIsEditing(false);
  }
  @operation setIsEditing(flag: boolean) {
    this.isEditing = flag;
  }

  static get = (ctr: any): Editing => ctr.editing;
}

export const initEditing = (self: Editing): Editing => {
  return self;
};
