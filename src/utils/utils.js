export function playCountFormat(playCount) {
  switch (true) {
    case playCount > 10000 && playCount < 100000000:
      return `${(playCount / 10000).toFixed(1)}万`;
    case playCount > 100000000:
      return `${(playCount / 100000000).toFixed(1)}亿`;
    default:
      return `${playCount}次`;
  }
}
