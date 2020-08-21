import BScroll from "better-scroll";

/**
 * 纵向滚动条
 * @param dom
 */
export function initScrollY(dom) {
  // eslint-disable-next-line no-unused-vars
  const scroll = new BScroll(dom, {
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
  // eslint-disable-next-line no-unused-vars
  const scroll = new BScroll(dom, {
    scrollX: true,
    eventPassthrough: "vertical",
    click: true,
    bounce: {
      left: false,
      right: false
    }
  });
}
