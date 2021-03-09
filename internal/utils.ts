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

export function isBefore(e: any): boolean {
  const boundingRect = e.target.getBoundingClientRect();
  const height = boundingRect.bottom - boundingRect.top;
  const isBefore = e.clientY - boundingRect.top < 0.5 * height;
  return isBefore;
}

export const zip = (arr: any, ...arrs: any) => {
  return arr.map((val: any, i: any) =>
    arrs.reduce((a: any, arr: any) => [...a, arr[i]], [val])
  );
};

export function getOrCreate(obj, key, fn) {
  if (!obj[key]) {
    obj[key] = fn();
  }
  return obj[key];
}
