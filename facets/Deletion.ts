import { operation, exec } from "facet";

export class Deletion {
  @operation delete(itemIds: string[]) {
    exec("deleteItems");
  }

  static get = (ctr: any): Deletion => ctr.deletion;
}

export const initDeletion = (self: Deletion): Deletion => {
  return self;
};
