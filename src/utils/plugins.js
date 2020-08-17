import {
  Tabbar,
  TabbarItem,
  Swipe,
  SwipeItem,
  NavBar,
  Icon,
  Lazyload,
  Popup,
  Cell
} from "vant";
export default {
  install(Vue) {
    Vue.use(Tabbar);
    Vue.use(TabbarItem);
    Vue.use(Swipe);
    Vue.use(SwipeItem);
    Vue.use(NavBar);
    Vue.use(Icon);
    Vue.use(Lazyload);
    Vue.use(Popup);
    Vue.use(Cell);
  }
};