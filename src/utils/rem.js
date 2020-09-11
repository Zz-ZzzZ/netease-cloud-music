export default function initRem(standardWidth = 750, standardFontSize = 100) {
  const windowWidth = document.documentElement.offsetWidth;
  document.querySelector("html").style.fontSize =
    (windowWidth / standardWidth) * standardFontSize + "px";
  window.addEventListener("resize", initRem);
}
