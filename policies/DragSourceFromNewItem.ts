import { Addition } from "../facets/Addition";

export const topOfTheList = "<topOfTheList>";

export const DragSourceFromNewItem = (ctr: any) => () => {
  const addition = Addition.get(ctr);
  return addition.item && addition.parentId
    ? {
        targetItemId: addition.parentId,
        payload: [addition.item],
        isBefore: false,
      }
    : undefined;
};
