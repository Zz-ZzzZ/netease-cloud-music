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
  Search,
  Sticky,
  Image,
  Dialog,
  Field
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
    Vue.use(Sticky);
    Vue.use(Image);
    Vue.use(Dialog);
    Vue.use(Field);
  }
};
