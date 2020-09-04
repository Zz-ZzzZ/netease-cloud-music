/**
 * 播放次数格式化函数
 * @param playCount
 * @returns {string}
 */
export function playCountFormat(playCount) {
  switch (true) {
    case playCount > 10000 && playCount < 100000000:
      return `${(playCount / 10000).toFixed(1)}万`;
    case playCount > 100000000:
      return `${(playCount / 100000000).toFixed(1)}亿`;
    default:
      return `${playCount}`;
  }
}

/**
 * 根据时间戳返回年月日
 * @param date
 * @returns {string}
 */
export function dateFormat(date) {
  const dateFormat = new Date(date);
  let year = dateFormat.getFullYear();
  let month =
    dateFormat.getMonth() + 1 < 10
      ? `0${dateFormat.getMonth() + 1}`
      : dateFormat.getMonth() + 1;
  let day =
    dateFormat.getDate() + 1 < 10
      ? `0${dateFormat.getDate() + 1}`
      : dateFormat.getDate() + 1;

  return `${year}-${month}-${day}`;
}

/**
 * 根据时间戳返回分秒
 * @param second
 * @returns {string}
 */
export function secondToMs(second) {
  let result = parseInt(second);
  let m =
    Math.floor((result / 60) % 60) < 10
      ? "0" + Math.floor((result / 60) % 60)
      : Math.floor((result / 60) % 60);
  let s =
    Math.floor(result % 60) < 10
      ? "0" + Math.floor(result % 60)
      : Math.floor(result % 60);
  return `${m}:${s}`;
}

/**
 * 获取随机索引，歌曲随机播放逻辑
 * @type {{random: number, lastRandom: number, getRandom(*=): (*)}}
 */
export const random = {
  random: 0,
  lastRandom: -1,
  getRandom(playList) {
    this.random = Math.floor(Math.random() * (playList.length - 1));
    // 相等则表示需要重新调用方法直到不相等为止
    if (this.random === this.lastRandom) {
      return this.getRandom(playList);
    } else {
      this.lastRandom = this.random;
      return this.random;
    }
  }
};
