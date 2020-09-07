import BScroll from "better-scroll";

/**
 * 纵向滚动条
 * @param dom
 */
export function initScrollY(dom) {
  return new BScroll(dom, {
    scrollY: true,
    eventPassthrough: "horizontal",
    click: true,
    bounce: {
      top: false,
      bottom: false
    }
  });
}

export function initScrollX(dom) {
  return new BScroll(dom, {
    scrollX: true,
    eventPassthrough: "vertical",
    click: true,
    bounce: {
      left: false,
      right: false
    }
  });
}
