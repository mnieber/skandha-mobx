import { symbols } from "./symbols";

export function getOrCreate(obj, key, fn) {
  if (!obj[key]) {
    obj[key] = fn();
  }
  return obj[key];
}

export const getAdmin = (obj) => {
  return getOrCreate(obj, symbols.admin, () => ({}));
};
