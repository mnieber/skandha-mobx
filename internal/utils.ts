export function lookUp(keys: Array<any>, obj: any): Array<any> {
  return keys.map((x) => obj[x]);
}

export function range(start: number, stop: number) {
  var ans: number[] = [];
  for (let i = start; i < stop; i++) {
    ans.push(i);
  }
  return ans;
}

export const findMap = (f: Function, items: any[]) => {
  for (var item of items) {
    const mapped = f(item);
    if (mapped) {
      return mapped;
    }
  }
  return undefined;
};