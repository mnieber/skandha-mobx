import { observable } from "mobx";
import { operation } from "facet";

import { installHandlers } from "../lib/install";

type saveItemT = (values: any) => any;

export class Editing {
  @observable isEditing: boolean = false;

  @operation save(values: any) {}
  @operation cancel() {}
  @operation setIsEditing(flag: boolean) {}

  static get = (ctr: any): Editing => ctr.editing;
}

function _handleEditingCancel(this: Editing) {
  this.isEditing = false;
}

const _handleEditingSave = (saveItem: saveItemT) =>
  function (this: Editing, values: any) {
    this.isEditing = false;
    saveItem(values);
  };

function _handleEditingSetIsEditing(this: Editing, flag: boolean) {
  this.isEditing = flag;
}

interface PropsT {
  saveItem: saveItemT;
}

export const initEditing = (self: Editing, props: PropsT): Editing => {
  installHandlers(
    {
      cancel: _handleEditingCancel,
      save: _handleEditingSave(props.saveItem),
      setIsEditing: _handleEditingSetIsEditing,
    },
    self
  );
  return self;
};
