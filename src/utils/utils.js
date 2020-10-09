/**
 * 播放次数格式化函数
 * @param playCount
 * @returns {string}
 */
export function playCountFormat(playCount) {
  switch (true) {
    case playCount > 10000 && playCount < 100000000:
      return `${(playCount / 10000).toFixed(0)}万`;
    case playCount > 100000000:
      return `${(playCount / 100000000).toFixed(1)}亿`;
    default:
      return playCount;
  }
}

/**
 * 根据时间戳返回年月日
 * @param date
 * @param type 返回日期格式 '-'为 0  'x年x月x日为 1'
 * @returns {string}
 */
export function dateFormat(date, type = 0) {
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

  switch (type) {
    case 0:
      return `${year}-${month}-${day}`;
    case 1:
      return `${year}年${month}月${day}日`;
    case 2:
      return `${year}.${month}.${day}`;
  }
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

/**
 * 播放模式简单封装
 * @param mode
 * @param playListCallBack
 * @param songSingleCallBack
 * @param randomCallBack
 * @returns {function(): void}
 */
export function playMode(
  mode,
  playListCallBack,
  songSingleCallBack,
  randomCallBack
) {
  switch (mode) {
    case 0:
      return playListCallBack();
    case 1:
      return songSingleCallBack();
    case 2:
      return randomCallBack();
  }
}

/**
 * 去除首位空格的正则表达式
 * @param str
 * @returns {*}
 */
export function trim(str) {
  return str.replace(/(^\s*)|(\s*$)/g, "");
}

/**
 * 函数节流
 * @param func
 * @param delay
 * @returns {function(): void}
 */
export function throttle(func, delay) {
  let timer = null;
  return function() {
    if (!timer) {
      timer = setTimeout(() => {
        func.call(this, arguments);
        timer = null;
      }, delay);
    }
  };
}

/**
 * 函数防抖
 * @param func
 * @param delay
 * @returns {function(): void}
 */
export function debounce(func, delay) {
  let timer = null;
  return function() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(() => {
      func.call(this, arguments);
      console.log(arguments);
    }, delay);
  };
}
