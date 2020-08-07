export default function initRem() {
  (function(doc, win) {
    // 用原生方法获取用户设置的浏览器的字体大小(兼容ie)
    var userWebSetFont;
    if (doc.documentElement.currentStyle) {
      userWebSetFont = doc.documentElement.currentStyle["fontSize"];
    } else {
      userWebSetFont = getComputedStyle(doc.documentElement, false)["fontSize"];
    }
    // 取整后与默认16px的比例系数
    var xs = parseFloat(userWebSetFont) / 16;
    // 设置rem的js设置的字体大小
    var viewSetFont, resultFont;
    var docEl = doc.documentElement,
      resizeEvt =
        "orientationchange" in window ? "orientationchange" : "resize",
      clientWidth,
      recalc = function() {
        clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
        if (!doc.addEventListener) return;
        if (clientWidth < 750) {
          // 设置rem的js设置的字体大小
          viewSetFont = 100 * (clientWidth / 750);
          // 最终的字体大小为rem字体/系数
          resultFont = viewSetFont / xs;
          // 设置根字体大小
          docEl.style.fontSize = resultFont + "px";
        } else {
          docEl.style.fontSize = 100 + "px";
        }
      };
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener("DOMContentLoaded", recalc, false);
  })(document, window);
}
