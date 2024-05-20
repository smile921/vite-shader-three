import { App } from 'vue'
import Breadcrumb from './breadcrumb/index.vue'
// import SvgIcon from './svg-icon/index.vue';
// Manually introduce ECharts modules to reduce packing size

export default {
  install(Vue: App) {
    // Vue.component('Chart', Chart)
    Vue.component('Breadcrumb', Breadcrumb)
    // Vue.component('SvgIcon', SvgIcon);
  },
}
