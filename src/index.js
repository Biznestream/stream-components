import Vue from 'vue';
import SProductFilter from './components/Filter/SProductFilter';
import SProduct from './components/Filter/SProduct';
import SProductFilterContainer from './components/Filter/SProductFilterContainer';
import SProductAttribute from './components/Product/SProductAttribute';
import SProductImages from './components/Product/SProductImages';
import SProductThumbnail from './components/Product/SProductThumbnail';
import SProductForm from './components/Product/SProductForm';
import ProductsSection from './components/ProductsSection';
import Sticky from 'vue-sticky-directive';
import ProductPage from './components/Pages/ProductPage';
import ProductsPage from './components/Pages/ProductsPage';
import VueLazyLoad from 'vue-lazyload';
import VueScrollTo from 'vue-scrollto';

export {
  SProductFilterContainer,
  SProductFilter,
  ProductPage,
  ProductsPage,
  SProductAttribute,
  ProductsSection,
  SProductThumbnail,
  SProductImages,
  SProductForm
};

export default function install(Vue) {
  Vue.use(Sticky);
  Vue.use(VueLazyLoad);
  Vue.use(VueScrollTo);

  Vue.component('SProductFilter', SProductFilter);
  Vue.component('SProduct', SProduct);
  Vue.component('SProductFilterContainer', SProductFilterContainer);
  Vue.component('ProductPage', ProductPage);
  Vue.component('ProductsPage', ProductsPage);
  Vue.component('SProductAttribute', SProductAttribute);
  Vue.component('ProductsSection', ProductsSection);
  Vue.component('SProductThumbnail', SProductThumbnail);
  Vue.component('SProductImages', SProductImages);
  Vue.component('SProductForm', SProductForm);
}
install.version = '__VERSION__';

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(install);
  if (install.installed) {
    install.installed = false;
  }
}
