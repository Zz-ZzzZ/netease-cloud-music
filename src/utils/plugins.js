import {
  Tabbar,
  TabbarItem,
  Swipe,
  SwipeItem,
  NavBar,
  Icon,
  Lazyload,
  Popup,
  Cell,
  Tab,
  Tabs,
  Slider,
  Search
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
    Vue.use(Tab);
    Vue.use(Tabs);
    Vue.use(Slider);
    Vue.use(Search);
  }
};
