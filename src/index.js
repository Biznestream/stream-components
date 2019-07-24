import Vue from 'vue';
// import SAttributeTypeSelector from './components/Attribute/SAttributeTypeSelector';
// import SAttributeDefaultEditor from './components/Attribute/SAttributeDefaultEditor';
// import SAttributeEditor from './components/Attribute/SAttributeEditor';
// import SAttributesEditor from './components/Attribute/SAttributesEditor';
import SProductFilter from './components/Filter/SProductFilter';
import SProduct from './components/Filter/SProduct';
import SProductFilterContainer from './components/Filter/SProductFilterContainer';
import SProductTab from './components/Product/SProductTab';
import SProductAttribute from './components/Product/SProductAttribute';
import Lightbox from 'vue-easy-lightbox';
// import CKEditor from '@ckeditor/ckeditor5-vue';
import Sticky from 'vue-sticky-directive';
import ProductPage from './components/Pages/ProductPage';
import ProductsPage from './components/Pages/ProductsPage';

export {
  // SAttributeTypeSelector,
  // SAttributeDefaultEditor,
  // SAttributeEditor,
  // SAttributesEditor,
  SProductFilterContainer,
  SProductFilter,
  ProductPage,
  ProductsPage,
  SProductTab,
  SProductAttribute
};

export default function install(Vue) {
  // Vue.use(CKEditor);
  Vue.use(Sticky);

  // Vue.component('SAttributeTypeSelector', SAttributeTypeSelector);
  // Vue.component('SAttributeDefaultEditor', SAttributeDefaultEditor);
  // Vue.component('SAttributeEditor', SAttributeEditor);
  // Vue.component('SAttributesEditor', SAttributesEditor);
  Vue.component('SProductFilter', SProductFilter);
  Vue.component('SProduct', SProduct);
  Vue.component('SProductTab', SProductTab);
  Vue.component('SProductFilterContainer', SProductFilterContainer);
  Vue.component('ProductPage', ProductPage);
  Vue.component('ProductsPage', ProductsPage);
  Vue.component('SProductAttribute', SProductAttribute);
}
install.version = '__VERSION__';

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(install);
  if (install.installed) {
    install.installed = false;
  }
}
