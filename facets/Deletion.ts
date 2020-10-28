import { operation } from "facet";

import { installHandlers } from "../lib/install";

type deleteItemsT = (itemIds: string[]) => any;

export class Deletion {
  @operation delete(itemIds: string[]) {}

  static get = (ctr: any): Deletion => ctr.deletion;
}

const _handleDelete = (deleteItems: deleteItemsT) =>
  function (this: Deletion, itemIds: string[]) {
    deleteItems(itemIds);
  };

interface PropsT {
  deleteItems: deleteItemsT;
}

export const initDeletion = (self: Deletion, props: PropsT): Deletion => {
  installHandlers(
    {
      delete: _handleDelete(props.deleteItems),
    },
    self
  );
  return self;
};
