export function playCountFormat(playCount) {
  switch (true) {
    case playCount > 10000 && playCount < 1000000000:
      return `${(playCount / 10000).toFixed(1)}万`;
    case playCount > 1000000000:
      return `${(playCount / 1000000000).toFixed(1)}亿`;
    default:
      return `${playCount}次`;
  }
}
