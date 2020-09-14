import BScroll from "better-scroll";

/**
 * 纵向滚动条
 * @param dom
 * @param pullUpLoad
 */
export function initScrollY(dom, pullUpLoad = false) {
  return new BScroll(dom, {
    scrollY: true,
    eventPassthrough: "horizontal",
    click: true,
    bounce: {
      top: false,
      bottom: false
    },
    pullUpLoad: pullUpLoad
  });
}

export function initScrollX(dom, options = {}) {
  return new BScroll(dom, {
    scrollX: true,
    eventPassthrough: "vertical",
    click: true,
    bounce: {
      left: false,
      right: false
    },
    options
  });
}
