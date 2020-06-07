export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) { // 匹配fmt
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let regexs = {
    'M+': date.getMonth() + 1, // 月份从0开始
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let i in regexs) {
    if (new RegExp(`(${i})`).test(fmt)) {
      let str = regexs[i] + ''; // 转字符串
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
      // console.log(i, ',', RegExp.$1);
    }
  }

  return fmt
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}
