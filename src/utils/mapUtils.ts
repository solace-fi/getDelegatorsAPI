// https://2ality.com/2015/08/es6-map-json.html

export function strMapToObj(strMap: Map<string, string>) {
  const obj = Object.create(null);
  for (const [k, v] of strMap) {
    // We don’t escape the key '__proto__'
    // which can cause problems on older engines
    obj[k] = v;
  }
  return obj;
}

export function objToStrMap(obj: { [key: string]: string }) {
  const strMap = new Map();
  for (const k of Object.keys(obj)) {
    strMap.set(k, obj[k]);
  }
  return strMap;
}
