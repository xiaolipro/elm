/**
 * 解析url参数
 * @example ?id=123&a=b
 * @return Object {id:123,a:b}
 */

export function urlParse() {
  let url = window.location.search;
  let res = {};
  let regex = /[?&][^?&]+=[^?&]+/g; // g:全局匹配
  let array = url.match(regex) // ['?id=123', '&a=b]

  if (array) {
    array.forEach((item) => {
      let tmp = item.substring(1).split('='); // ['id', '123']
      let key = decodeURIComponent(tmp[0]);
      let val = tmp[1];
      res[key] = val
    })
  }

  return res;
}
