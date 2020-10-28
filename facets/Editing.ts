import { observable } from "mobx";
import { operation, exec } from "facility";

export class Editing {
  @observable isEditing: boolean = false;

  @operation save(values: any) {
    exec("saveItem");
    this.isEditing = false;
  }
  @operation cancel() {
    this.isEditing = false;
  }
  @operation enable() {
    this.isEditing = true;
  }

  static get = (ctr: any): Editing => ctr.editing;
}

export const initEditing = <T extends Editing>(self: T): T => {
  return self;
};
