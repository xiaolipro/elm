export function saveToLocal(id, key, val) {
  let seller = window.localStorage.__seller__;
  if (!seller) {
    seller = {};
    seller[id] = {};
    seller[id][key] = val;
  } else {
    seller = JSON.parse(seller);
    if (!seller[id]) {
      seller[id] = {};
    }
    seller[id][key] = val
  }
  localStorage.__seller__ = JSON.stringify(seller)
}

export function loadFromLocal(id, key, def = false) {
  let seller = localStorage.__seller__;
  if (!seller) return def;
  seller = JSON.parse(seller)[id];
  if (!seller) return def;
  let res = seller[key];
  return res || def;
}
